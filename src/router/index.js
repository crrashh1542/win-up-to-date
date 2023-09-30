import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../../src/views/Versions.vue') },
        { path: '/about', component: () => import('../../src/views/About.vue') },
    ]
})

export default router