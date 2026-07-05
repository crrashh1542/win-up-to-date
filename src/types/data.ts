export type BuiltInColor = 'amber' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'purple'

// 首页数据
export interface Release {
    channel: string
    color: BuiltInColor
    version: string
    branch: string
    codename: string
    semester: string
    date: string
    category?: string
}

export interface Category {
    category: string
    id: string
    icon: string
    releases: Release[]
}

// 数据仓库版本
export interface DataVersion {
    hash: string
    date: string
}

// MainCategory 页面数据
export interface MainCategoryTag {
    name: string
    color: BuiltInColor
}

export interface MainCategoryItem {
    name: string
    semester: string
    category?: string
    latestBuild: string
    continued: boolean
    tag: MainCategoryTag[]
}

export interface MainCategoryPlatform {
    name: string
    multi: boolean
    items: MainCategoryItem[]
}

export interface MainCategory {
    category: string
    id: string
    icon: string
    platforms: MainCategoryPlatform[]
}

// Detail 页面数据
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

// CategoryList 页面数据
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

// 页面导航
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

export type RespOrigin =
    | { dataType: 'detail'; content: DetailContent }
    | { dataType: 'categoryList'; content: CategoryContent }
