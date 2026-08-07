'use strict'
/**
 * 此脚本用于在开始打包前处理配置信息
 * @author crrashh1542
 * @version 2.2
 */

// STEP1 -------- 导入依赖
import fs from 'node:fs'
import childProcess from 'node:child_process'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import packageInfo from '../package.json' with { type: 'json' }

const execCmd = (command) => {
    try {
        return childProcess.execSync(command, { encoding: 'utf8' }).trim()
    } catch {
        return ''
    }
}

// STEP2 -------- 获取构建时间
const getTime = () => {
    let now = new Date()
    // 获取年、月、日、时、分、秒
    let year = now.getFullYear()
    let month = String(now.getMonth() + 1).padStart(2, '0')
    let day = String(now.getDate()).padStart(2, '0')
    let hours = String(now.getHours()).padStart(2, '0')
    let minutes = String(now.getMinutes()).padStart(2, '0')
    let seconds = String(now.getSeconds()).padStart(2, '0')
    // 获取时区偏移量（分钟）
    let offsetTimeZone = now.getTimezoneOffset()
    let offsetHours = Math.floor(Math.abs(offsetTimeZone) / 60)
    let offsetMinutes = Math.abs(offsetTimeZone) % 60
    // 构建时区字符串（+/-HH:MM）
    let timezoneSign = offsetTimeZone <= 0 ? '+' : '-'
    let timezoneString = `${timezoneSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`
    // 组合格式
    let formattedTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneString}`
    console.log('[buildInfo] 已获取构建时间：' + formattedTime)
    return formattedTime
}

// STEP3 -------- 获取构建 hash
const getHash = () => {
    const buildHash =
        execCmd('git rev-parse --short HEAD') ||
        process.env.GITHUB_SHA?.slice(0, 7) ||
        'unknown'
    console.log('[buildInfo] 已获取当前提交 hash：' + buildHash)
    return buildHash
}

// STEP5 -------- 获取构建次数
const getBuild = () => {
    const buildStr =
        execCmd('git rev-list HEAD --count') ||
        process.env.GITHUB_RUN_NUMBER ||
        '0'
    const buildTime = Number.parseInt(buildStr, 10)
    console.log('[buildInfo] 已获取构建数：' + buildTime)
    return Number.isNaN(buildTime) ? 0 : buildTime
}

// STEP4 -------- 获取构建分支
const getBranch = () => {
    let buildBranch =
        execCmd('git rev-parse --abbrev-ref HEAD') ||
        process.env.GITHUB_REF_NAME ||
        process.env.GITHUB_REF?.split('/').pop() ||
        'unknown'
    buildBranch = buildBranch.replaceAll('/', '_')
    console.log('[buildInfo] 已获取当前分支：' + buildBranch)
    return buildBranch
}

// STEP6 -------- 组装并输出到文件
const writeInfo = () => {
    // 组装要输出的内容
    const content = {
        time: getTime(),
        hash: getHash(),
        build: getBuild(),
        branch: getBranch(),
    }

    // 当构建命令带有 --ci 参数时，标记当前构建为 CI 构建
    if (process.env.WU_ENV_CI === 'true') {
        content.ci = true
    }

    // 当版本号不是干净的 semver（x.y.z）时，标记当前构建为 Beta 构建
    if (!/^\d+\.\d+\.\d+$/.test(packageInfo.version)) {
        content.beta = true
    }

    // 将 buildInfo 内容写入文件
    // 由于执行者是 /vite.config.js，所以执行目录在项目的根目录，故此处使用 ./scripts/ 来导引路径
    const outputPath = path.resolve('scripts/buildInfo.json')
    try {
        fs.writeFileSync(outputPath, JSON.stringify(content, null, 3) + '\n')
        console.log('[buildInfo] 构建信息写入成功！')
    } catch (err) {
        console.log('[buildInfo] 构建信息写入失败，详情请参阅：\n' + err)
    }
}

// STEP7 -------- 导出函数
export default writeInfo

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    writeInfo()
}
