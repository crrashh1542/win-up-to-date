import { setTitle } from './title'

// 接口数据结构 BEGIN
// Detail
export interface DetailBuild {
    number: string
    branch: string
    compileTime: string
    arch: string[]
    counterpart: string
}
export interface DetailRelease {
    channel: string
    time: string
    url: string
    announcePlace: string
}
export interface DetailFeatureIds {
    url: string
    fileName: string
}
export interface DetailNavRef {
    category: string
    build: string
}
export interface DetailBelongsTo {
    path: string
    name: string
}
export interface DetailUpdateId {
    arch: string
    id: string
}
export interface DetailDownload {
    name: string
    link: { url: string; source: string }[]
    arch: string
    md5?: string
    sha256?: string
    size?: string
}
export interface DetailContent {
    build: DetailBuild
    release?: DetailRelease
    featureIds?: DetailFeatureIds
    nav: { previous?: DetailNavRef; next?: DetailNavRef }
    belongsTo: DetailBelongsTo
    updateId?: DetailUpdateId[]
    download?: DetailDownload
}

// CategoryList
export interface CategoryNavRef {
    path: string
    name: string
}
export interface CategoryContent {
    name: string
    codename: string
    belonging: string
    semester: string
    range: [string, string]
    nav: { previous?: CategoryNavRef; next?: CategoryNavRef }
    list: [string, string][]
}

// 其它通用结构
export interface NavItem {
    platform: string
    route: string
    build?: string
    path?: string
}
export interface NavData {
    type: 'detail' | 'categoryList'
    prev?: NavItem
    next?: NavItem
}
export interface PageData {
    data: DetailContent | CategoryContent
    isLoading: boolean
    nav?: NavData | null
}
export interface RespOrigin {
    dataType: 'detail' | 'categoryList'
    content: DetailContent | CategoryContent
}
// 结构 END

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
