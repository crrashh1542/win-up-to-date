'use strict'
/**
 * 此脚本用于在处理本项目相关信息
 * @author crrashh1542
 * @version 2.0
 */

import packageInfo from '../../package.json'
import buildInfo from '../../scripts/buildInfo.json'

// 项目信息相关
const pkgVersion = 'v' + packageInfo.version + ' (build ' + buildInfo.build + ')' // 项目版本号
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

// 导出数据
export interface AboutItem {
    label: string
    icon: string
    value: string
    link?: string
}

const aboutInfo: AboutItem[] = [
    { label: '站点版本', icon: 'search', value: pkgVersion },
    { label: '项目地址', icon: 'code', value: pkgRepoName, link: pkgRepo },
    { label: '交流群组', icon: 'chat', value: '442133970', link: 'https://qm.qq.com/q/UAI4de5OM0' },
]
export { aboutInfo, buildTag }
