/**
 * 此 util 用于处理本项目相关信息
 */

import packageInfo from '../../package.json'
import buildInfo from '../../scripts/buildInfo.json'
import type { AboutItem } from '@/types'

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

const styleVerName = `font-size: 14px;
                    color: #000;
                    background-color: #8ad5b3;
                    padding: 5px 9px;
                    border-radius: 3px 0 0 3px;
                    margin: 10px 0; `
const styleVerValue = `font-size: 14px;
                     color: #fff;
                     background-color: #607d8b;
                     padding: 5px 9px;
                     border-radius: 0 3px 3px 0;
                     margin: 6px 0; `
console.log('%c%s%c%s', styleVerName, 'wutd', styleVerValue, 'v' + packageInfo.version)
console.log(`Build Tag: ${ buildTag } (g${ buildInfo.hash })`)

const aboutInfo: AboutItem[] = [
    { label: '站点版本', icon: 'search', value: pkgVersion },
    { label: '项目地址', icon: 'code', value: pkgRepoName, link: pkgRepo },
    { label: '交流群组', icon: 'chat', value: '442133970', link: 'https://qm.qq.com/q/UAI4de5OM0' },
]
export default aboutInfo
