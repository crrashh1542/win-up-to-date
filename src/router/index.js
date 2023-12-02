import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../../src/views/MainHome.vue') },
        { path: '/category', component: () => import('../../src/views/MainCategory.vue') },
        { path: '/about', component: () => import('../../src/views/MainAbout.vue') },
    ]
})

export default router