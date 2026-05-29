// 此文件用于中转图标文件，图标均来自 amicons 与 iconfont。
// 本目录下图标来自 iconfont，见 https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4217937

import { aiAzure, aiCompactDisc, aiServer, aiWindows } from '@studio384/amicons'
import branch from './branch.svg'
import rocket from './rocket.svg'
import windows10 from './windows10.svg'

const toUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`

const icons: Record<string, string> = {
    azure: toUri(aiAzure.data),
    branch,
    iso: toUri(aiCompactDisc.data),
    server: toUri(aiServer.data),
    rocket,
    windows10,
    windows11: toUri(aiWindows.data)
}

export default icons
