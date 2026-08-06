/**
 * Windows Up-to-Date 服务端管理接口
 */

import { Buffer } from 'node:buffer'
import fs from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'
import { crc32 as zlibCrc32 } from 'node:zlib'

import yauzl from 'yauzl'

const maxUploadSize = 2 * 1024 * 1024
const requiredFiles = ['version.json', 'index/category.json', 'index/latest-builds.json']

// Node < 20.15 的 zlib 没有 crc32，提供表驱动回退实现
const crc32Of = (buf) => {
    if (typeof zlibCrc32 === 'function') return zlibCrc32(buf) >>> 0
    const table = new Uint32Array(256)
    for (let n = 0; n < 256; n++) {
        let c = n
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        table[n] = c >>> 0
    }
    let c = 0xffffffff
    for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8)
    return (c ^ 0xffffffff) >>> 0
}

// 定义 server 运行目录
const serverDir = path.resolve(path.dirname(process.argv[1]))
const tmpDir = path.join(serverDir, '.tmp')

// 发送 JSON 响应
const sendJson = (res, status, payload) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.end(JSON.stringify({ code: status, ...payload }))
}
// 错误响应
const errUnauthorized = (res) =>
    sendJson(res, 401, { message: 'Unauthorized: Invalid or missing token' })
const errBadRequest = (res, msg) => sendJson(res, 400, { message: msg })
const errServer = (res, msg) => sendJson(res, 500, { message: msg || 'Internal server error' })

/**
 * 校验 Bearer Token（常量时间比较，避免时序攻击）
 */
const authenticate = (req) => {
    const expectedToken = process.env.WUTD_ADMIN_TOKEN
    if (!expectedToken) {
        console.error('[ERROR] WUTD_ADMIN_TOKEN environment variable is not set')
        return false
    }
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false
    }
    const token = authHeader.slice(7)
    if (token.length !== expectedToken.length) return false
    let result = 0
    for (let i = 0; i < token.length; i++) {
        result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i)
    }
    return result === 0
}

/**
 * 将请求体写入临时文件
 * - 先根据 Content-Length 快速拒绝超限请求，避免无谓落盘
 * - 使用 wx 独占创建 + 随机后缀，避免并发上传时文件名冲突
 */
