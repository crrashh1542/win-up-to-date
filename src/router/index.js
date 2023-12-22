import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../../src/views/MainHome.vue') },

        { path: '/category', redirect: '/category/Germanium' }, // 临时作为类型首页
        { path: '/category/:platform', name: 'category', component: () => import('../../src/views/CategoryList.vue') },

        { path: '/about', component: () => import('../../src/views/MainAbout.vue') },
    ]
})

export default router