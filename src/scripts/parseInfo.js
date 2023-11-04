"use strict"
/**
 * 此脚本用于在处理本项目相关信息
 * @author crrashh1542
 * @version 1.1
 */

import packageInfo from '/package.json'
import buildInfo from '/temp/buildInfo.json'

// packageInfo 相关
const packageVerNum = packageInfo.version // 项目版本号
const packageRepo = packageInfo.repository // 项目地址
const packageDeps = packageInfo.dependencies // 依赖版本

// buildInfo 相关
const buildTime = buildInfo.time // 构建时间
const buildHash = buildInfo.hash // commit hash
const buildNum = buildInfo.build // 构建次数

// 构建时间处理
const parseBuildTime = t => {
    // 由 /temp/buildInfo.js 可知，time 参数格式均为 xxxx-xx-xxTyy:yy+zz:zz
    const date = t.slice(0, 10) // 日期
    const time = t.slice(11, 19) // 时间
    const offset = t.slice(19, 25) // 时区偏移
    if(offset === '+08:00') { // 设置时区
        return date + ' ' + time + ' CST'
    } else {
        return date + ' ' + time
    }
}

// 项目版本处理
const parseVersion = v => {
    // 如果版本带后缀，就不返回 hash，减少移动端视觉占用空间
    if(v.indexOf('-') !== -1) {
        return 'v' + packageVerNum + ' (build ' + buildNum + ')'
    } else {
        return 'v' + packageVerNum + '@' + buildHash + ' (build ' + buildNum + ')'
    }
}

// 数据合并
const pVersion = parseVersion(packageVerNum) // 完整版本
const pTime = parseBuildTime(buildTime) // 构建时间
const pRepo = packageRepo.split('https://github.com/')[1] // 项目名
const pVue = 'v' + packageDeps['vue'].split('^')[1] // Vue 框架版本
const pUI = 'v' + packageDeps['@fluentui/web-components'].split('^')[1] // 组件库版本

// 导出数据
export default [
    ['项目版本', 'icon-version' , pVersion],
    ['构建时间', 'icon-time', pTime],
    ['项目地址', 'icon-github', packageRepo, pRepo],
    ['Vue 框架版本', 'icon-vuejs', pVue],
    ['Fluent UI 组件库版本', 'icon-fluent', pUI]
]