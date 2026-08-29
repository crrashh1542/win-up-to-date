/**
 * 此 util 用于处理本项目相关信息
 */

import packageInfo from '../../package.json'
import type { BuildInfo } from '@/types'

// 构建信息由 vite.config.ts 在构建时通过 define 注入
declare const __BUILD_INFO__: BuildInfo
const buildInfo = __BUILD_INFO__

// 项目信息相关
const pkgRepo = packageInfo.repository.url.split('+')[1] // 项目地址
const pkgRepoName = pkgRepo.split('https://github.com/')[1] // 项目名

// 获取 build tag
const buildTag = (() => {
    // 处理版本号和分支
    const buildNum = buildInfo.build
    const buildBranch = buildInfo.branch
    // 处理构建时间
    const fullTime = buildInfo.time
    const [bYear, bMonth, bDay, bHour, bMin] = [
        fullTime.substring(2, 4),
        fullTime.substring(5, 7),
        fullTime.substring(8, 10),
        fullTime.substring(11, 13),
        fullTime.substring(14, 16),
    ]
    const buildTime = bYear + bMonth + bDay + '-' + bHour + bMin
    return buildNum + '.' + buildBranch + '.' + buildTime
})()

// 单独导出各个字段
export const build = buildInfo.build
export const hash = buildInfo.hash
export const isCi = buildInfo.ci
export const isBeta = buildInfo.beta
export const repoUrl = pkgRepo
export const repoVersion = packageInfo.version
export const repoName = pkgRepoName
export { buildTag }
