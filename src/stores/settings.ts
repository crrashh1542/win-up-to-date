import { ref } from 'vue'
import { defineStore } from 'pinia'

type Settings = {
    // 全局设置
    isDarkMode: boolean // 深色模式
    // 主页设置
    isShowFlight: boolean // 显示开发周期及代号
    isShowBranch: boolean // 显示分支
}

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref<Settings>({
        // 全局设置
        isDarkMode: false, // 深色模式
        // 主页设置
        isShowFlight: true, // 显示开发周期及代号
        isShowBranch: true, // 显示分支
    })
    return { settings }
})
