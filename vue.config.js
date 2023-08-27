/* eslint-disable */

// 引入配置及插件
const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const fs = require('fs')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 生产模式配置
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// 获取 build 信息并写入
const buildInfo = require('./prebuild.js')
buildInfo()

module.exports = defineConfig({

   transpileDependencies: true,
   indexPath: 'index.html',
   outputDir: process.env.outputDir || 'dist',
   productionSourceMap: false,
   assetsDir: 'assets',

   configureWebpack: config => {
      // gzip 处理
      const plugins = [];
      if (IS_PROD) {
         plugins.push(
            new CompressionWebpackPlugin({
               filename: "[path].gz[query]",
               algorithm: "gzip",
               test: productionGzipExtensions,
               threshold: 10240,
               minRatio: 0.8
            })
         )
      }

      // 分析各个模板编译时长
      config.plugins.push(
         new SpeedMeasurePlugin()
      )

   },

   chainWebpack: config => {

      // 自定义元素设定
      config.module.rule('vue').use('vue-loader').tap(options => ({
         ...options,
         compilerOptions: {
            // 不解析所有 fluent- 开头的元素
            isCustomElement: tag => tag.startsWith('fluent-')
         }
      }))

      // chunk 拆分
      config.optimization.splitChunks({
         chunks: 'all',
         cacheGroups: {
            // GROUP1 ------ 第三方模块
            vendor: {
               name: 'vendors',
               test: /[\\/]node_modules[\\/]/,
               priority: 10,
               chunks: 'initial'
            },
            // GROUP2 ------ 项目内组件
            commons: {
               name: 'common',
               test: resolve('src/components'),
               priority: 25,
               reuseExistingChunk: true
            },
         },
      })
      // GROUP3 ------ 运行时
      config.optimization.runtimeChunk({
         name: 'runtime'
      })
   },

   devServer: {
      host: "localhost",
      port: 8080,
      open: false
   }
})
