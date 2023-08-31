import { createApp } from 'vue'
import showInfo from './scripts/showInfo'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')

showInfo()