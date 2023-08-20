// 引入各种各样的库
import { createApp } from 'vue'
import showInfo from './scripts/showInfo'

// 引入 App 组件
import App from './App.vue'

// 注册 App 组件
createApp(App).mount('#app')
showInfo()