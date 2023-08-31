import { createRouter, createWebHashHistory } from 'vue-router'

import Versions from '../views/Versions.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Versions }
    ]
})

export default router