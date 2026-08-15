/**
 * Windows Up-to-Date 服务端管理接口
 * @author crrashh1542
 * @version 1.0
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'

const execFileP = promisify(execFile)

const maxUploadSize = 2 * 1024 * 1024
const requiredFiles = [
    'version.json',
    'index/category.json',
    'index/latest-builds.json',
]

/**
 * 发送 JSON 响应
 */
const sendJson = (res, status, payload) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify({ code: status, ...payload }))
}

/**
 * 认证失败响应
 */
const errUnauthorized = (res) =>
    sendJson(res, 401, { message: 'Unauthorized: Invalid or missing token' })

/**
 * 参数错误响应
 */
const errBadRequest = (res, msg) => sendJson(res, 400, { message: msg })

/**
 * 服务器错误响应
 */
const errServer = (res, msg) =>
    sendJson(res, 500, { message: msg || 'Internal server error' })

/**
 * 校验 Bearer Token
 */
const authenticate = (req) => {
    const expectedToken = process.env.WUTD_ADMIN_TOKEN
    if (!expectedToken) {
        console.error(
            '[ERROR] WUTD_ADMIN_TOKEN environment variable is not set'
        )
        return false
    }
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false
    }
    const token = authHeader.slice(7)
    // 使用简单但安全的比较（避免时序攻击）
    if (token.length !== expectedToken.length) return false
    let result = 0
    for (let i = 0; i < token.length; i++) {
        result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i)
    }
    return result === 0
}

/**
 * 将请求体写入临时文件
 */
const writeTempFile = async (req) => {
    const tmpDir = path.join(path.dirname(process.argv[1]), '.tmp')
    await fs.mkdir(tmpDir, { recursive: true })
    const tmpFile = path.join(tmpDir, `deploy-${Date.now()}.zip`)
    let size = 0
    const writeStream = createWriteStream(tmpFile)
    req.on('data', (chunk) => {
        size += chunk.length
        if (size > maxUploadSize) {
            writeStream.destroy()
            req.destroy()
        }
    })
    try {
        await pipeline(req, writeStream)
    } catch (err) {
        await fs.unlink(tmpFile).catch(() => {})
        throw err
    }
    if (size > maxUploadSize) {
        await fs.unlink(tmpFile).catch(() => {})
        return null
    }
    return tmpFile
}

/**
 * 测试 zip 文件完整性
 */
const testZip = async (zipPath) => {
    try {
        await execFileP('unzip', ['-t', zipPath])
        return true
    } catch {
        return false
    }
}

/**
 * 解压 zip 到目标目录
 */
const unzipToDir = async (zipPath, targetDir) => {
    await execFileP('unzip', ['-o', zipPath, '-d', targetDir])
}

/**
 * 读取 version.json
 */
const readVersion = async (dir) => {
    try {
        const raw = await fs.readFile(path.join(dir, 'version.json'), 'utf-8')
        return JSON.parse(raw)
    } catch {
        return null
    }
}

/**
 * 验证部署结果
 */
const validateDeployment = async (dataRoot) => {
    for (const file of requiredFiles) {
        try {
            await fs.access(path.join(dataRoot, file))
        } catch {
            return false
        }
    }
    return true
}

/**
 * 清理过期备份（保留最近 5 个）
 */
const cleanupBackups = async (dataRoot) => {
    const dir = path.dirname(dataRoot)
    const baseName = path.basename(dataRoot)
    try {
        const entries = await fs.readdir(dir)
        const backups = entries
            .filter((name) => name.startsWith(`${baseName}.bak.`))
            .map((name) => ({
                name,
                time: name.split('.bak.')[1],
            }))
            .sort((a, b) => b.time.localeCompare(a.time))
        for (const backup of backups.slice(5)) {
            await fs.rm(path.join(dir, backup.name), {
                recursive: true,
                force: true,
            })
        }
    } catch {
        // 忽略清理错误
    }
}

/**
 * 部署处理函数
 */
export const handleDeploy = async (req, res) => {
    // 1. 认证
    if (!authenticate(req)) {
        return errUnauthorized(res)
    }

    // 2. 检查 Content-Type
    const contentType = req.headers['content-type'] || ''
    if (
        !contentType.includes('application/octet-stream') &&
        !contentType.includes('application/zip')
    ) {
        return errBadRequest(
            res,
            'Content-Type must be application/octet-stream or application/zip'
        )
    }

    // 3. 写入临时文件
    let tmpFile
    try {
        tmpFile = await writeTempFile(req)
    } catch {
        return errServer(res, 'Failed to receive upload data')
    }
    if (!tmpFile) {
        return sendJson(res, 413, {
            message: 'Upload size exceeds limit (2MB)',
        })
    }

    // 4. 测试 zip 完整性
    const isValidZip = await testZip(tmpFile)
    if (!isValidZip) {
        await fs.unlink(tmpFile).catch(() => {})
        return errBadRequest(res, 'Invalid or corrupted zip file')
    }

    // 5. 读取旧版本信息
    const dataRoot = path.resolve(path.dirname(process.argv[1]), 'data')
    const oldVersion = await readVersion(dataRoot)

    // 6. 备份旧数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupDir = `${dataRoot}.bak.${timestamp}`
    try {
        await fs.rename(dataRoot, backupDir)
    } catch (err) {
        // data 目录可能不存在（首次部署）
        if (err.code !== 'ENOENT') {
            await fs.unlink(tmpFile).catch(() => {})
            return errServer(
                res,
                `Failed to backup existing data: ${err.message}`
            )
        }
    }

    // 7. 创建新的 data 目录并解压
    await fs.mkdir(dataRoot, { recursive: true })
    try {
        await unzipToDir(tmpFile, dataRoot)
    } catch (err) {
        // 解压失败，恢复备份
        await fs.rm(dataRoot, { recursive: true, force: true }).catch(() => {})
        if (backupDir) {
            await fs.rename(backupDir, dataRoot).catch(() => {})
        }
        await fs.unlink(tmpFile).catch(() => {})
        return errServer(res, `Failed to unzip: ${err.message}`)
    }

    // 8. 验证部署结果
    const isValid = await validateDeployment(dataRoot)
    if (!isValid) {
        // 验证失败，恢复备份
        await fs.rm(dataRoot, { recursive: true, force: true }).catch(() => {})
        if (backupDir) {
            await fs.rename(backupDir, dataRoot).catch(() => {})
        }
        await fs.unlink(tmpFile).catch(() => {})
        return errBadRequest(
            res,
            `Deployment validation failed: missing required files (${requiredFiles.join(', ')})`
        )
    }

    // 9. 读取新版本信息
    const newVersion = await readVersion(dataRoot)

    // 10. 清理临时文件和过期备份
    await fs.unlink(tmpFile).catch(() => {})
    await cleanupBackups(dataRoot)

    // 11. 返回成功响应
    sendJson(res, 200, {
        message: 'Deployment successful!',
        data: {
            backup: backupDir ? path.basename(backupDir) : null,
            current: newVersion,
        },
    })
}
