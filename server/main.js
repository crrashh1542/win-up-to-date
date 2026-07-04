/**
 * Windows Up-to-Date 服务端脚本
 * @author crrashh1542
 * @version 3.0
 */

import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const apiVersion = 1
const port = 14726
const cacheSize = 200

const __filename = fileURLToPath(import.meta.url)
const dataRoot = path.resolve(path.dirname(__filename), 'data')
const isSafeId = v => /^[A-Za-z0-9._-]+$/.test(v)

const sendJson = (res, status, payload) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify({
        code: status,
        version: apiVersion,
        ...payload,
    }))
}

const okPayload = (type, content) => ({
    message: 'Successfully requested data!',
    dataType: type,
    content,
})

const errParam = res => sendJson(res, 400, { message: 'Parameter is invalid!' })
const errValue = res => sendJson(res, 404, { message: 'Corresponding data is not found!' })
const errServer = res => sendJson(res, 500, { message: 'Internal server error!' })

const readJson = async filePath => {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
}

// 数据缓存
const fileCache = new Map()
const readCache = async filePath => {
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
        promise: readJson(filePath).catch(err => {
            fileCache.delete(filePath)
            throw err
        }),
        mtime,
    }
    fileCache.set(filePath, entry)
    return entry.promise
}

// 路由处理函数
const serveData = (file, type) => async (res, _params, reqUrl) => {
    const filePath = typeof file === 'function'
        ? file(reqUrl)
        : path.join(dataRoot, file)
    try {
        const content = await readCache(filePath)
        sendJson(res, 200, okPayload(type, content))
    } catch {
        errValue(res)
    }
}

// 路由表
const categoryPath = u =>
    path.join(dataRoot, 'category', u.searchParams.get('platform') + '.json')
const detailPath = u =>
    path.join(dataRoot, 'detail', u.searchParams.get('platform'), u.searchParams.get('build') + '.json')
const routes = new Map([
    ['/', { handler: res => sendJson(res, 200, { message: 'Service is available!' }) }],
    ['/latestBuilds', { handler: serveData('latest-builds.json', 'latest') }],
    ['/category', { params: ['platform'], handler: serveData(categoryPath, 'category') }],
    ['/category/list', { handler: serveData('category.json', 'categoryList') }],
    ['/detail', { params: ['platform', 'build'], handler: serveData(detailPath, 'detail') }],
])

// main server
const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url || '/', 'http://127.0.0.1')
    const reqPath = reqUrl.pathname || '/'

    res.on('finish', () => {
        console.log(`[${new Date().toLocaleString('sv-SE')}] ${res.statusCode} ${req.method} ${req.url}`)
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
            const missing = route.params.some(p => {
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
    console.log('WUTD API v3.0\n')
    console.log('[INFO] 服务运行于 http://127.0.0.1:' + port + '/')
    console.log(`[INFO] 数据目录：` + dataRoot)
    console.log('========================================')
})
