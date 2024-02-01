"use strict"
/**
 * 此脚本用于在处理本项目相关信息
 * @author crrashh1542
 * @version 1.5
 */

import packageInfo from '/package.json'
import buildInfo from '/temp/buildInfo.json'

// packageInfo 相关
const packageVerNum = packageInfo.version // 项目版本号
const packageRepo = packageInfo.repository // 项目地址
const packageDeps = packageInfo.dependencies // 依赖版本

// buildInfo 相关
const buildNum = buildInfo.build // 构建次数

// 数据合并
const pVersion = 'v' + packageVerNum + ' (build ' + buildNum + ')' // 完整版本
const pRepoName = packageRepo.split('https://github.com/')[1] // 项目名
const pVue = 'v' + packageDeps['vue'].split('^')[1] // Vue 框架版本
const pUI = 'v' + packageDeps['@fluentui/web-components'].split('^')[1] // 组件库版本

// 导出数据
export default [
    ['项目版本', 'icon-version' , pVersion],
    ['项目地址', 'icon-github', packageRepo, pRepoName],
    ['Vue 框架版本', 'icon-vuejs', pVue],
    ['Fluent UI 组件库版本', 'icon-fluent', pUI],
    ['交流群组', 'icon-qq', 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=4hmQNZoNwcIJ1YiSDSKKyMfuB-jrmC-N&authKey=Y3vSPFPTrJG5ygcd9e8tNdt5SM0ycnRGurSGdaoM0XJjKVKL9S58jc2YjnFmbPAs&noverify=0&group_code=672660118', '672660118']
]