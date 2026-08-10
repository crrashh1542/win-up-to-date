/**
 * 此 util 用于处理本项目相关信息
 */

import packageInfo from '../../package.json'
import _buildInfo from '../../scripts/buildInfo.json'
import type { RepoInfo, BuildInfo } from '@/types'

const buildInfo = _buildInfo as BuildInfo

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

const repoInfo: RepoInfo = {
    version: packageInfo.version,
    build: buildInfo.build,
    hash: buildInfo.hash,
    isCi: buildInfo.ci,
    isBeta: buildInfo.beta,
    repo: pkgRepo,
    repoName: pkgRepoName,
    buildTag: buildTag,
}
export default repoInfo
