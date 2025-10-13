import { createApp } from 'vue'
import './utils/showRepoInfo'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
