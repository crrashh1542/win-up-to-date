import { createRouter, createWebHistory } from 'vue-router'

import Versions from '../views/Versions.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Versions },
    ]
})

export default router