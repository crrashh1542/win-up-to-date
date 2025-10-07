import { defineConfig } from 'vite'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// 导入预启动项目脚本
import prebuild from './scripts/prebuild.mjs'
prebuild()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'mask-icon.svg',
            ],
            injectRegister: 'script-defer',
            manifest: {
                name: 'Windows Up-to-Date',
                short_name: 'Winutd',
                description:
                    "一个 Windows 系统版本实时统计站点 / A site showing latest status of Windows' development",
                theme_color: '#f6f8fe',
                icons: [
                    {
                        src: 'pwa-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        })
    ],
    server: {
        port: 14724,
        host: true,
    },
    build: {
        assetsInlineLimit: 6144,
        rollupOptions: {
            output: {
                hashCharacters: 'hex',
                assetFileNames: '_wu/assets/[name].[hash].[ext]',
                chunkFileNames: '_wu/[name].[hash].js',
                entryFileNames: '_wu/[name].[hash].js',
                minifyInternalExports: true,
                manualChunks(id) {
                    // vendor
                    if (id.includes('@vue')) {
                        return 'vendors/runtime'
                    } else if (id.includes('vue-router')) {
                        return 'vendors/router'
                    } else if (id.includes('axios')) {
                        return 'vendors/axios'
                    }
                    // 组件库
                    else if (id.includes('src/components')) {
                        return 'components'
                    }
                    // 主要页面
                    else if (id.includes('src/views/Main') || id.includes('NotFound')) {
                        return 'MainViews'
                    }
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    // 引入@作为./src的alias
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        },
    },
})
