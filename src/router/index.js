import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        // GROUP 1 ---- 基础设施
        { path: '/', component: () => import('@/views/MainHome.vue') },
        { path: '/about', component: () => import('@/views/MainAbout.vue') },
        { path: '/settings', component: () => import('@/views/MainSettings.vue') },

        // GROUP 2 ---- 数据页面
        { path: '/category', redirect: '/category/26H1-bromine' }, // 临时作为类型首页
        {
            path: '/category/:platform',
            name: 'category',
            component: () => import('@/views/DataCategoryList.vue'),
        },
        {
            path: '/detail/:platform/:build',
            name: 'detail',
            component: () => import('@/views/DataDetail.vue'),
        },

        // GROUP 3 ---- 异常情况配置（404）
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/NotFound.vue'),
        },
        { path: '/:pathMatch(.*)', redirect: '/404' },

        
    ],
})

export default router
