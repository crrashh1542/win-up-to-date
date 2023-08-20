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

   // chunk 拆分
   chainWebpack: config => {
      config.optimization.splitChunks({
         chunks: 'all',
         cacheGroups: {
            vendor: {
               name: 'vendors',
               test: /[\\/]node_modules[\\/]/,
               priority: 10,
               chunks: 'initial'
            },
            commons: {
               name: 'common',
               test: resolve('src/components'),
               priority: 25,
               reuseExistingChunk: true
            },
         },
      })
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