const writeTempFile = async (req) => {
    const contentLength = Number(req.headers['content-length'] ?? 0)
    if (contentLength > maxUploadSize) return null
    await fs.mkdir(tmpDir, { recursive: true })
    const tmpFile = path.join(
        tmpDir,
        `deploy-${Date.now()}-${Math.random().toString(36).slice(2)}.zip`
    )
    let size = 0
    const writeStream = createWriteStream(tmpFile, { flags: 'wx' })
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

// === zip 内容检测 BEGIN ===

// 归一化 zip 条目名
const normalizeEntryPath = (entryName) => {
    if (typeof entryName !== 'string' || entryName.length === 0) return null
    const normalized = entryName.replaceAll('\\', '/')
    // 返回归一化后的相对路径
    if (
        normalized.startsWith('/') ||
        /^[A-Za-z]:\//.test(normalized) ||
        normalized.includes('\0')
    ) {
        // 不安全 return null
        return null
    }
    const parts = normalized.split('/')
    if (parts.some((p) => p === '..' || p === '.')) return null
    return parts.filter(Boolean).join('/')
}
// 计算条目路径
const resolveEntry = (targetDir, entryName) => {
    const rel = normalizeEntryPath(entryName)
    // 若解析后越出 targetDir，throw
    if (!rel) {
        throw new Error(`不安全的 zip 条目：${JSON.stringify(entryName)}`)
    }
    const root = path.resolve(targetDir)
    const target = path.resolve(root, rel)
    if (target !== root && !target.startsWith(root + path.sep)) {
        throw new Error(`zip 条目越界：${JSON.stringify(entryName)}`)
    }
    return { rel, target }
}
// 判断条目是否为符号链接
const isSymlink = (entry) => {
    const unixMode = (entry.externalFileAttributes ?? 0) >>> 16
    return (unixMode & 0o170000) === 0o120000
}

// === zip 内容检测 END ===

/**
 * zip 解压函数
 * - 逐个校验条目路径，阻止路径穿越与符号链接
 * - 逐条目全量读取后自行校验 CRC-32（yauzl 默认不校验数据完整性）
 *   同时流中途出错（截断）也抛错
 * @param {string} zipPath zip 文件路径
 * @param {string} targetDir 解压目标目录
 */
export const extractZip = async (zipPath, targetDir) => {
    await fs.mkdir(targetDir, { recursive: true })
    const zip = await new Promise((resolve, reject) => {
        yauzl.open(zipPath, { lazyEntries: true, autoClose: true }, (err, zf) =>
            err ? reject(err) : resolve(zf)
        )
    })

    await new Promise((resolve, reject) => {
        const fail = (err) => {
            zip.close()
            reject(err)
        }
        zip.on('entry', (entry) => {
            Promise.resolve()
                .then(async () => {
                    const { rel, target } = resolveEntry(targetDir, entry.fileName)
                    if (isSymlink(entry)) {
                        throw new Error(`zip 包含符号链接，已拒绝：${entry.fileName}`)
                    }
                    if (rel.endsWith('/')) {
                        // 目录条目
                        await fs.mkdir(target, { recursive: true })
                    } else {
                        await fs.mkdir(path.dirname(target), {
                            recursive: true,
                        })
                        // 全量读取条目数据，同时自行校验 CRC-32
                        const data = await new Promise((res, rej) => {
                            // 注意：yauzl 的 openReadStream 是回调式 API，返回流通过回调给出
                            zip.openReadStream(entry, (err, rs) => {
                                if (err) return rej(err)
                                const chunks = []
                                rs.on('data', (c) => chunks.push(c))
                                rs.on('error', rej)
                                rs.on('end', () => res(Buffer.concat(chunks)))
                            })
                        })
                        if (crc32Of(data) !== entry.crc32 >>> 0) {
                            throw new Error(`zip 条目 CRC 校验失败：${entry.fileName}`)
                        }
                        await fs.writeFile(target, data)
                    }
                    zip.readEntry()
                })
                .catch(fail)
        })
        zip.on('end', resolve)
        zip.on('error', fail)
        zip.readEntry()
    })
}

// 读取 version.json
const readVersion = async (dir) => {
    try {
        const raw = await fs.readFile(path.join(dir, 'version.json'), 'utf-8')
        return JSON.parse(raw)
    } catch {
        return null
    }
}
// 验证部署结果
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
// 清理过期的 backup
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
        // 最多保留 5 个
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

// 部署处理函数
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
    // 4. 解压到独立 staging 目录（校验完整性 + 防路径穿越）
    //    在 staging 内完成全部校验后再切换，失败不会触碰现有数据
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const stagingDir = path.join(tmpDir, `staging-${timestamp}`)
    try {
        await extractZip(tmpFile, stagingDir)
    } catch (err) {
        await fs.rm(stagingDir, { recursive: true, force: true }).catch(() => {})
        await fs.unlink(tmpFile).catch(() => {})
        return errBadRequest(res, `Invalid or corrupted zip file: ${err.message}`)
    }

    // 5. 验证部署结果
    if (!(await validateDeployment(stagingDir))) {
        await fs.rm(stagingDir, { recursive: true, force: true }).catch(() => {})
        await fs.unlink(tmpFile).catch(() => {})
        return errBadRequest(
            res,
            `Deployment validation failed: missing required files (${requiredFiles.join(', ')})`
        )
    }

    // 6. 读取旧版本信息
    const dataRoot = path.join(serverDir, 'data')
    const oldVersion = await readVersion(dataRoot)

    // 7. 备份旧数据
    const backupDir = `${dataRoot}.bak.${timestamp}`
    let backupCreated = false
    try {
        await fs.rename(dataRoot, backupDir)
        backupCreated = true
    } catch (err) {
        // data 目录可能不存在（首次部署）
        if (err.code !== 'ENOENT') {
            await fs.rm(stagingDir, { recursive: true, force: true }).catch(() => {})
            await fs.unlink(tmpFile).catch(() => {})
            return errServer(res, `Failed to backup existing data: ${err.message}`)
        }
    }

    // 8. 将 staging 原子切换为 dataRoot
    try {
        await fs.rename(stagingDir, dataRoot)
    } catch (err) {
        // 切换失败，恢复备份
        if (backupDir) {
            await fs.rename(backupDir, dataRoot).catch(() => {})
        }
        await fs.rm(stagingDir, { recursive: true, force: true }).catch(() => {})
        await fs.unlink(tmpFile).catch(() => {})
        return errServer(res, `Failed to activate deployment: ${err.message}`)
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
            // 首次部署（原本没有 data）时没有备份，如实返回 null
            backup: backupCreated ? path.basename(backupDir) : null,
            current: newVersion,
        },
    })
}
