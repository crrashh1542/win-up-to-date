import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteTitle, clearTitle } from '@/utils/title'

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        // GROUP 1 ---- 基础设施
        { path: '/', component: () => import('@/views/MainHome.vue') },
        { path: '/about', component: () => import('@/views/MainAbout.vue'), meta: { title: '关于项目' } },
        { path: '/settings', component: () => import('@/views/MainSettings.vue'), meta: { title: '设置' } },

        // GROUP 2 ---- 数据页面
        { path: '/category', redirect: '/category/26H1-bromine' }, // 临时作为类型首页
        {
            path: '/category/:platform',
            name: 'category',
            component: () => import('@/views/DataCategoryList.vue'),
            meta: { title: '版本列表' },
        },
        {
            path: '/detail/:platform/:build',
            name: 'detail',
            component: () => import('@/views/DataDetail.vue'),
            meta: { title: '版本详情' },
        },

        // GROUP 3 ---- 异常情况配置（404）
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/NotFound.vue'),
            meta: { title: '404' },
        },
        { path: '/:pathMatch(.*)', redirect: '/404' },

        
    ],
})

router.beforeEach((to, from, next) => {
    clearTitle()
    next()
})

router.afterEach(to => {
    applyRouteTitle(to.meta?.title)
})

export default router
