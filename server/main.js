/**
 * Windows Up-to-Date 服务端脚本
 * @author crrashh1542
 * @version 2.0
 */

import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const apiVersion = 1
const port = 14726

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataRoot = path.resolve(__dirname, 'data')
const faviconPath = path.resolve(__dirname, 'favicon.ico')
const isSafeId = v => /^[A-Za-z0-9._-]+$/.test(v)

const getTimestamp = () => {
    const now = new Date()
    const year = String(now.getFullYear()).slice(2)
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

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

const errParam = res => {
    sendJson(res, 400, { message: 'Parameter is invalid!' })
}

const errValue = res => {
    sendJson(res, 404, { message: 'Corresponding data of the value is not found!' })
}

const errServer = res => {
    sendJson(res, 500, { message: 'Internal server error!' })
}

const readJsonFile = async filePath => {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
}

const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url || '/', 'http://127.0.0.1')
    const reqPath = reqUrl.pathname || '/'

    res.on('finish', () => {
        const method = req.method || 'GET'
        const urlText = req.url || '/'
        console.log(`[${getTimestamp()}] ${res.statusCode} ${method} ${urlText}`)
    })

    if (req.method !== 'GET') {
        return sendJson(res, 405, { message: 'Method is not allowed!' })
    }

    try {
        // (1) /favicon.ico → 站点图标
        if (reqPath == '/favicon.ico'){
            try {
                const data = await fs.readFile(faviconPath)
                res.statusCode = 200
                res.setHeader('Content-Type', 'image/x-icon')
                res.end(data)
            } catch {
                sendJson(res, 404, { message: 'Interface is not found!' })
            }
            return
        }
        // (2) / → 欢迎
        if (reqPath == '/'){
            sendJson(res, 200, { message: 'Service is available!' })
            return
        }
        // (3) /latestBuilds → 最新构建
        if (reqPath == '/latestBuilds'){
            try {
                const content = await readJsonFile(path.join(dataRoot, 'latest-builds.json'))
                sendJson(res, 200, okPayload('latest', content))
            } catch {
                errValue(res)
            }
            return
        }
        // (4) /category → 版本列表
        if (reqPath == '/category'){
            const platform = reqUrl.searchParams.get('platform')
            if (!platform || !isSafeId(platform)){
                errParam(res)
                return
            }
            try {
                const content = await readJsonFile(path.join(dataRoot, 'category', platform + '.json'))
                sendJson(res, 200, okPayload('category', content))
            } catch {
                errValue(res)
            }
            return
        }
        // (5) /detail → 详细信息
        if (reqPath == '/detail'){
            const platform = reqUrl.searchParams.get('platform')
            const build = reqUrl.searchParams.get('build')
            if (!platform || !build || !isSafeId(platform) || !isSafeId(build)){
                errParam(res)
                return
            }
            try {
                const content = await readJsonFile(path.join(dataRoot, 'detail', platform, build + '.json'))
                sendJson(res, 200, okPayload('detail', content))
            } catch {
                errValue(res)
            }
            return
        }

        sendJson(res, 404, { message: 'Interface is not found!' })
    } catch {
        errServer(res)
    }

}).listen(port, () => {
    console.log('服务运行于 http://127.0.0.1:' + port + '/')
    console.log(`[${getTimestamp()}][Info] 数据目录：` + dataRoot)
})
