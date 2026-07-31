import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'
import repoInfo from './utils/parseRepoInfo'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')

const styleVerName = `font-size: 14px;
                    color: #000;
                    background-color: #8ad5b3;
                    padding: 5px 9px;
                    border-radius: 3px 0 0 3px;
                    margin: 10px 0; `
const styleVerValue = `font-size: 14px;
                     color: #fff;
                     background-color: #607d8b;
                     padding: 5px 9px;
                     border-radius: 0 3px 3px 0;
                     margin: 6px 0; `
console.log('%c%s%c%s', styleVerName, 'wutd', styleVerValue, 'v' + repoInfo.version)
console.log(`Build Tag: ${repoInfo.buildTag} (g${repoInfo.hash})`)
