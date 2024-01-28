import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        // GROUP 1 ---- 基础设施
        { path: '/', component: () => import('../../src/views/MainHome.vue') },
        { path: '/about', component: () => import('../../src/views/MainAbout.vue') },

        // GROUP 2 ---- 异常情况配置（404）
        { path: '/404', name: '404', component: () => import('../../src/views/NotFound.vue') },
        { path: '/:pathMatch(.*)', redirect: '/404' },

        // GROUP 3 ---- 数据页面
        { path: '/category', redirect: '/category/germanium' }, // 临时作为类型首页
        { path: '/category/:platform', name: 'category', component: () => import('../../src/views/DataCategoryList.vue') },
        { path: '/detail/:platform/:build', name: 'detail', component: () => import('../../src/views/DataDetail.vue') },
    ]
})

export default router