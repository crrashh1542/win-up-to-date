import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref({
        // 全局设置
        isDarkMode: false, // 深色模式
        // 主页设置
        isShowFlight: true, // 显示开发周期及代号
        isShowBranch: true, // 显示分支
    })
    return { settings }
})