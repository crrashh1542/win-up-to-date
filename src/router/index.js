import { createRouter, createWebHistory } from 'vue-router'

import Versions from '../views/Versions.vue'
import About from '../views/About.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Versions },
        { path: '/about', component: About },
    ]
})

export default router