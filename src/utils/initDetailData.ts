/**
 * 此 util 用于初始化详情页面数据
 */

import { setTitle } from './title'
import type { NavItem, NavData, PageData, RespOrigin } from '@/types'

type NavMapper<T> = (ref: T) => NavItem

// 构建导航数据
const buildNav = <T>(
    nav: { previous?: T; next?: T },
    type: NavData['type'], // detail | categoryList
    mapFn: NavMapper<T> // 映射函数
): NavData => {
    const result: NavData = { type }
    // 映射上一页和下一页数据
    if (nav.previous) result.prev = mapFn(nav.previous)
    if (nav.next) result.next = mapFn(nav.next)
    return result
}

export default (respOrigin: RespOrigin, data: PageData) => {
    const { dataType, content } = respOrigin

    // 1. 重置数据
    data.data = content

    // 2. 关闭加载动画
    data.isLoading = false

    // 3. 设置导航栏和标题
    if (dataType === 'detail') {
        data.nav = buildNav(content.nav, 'detail', ref => ({
            platform: ref.category,
            build: ref.build,
            route: `/detail/${ref.category}/${ref.build}`
        }))
        setTitle(content.build.number)
    } else {
        data.nav = buildNav(content.nav, 'categoryList', ref => ({
            platform: ref.name,
            path: ref.path,
            route: `/category/${ref.path}`
        }))
        setTitle(content.name)
    }
}
