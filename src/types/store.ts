// 设置项
export type Settings = {
    // 全局设置
    isDarkMode: boolean // 深色模式
    // 主页设置
    isShowFlight: boolean // 显示开发周期及代号
    isShowBranch: boolean // 显示分支
}
// 设置菜单
export type SettingsMenu = {
    name: string // 菜单名称
    id: number // 菜单 ID
    items: {
        name: string // 项目名称
        icon: string // 图标
        value: keyof Settings // 对应的设置项
        enabled: boolean // 是否启用
    }[]
}[]

export type ToastIntent = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition =
    | 'top'
    | 'top-end'
    | 'top-start'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'

export interface ToastOptions {
    title: string // 标题
    body?: string // 内容
    intent?: ToastIntent // 类型
    position?: ToastPosition // 位置
    duration?: number // 显示时长，默认 4000ms
}

export interface ToastItem extends Required<Omit<ToastOptions, 'duration'>> {
    id: number
    duration: number
}
