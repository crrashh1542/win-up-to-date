'use strict'

import { build } from 'vite'

const isCI = process.argv.slice(2).includes('--ci')
process.env.WU_ENV_CI = isCI ? 'true' : 'false'

try {
    await build()
} catch (err) {
    console.error('[buildInfo] 构建失败，详情请参阅：\n' + err)
    process.exit(1)
}
