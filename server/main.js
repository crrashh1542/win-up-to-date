/**
 * Windows Up-to-Date 服务端脚本
 * @author crrashh1542
 * @version 3.1
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileP = promisify(execFile)

const serverVersion = '3.1'
const apiVersion = 1
const port = 14726
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

const errParam = (res) =>
    sendJson(res, 400, { message: 'Parameter is invalid!' })
const errValue = (res) =>
    sendJson(res, 404, { message: 'Corresponding data is not found!' })
const errServer = (res) =>
    sendJson(res, 500, { message: 'Internal server error!' })

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
    const promise = execFileP('git', [
        '-C',
        dataRoot,
        'log',
        '-1',
        '--format=%h%n%cs',
    ])
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
                console.error(
                    '[WARN] 无法读取数据仓库版本：Git 不可用且 version.json 缺失'
                )
                if (err) {
                    console.error('[WARN] Git 错误详情：', err.message || err)
                }
                return { hash: 'unknown', date: 'unknown' }
            }
        })
    versionCache = { promise, mtime }
    return promise
}

const serveDataVersion = async (res) => {
    try {
        const content = await readDataVersion()
        sendJson(res, 200, okPayload('dataVersion', content))
    } catch {
        errServer(res)
    }
}

// 路由处理函数
const serveData = (file, type) => async (res, _params, reqUrl) => {
    const filePath =
        typeof file === 'function' ? file(reqUrl) : path.join(dataRoot, file)
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

// 路由表
const categoryPath = (u) =>
    path.join(dataRoot, 'category', u.searchParams.get('platform') + '.json')
const detailPath = (u) =>
    path.join(
        dataRoot,
        'detail',
        u.searchParams.get('platform'),
        u.searchParams.get('build') + '.json'
    )
const routes = new Map([
    [
        '/',
        {
            handler: (res) =>
                sendJson(res, 200, { message: 'Service is available!' }),
        },
    ],
    ['/latestBuilds', { handler: serveData('latest-builds.json', 'latest') }],
    ['/version', { handler: serveDataVersion }],
    [
        '/category',
        { params: ['platform'], handler: serveData(categoryPath, 'category') },
    ],
    ['/category/list', { handler: serveData('category.json', 'categoryList') }],
    [
        '/detail',
        {
            params: ['platform', 'build'],
            handler: serveData(detailPath, 'detail'),
        },
    ],
])

// main server
http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url || '/', 'http://127.0.0.1')
    const reqPath = reqUrl.pathname || '/'

    res.on('finish', () => {
        console.log(
            `[${new Date().toLocaleString('sv-SE')}] ${res.statusCode} ${req.method} ${req.url}`
        )
    })

    if (req.method !== 'GET') {
        return sendJson(res, 405, { message: 'Method is not allowed!' })
    }

    try {
        const route = routes.get(reqPath)
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
    } catch {
        errServer(res)
    }
}).listen(port, () => {
    console.log('========================================')
    console.log(`WUTD API v${serverVersion}\n`)
    console.log('[INFO] 服务运行于 http://127.0.0.1:' + port + '/')
    console.log(`[INFO] 数据目录：` + dataRoot)
    console.log('========================================')
})
