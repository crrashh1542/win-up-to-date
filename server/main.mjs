/**
 * Windows Up-to-Date 服务端主脚本
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

import pkgInfo from './package.json' with { type: 'json' }
import { handleDeploy, setOnDeploySuccess } from './admin.js'

const execFileP = promisify(execFile)
const { version } = pkgInfo
const apiVersion = 2
const port = 9884
const cacheSize = 200

const __filename = fileURLToPath(import.meta.url)
const dataRoot = path.resolve(path.dirname(__filename), 'data')
// 拒绝路径穿越符（. 与 ..），并只允许安全字符
const isSafeId = (v) => /^[A-Za-z0-9._-]+$/.test(v) && v !== '.' && v !== '..'

const sendJson = (res, status, payload) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(
        JSON.stringify({
            code: status,
            version: apiVersion,
            ...payload,
        })
    )
}

const okPayload = (type, content) => ({
    message: 'Successfully requested data!',
    dataType: type,
    content,
})

const errParam = (res) => sendJson(res, 400, { message: 'Parameter is invalid!' })
const errValue = (res) => sendJson(res, 404, { message: 'Corresponding data is not found!' })
const errServer = (res) => sendJson(res, 500, { message: 'Internal server error!' })

const readJson = async (filePath) => {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
}

// 数据缓存
const fileCache = new Map()
const readCache = async (filePath) => {
    const cached = fileCache.get(filePath)
    const mtime = (await fs.stat(filePath)).mtimeMs
    if (cached && mtime === cached.mtime) {
        // 缓存命中，移到末尾
        fileCache.delete(filePath)
        fileCache.set(filePath, cached)
        return cached.promise
    }
    if (fileCache.size >= cacheSize) {
        // 处理缓存已满
        fileCache.delete(fileCache.keys().next().value)
    }
    const entry = {
        promise: readJson(filePath).catch((err) => {
            fileCache.delete(filePath)
            throw err
        }),
        mtime,
    }
    fileCache.set(filePath, entry)
    return entry.promise
}

// 派生数据缓存
// 失效键为所有输入（文件/目录）的 mtime 组合，任一输入变化即重算
const derivedCache = new Map()
const readDerived = async (inputs, compute) => {
    const key = inputs.join('|')
    const sig = (
        await Promise.all(inputs.map((input) => fs.stat(input).then((s) => s.mtimeMs)))
    ).join('|')
    const cached = derivedCache.get(key)
    if (cached && cached.sig === sig) {
        // 缓存命中，移到末尾
        derivedCache.delete(key)
        derivedCache.set(key, cached)
        return cached.promise
    }
    if (derivedCache.size >= cacheSize) {
        derivedCache.delete(derivedCache.keys().next().value)
    }
    const entry = {
        promise: compute().catch((err) => {
            derivedCache.delete(key)
            throw err
        }),
        sig,
    }
    derivedCache.set(key, entry)
    return entry.promise
}

// 查询数据仓库版本
// .git/logs/HEAD 的 mtime 判断是否有新提交
const headLogPath = path.join(dataRoot, '.git', 'logs', 'HEAD')
let versionCache = null
const readDataVersion = async () => {
    let mtime
    try {
        mtime = (await fs.stat(headLogPath)).mtimeMs
    } catch {
        // HEAD 不存在时退回 30s TTL
        mtime = Math.floor(Date.now() / 30000)
    }
    if (versionCache && versionCache.mtime === mtime) {
        return versionCache.promise
    }
    // %h 短 hash，%cs 提交日期（YYYY-MM-DD）
    const promise = execFileP('git', ['-C', dataRoot, 'log', '-1', '--format=%h%n%cs'])
        .then(({ stdout }) => {
            const [hash, date] = stdout.trim().split('\n')
            return { hash, date }
        })
        .catch(async (err) => {
            // Git 不可用（如生产环境仅有打包数据）时，读取打包生成的 version.json
            try {
                const v = await readJson(path.join(dataRoot, 'version.json'))
                return { hash: v.hash ?? 'unknown', date: v.date ?? 'unknown' }
            } catch {
                console.error('[WARN] 无法读取数据仓库版本：Git 不可用且 version.json 缺失')
                if (err) {
                    console.error('[WARN] Git 错误详情：', err.message || err)
                }
                return { hash: 'unknown', date: 'unknown' }
            }
        })
    versionCache = { promise, mtime }
    return promise
}

// 部署成功后数据已整体替换：清空全部缓存（文件/派生/版本），
// 否则旧 mtime 引用可能读到已删除的文件，版本缓存也会最多陈旧 30s
const resetAllCaches = () => {
    fileCache.clear()
    derivedCache.clear()
    versionCache = null
}
setOnDeploySuccess(resetAllCaches)

const serveDataVersion = async (res) => {
    try {
        const content = await readDataVersion()
        sendJson(res, 200, okPayload('dataVersion', content))
    } catch {
        errServer(res)
    }
}

// 搜索接口逻辑
const detailDir = path.join(dataRoot, 'detail')

// 全量扫描 detail 目录，构建 {platform, build} 索引（仅生成，不在此处过滤查询）
const buildSearchIndex = async () => {
    const files = await fs.readdir(detailDir, { recursive: true })
    return files
        .filter((name) => typeof name === 'string' && name.endsWith('.json'))
        .map((name) => {
            const full = name.replace(/\\/g, '/')
            const lastSlash = full.lastIndexOf('/')
            const platform = full.substring(0, lastSlash)
            const build = path.basename(name, '.json')
            return { platform, build }
        })
        .filter((item) => item.platform !== '.')
}

const serveSearch = async (res, _params, reqUrl) => {
    const q = reqUrl.searchParams.get('build')
    if (!q || !isSafeId(q)) return errParam(res)
    try {
        // 索引缓存失效输入：detail 顶层 + 各平台子目录。
        // 平台子目录下新增/删除 build 文件只会改变该子目录 mtime，顶层不会变，
        // 因此必须把子目录也作为输入，任一 mtime 变化即触发重建。
        // 命中缓存时只需顶层 readdir + 各平台目录 stat，避免每次全量递归扫描。
        const entries = await fs.readdir(detailDir, { withFileTypes: true })
        const platformDirs = entries
            .filter((e) => e.isDirectory())
            .map((e) => path.join(detailDir, e.name))
        const index = await readDerived([detailDir, ...platformDirs], buildSearchIndex)
        const matches = index
            .filter((item) => item.build.includes(q))
            .slice(0, 20)
        sendJson(res, 200, okPayload('searchBuild', matches))
    } catch {
        errServer(res)
    }
}

// 路由处理函数
const serveCategory = async (res, _params, reqUrl) => {
    const platform = reqUrl.pathname.slice('/category/'.length)
    if (!platform) {
        return serveData('index/category.json', 'categoryList')(res, _params, reqUrl)
    }
    if (!isSafeId(platform)) {
        return errParam(res)
    }
    return serveData(categoryPath, 'category')(res, _params, reqUrl)
}

const serveData = (file, type) => async (res, _params, reqUrl) => {
    const filePath = typeof file === 'function' ? file(reqUrl) : path.join(dataRoot, file)
    // 注：解析后的路径必须仍位于数据目录内
    const resolved = path.resolve(filePath)
    if (resolved !== dataRoot && !resolved.startsWith(dataRoot + path.sep)) {
        return errParam(res)
    }
    try {
        const content = await readCache(resolved)
        sendJson(res, 200, okPayload(type, content))
    } catch {
        errValue(res)
    }
}

const serveId = async (res, _params, reqUrl) => {
    const category = reqUrl.pathname.slice('/id/'.length)
    if (!category) {
        return serveData('index/viveid.json', 'idList')(res, _params, reqUrl)
    }
    if (!isSafeId(category)) {
        return errParam(res)
    }
    return serveData(idPath, 'id')(res, _params, reqUrl)
}

// 主下载页
const downloadDir = path.join(dataRoot, 'download')

// 选取展示的构建：Win11前3个 & Win10第1个（最新的消费者版 + 商业版）
// 只依赖 download 目录的 mtime（新增/删除文件时变化），故单独缓存
const selectDownloadTargets = async () => {
    const names = (await fs.readdir(downloadDir))
        .filter((name) => name.endsWith('.json'))
        .sort()
        .reverse()
    return [
        ...names.filter((name) => name.startsWith('Win11-')).slice(0, 3),
        ...names.filter((name) => name.startsWith('Win10-')).slice(0, 1),
    ]
}

const serveDownload = async (res) => {
    try {
        const base = await readCache(path.join(dataRoot, 'index', 'download.json'))
        const targets = await readDerived([downloadDir], selectDownloadTargets)
        // esd 拼接依赖目录和所选各文件的内容，二者任一变化即失效
        const esd = await readDerived(
            [downloadDir, ...targets.map((name) => path.join(downloadDir, name))],
            async () => {
                const out = []
                for (const name of targets) {
                    const arr = await readCache(path.join(downloadDir, name))
                    if (Array.isArray(arr)) out.push(...arr.slice(0, 2))
                }
                return out
            }
        )
        sendJson(res, 200, okPayload('download', { ...base, esd }))
    } catch {
        errValue(res)
    }
}

// 官方 ESD 下载页
// /download/esd 返回分类列表，/download/esd/:value 返回对应 json
const serveDownloadEsd = async (res, _params, reqUrl) => {
    const value = reqUrl.pathname.slice('/download/esd/'.length)
    if (!value) {
        return serveData('index/download-esd.json', 'downloadEsdList')(res, _params, reqUrl)
    }
    if (!isSafeId(value)) {
        return errParam(res)
    }
    return serveData(path.join('download', `${value}.json`), 'downloadEsd')(res, _params, reqUrl)
}

const serveDetail = async (res, _params, reqUrl) => {
    const segments = reqUrl.pathname.slice('/detail/'.length).split('/')
    const [platform, build] = segments
    if (!platform || !build || segments.length > 2) {
        return errParam(res)
    }
    if (!isSafeId(platform) || !isSafeId(build)) {
        return errParam(res)
    }
    return serveData(detailPath, 'detail')(res, _params, reqUrl)
}

// 路由表
const categoryPath = (u) =>
    path.join(dataRoot, 'category', u.pathname.slice('/category/'.length) + '.json')
const detailPath = (u) =>
    path.join(dataRoot, 'detail', u.pathname.split('/')[2], u.pathname.split('/')[3] + '.json')
const idPath = (u) => path.join(dataRoot, 'viveid', u.pathname.slice('/id/'.length) + '.json')

const routes = new Map([
    [
        '/',
        {
            handler: (res) => sendJson(res, 200, { message: 'Service is available!' }),
        },
    ],
    ['/latestBuilds', { handler: serveData('index/latest-builds.json', 'latest') }],
    ['/download', { handler: serveDownload }],
    ['/download/esd', { handler: serveDownloadEsd }],
    ['/download/esd/', { handler: serveDownloadEsd, prefix: true }],
    ['/version', { handler: serveDataVersion }],
    ['/category', { handler: serveCategory }],
    ['/category/', { handler: serveCategory, prefix: true }],
    ['/detail/', { handler: serveDetail, prefix: true }],
    ['/id', { handler: serveId }],
    ['/id/', { handler: serveId, prefix: true }],
    ['/search', { params: ['build'], handler: serveSearch }],
])

// POST 路由表（管理接口）
const postRoutes = new Map([['/admin/deploy', { handler: handleDeploy }]])

// main server
http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url || '/', 'http://127.0.0.1')
    const reqPath = reqUrl.pathname || '/'

    res.on('finish', () => {
        console.log(
            `[${new Date().toLocaleString('sv-SE')}] ${res.statusCode} ${req.method} ${req.url}`
        )
    })

    try {
        if (req.method === 'GET') {
            let route = routes.get(reqPath)
            if (!route) {
                for (const [path, r] of routes) {
                    if (r.prefix && reqPath.startsWith(path)) {
                        route = r
                        break
                    }
                }
            }
            if (!route) {
                return sendJson(res, 404, { message: 'Interface is not found!' })
            }

            if (route.params) {
                const missing = route.params.some((p) => {
                    const v = reqUrl.searchParams.get(p)
                    return !v || !isSafeId(v)
                })
                if (missing) return errParam(res)
            }

            await route.handler(res, reqUrl.searchParams, reqUrl)
        } else if (req.method === 'POST') {
            const route = postRoutes.get(reqPath)
            if (!route) {
                return sendJson(res, 404, { message: 'Interface is not found!' })
            }
            await route.handler(req, res)
        } else {
            return sendJson(res, 405, { message: 'Method is not allowed!' })
        }
    } catch {
        errServer(res)
    }
}).listen(port, () => {
    console.log('========================================')
    console.log(`WUTD API v${version}\n`)
    console.log('[INFO] 服务运行于 http://127.0.0.1:' + port + '/')
    console.log(`[INFO] 数据目录：` + dataRoot)
    console.log('========================================')
})
