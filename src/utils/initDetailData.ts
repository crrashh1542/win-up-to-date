/**
 * 此 util 用于初始化详情页面数据
 */

import { setTitle } from './title'
import type { DetailContent, CategoryContent, NavData, PageData, RespOrigin } from '@/types'

const buildDetailNav = (resp: DetailContent): NavData => {
    const { previous, next } = resp.nav
    const nav: NavData = { type: 'detail' }
    if (previous) {
        nav.prev = {
            platform: previous.category,
            build: previous.build,
            route: '/detail/' + previous.category + '/' + previous.build
        }
    }
    if (next) {
        nav.next = {
            platform: next.category,
            build: next.build,
            route: '/detail/' + next.category + '/' + next.build
        }
    }
    return nav
}

const buildCategoryNav = (resp: CategoryContent): NavData => {
    const { previous, next } = resp.nav
    const nav: NavData = { type: 'categoryList' }
    if (previous) {
        nav.prev = {
            platform: previous.name,
            path: previous.path,
            route: '/category/' + previous.path
        }
    }
    if (next) {
        nav.next = {
            platform: next.name,
            path: next.path,
            route: '/category/' + next.path
        }
    }
    return nav
}

export default (respOrigin: RespOrigin, data: PageData) => {
    const { dataType, content } = respOrigin

    // 1. 重置数据
    data.data = content

    // 2. 关闭加载动画
    data.isLoading = false

    // 3. 设置导航栏和标题
    if (dataType === 'detail') {
        const resp = content as DetailContent
        data.nav = buildDetailNav(resp)
        setTitle(resp.build.number)
    } else {
        const resp = content as CategoryContent
        data.nav = buildCategoryNav(resp)
        setTitle(resp.name)
    }
}
