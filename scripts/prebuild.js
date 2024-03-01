/* eslint-disable */
"use strict"
/**
 * 此脚本用于在开始打包前处理配置信息
 * @author crrashh1542
 * @version 1.5
 */

// STEP1 -------- 导入依赖
const fs = require('fs')
const childProcess = require('child_process')
const moment = require('moment')

// STEP2 -------- 获取构建时间
function getTime() {
   const buildTime = moment(Date.now()).format()
   console.log('[buildInfo] 已获取构建时间：' + buildTime)
   return buildTime
}

// STEP3 -------- 获取构建 hash
function getHash(params) {
   const buildHash = childProcess.execSync('git rev-parse --short HEAD', { 'encoding': 'utf8' }).split('\n')[0]
   console.log('[buildInfo] 已获取当前提交 hash：' + buildHash)
   return buildHash
}

// STEP5 -------- 获取构建分支
function getBuild(params) {
   const buildHash = childProcess.execSync('git rev-list HEAD --count', { 'encoding': 'utf8' }).split('\n')[0]
   console.log('[buildInfo] 已获取构建数：' + buildHash)
   return buildHash
}

// STEP4 -------- 获取构建次数
function getBranch(params) {
   const buildBranch = childProcess.execSync('git rev-parse --abbrev-ref HEAD', { 'encoding': 'utf8' }).split('\n')[0]
   console.log('[buildInfo] 已获取当前分支：' + buildBranch)
   return buildBranch
}

// STEP6 -------- 组装并输出到文件
function writeInfo() {
   // 组装要输出的内容
   const content = `   {
      "time": "` + getTime() + `",
      "hash": "` + getHash() + `",
      "build": ` + getBuild() + `,
      "branch": "` + getBranch() + `"
   }`

   // 将 buildInfo 内容写入文件
   // 由于执行者是 /vue.config.js，所以执行目录在项目的根目录，故此处使用 ./scripts/ 来导引路径
   fs.writeFile('./scripts/buildInfo.json', content, err => {
      if (err === null) {
         console.log('[buildInfo] 构建信息写入成功！')
      } else {
         console.log('[buildInfo] 构建信息写入失败，详情请参阅：\n' + err)
      }
   })

}

// STEP7 -------- 导出函数
module.exports = writeInfo