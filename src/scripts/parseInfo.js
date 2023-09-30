"use strict"
/**
 * 此脚本用于在处理本项目相关信息
 * @author crrashh1542
 * @version 1.0
 */

import packageInfo from '/package.json'
import buildInfo from '/temp/buildInfo.json'

import moment from 'moment'

// packageInfo 相关
const packageVerNum = packageInfo.version // 项目版本号
const packageRepo = packageInfo.repository // 项目地址
const packageDeps = packageInfo.dependencies // 依赖版本

// buildInfo 相关
const buildTime = buildInfo.time // 构建时间
const buildHash = buildInfo.hash // commit hash
const buildNum = buildInfo.build // 构建次数

// 数据处理
const pVersion = 'v' + packageVerNum + '@' + buildHash + ' (build ' + buildNum + ')' // 完整版本
const pTime = moment(buildTime).format('YYYY-MM-DD HH:mm:ss') + ' CST' // 构建时间
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