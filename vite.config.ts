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
                        src: 'pwa-128.jpg',
                        sizes: '48x48 72x72 96x96 128x128',
                        type: 'image/jpeg',
                    },
                    {
                        src: 'pwa-256.jpg',
                        sizes: '144x144 192x192 256x256',
                        type: 'image/jpeg',
                    },
                ],
            },
        }),
    ],
    server: {
        port: 9883,
        host: true,
        proxy: {
            '/v2': {
                target: 'http://localhost:9884',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/v2/, ''),
            },
        },
    },
    build: {
        assetsInlineLimit: 6144,
        rolldownOptions: {
            output: {
                minify: true,
                assetFileNames: (asset) => {
                    if (asset.name.startsWith('vendor-')) {
                        return '_wu/vendor/[hash].[ext]'
                    }
                    return '_wu/[name]-[hash].[ext]'
                },
                chunkFileNames: (chunk) => {
                    if (chunk.name.startsWith('vendor-')) {
                        return '_wu/vendor/[hash].js'
                    }
                    return '_wu/[name]-[hash].js'
                },
                entryFileNames: '_wu/[name]-[hash].js',
                codeSplitting: {
                    groups: [
                        {
                            name: 'vendor-router',
                            test: /router/,
                            priority: 10,
                        },
                        {
                            name: 'vendor-vue',
                            test: /@vue\/reactivity|runtime-core/,
                            priority: 11,
                        },
                        {
                            name: 'vendor-axios',
                            test: /axios/,
                            priority: 10,
                        },
                        {
                            name: 'vendor-iconify',
                            test: /node_modules/,
                            priority: 9,
                        },
                        {
                            name: 'components',
                            test: /[\\/]src[\\/]components[\\/]|utils[\\/]/,
                            priority: 5,
                        },
                        {
                            name: 'MainViews',
                            test: /[\\/]src[\\/]views[\\/]/,
                            priority: 5,
                        },
                    ],
                },
            },
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${resolve(import.meta.dirname, 'src/styles/global.less')}";`,
            },
        },
    },
    // 引入@作为./src的alias
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './src'),
        },
    },
})
