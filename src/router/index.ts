import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteTitle, clearTitle } from '@/utils/title'

declare module 'vue-router' {
    interface RouteMeta {
        title?: string
    }
}

const router = createRouter({
    linkActiveClass: 'path-active',
    history: createWebHistory(),
    routes: [
        // GROUP 1 ---- 基础设施
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/MainHome.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/MainAbout.vue'),
            meta: { title: '关于项目' },
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/MainSettings.vue'),
            meta: { title: '设置' },
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/views/MainCategory.vue'),
            meta: { title: '平台分类' },
        },
        {
            path: '/feature-id/:id',
            name: 'featureId',
            component: () => import('@/views/MainFeatureId.vue'),
            meta: { title: '功能 ID' },
        },
        {
            path: '/feature-id',
            redirect: '/feature-id/germanium-25h2',
        },

        // GROUP 2 ---- 数据页面
        {
            path: '/category/:platform',
            name: 'categoryList',
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

router.beforeEach(() => {
    clearTitle()
})

router.afterEach((to) => {
    applyRouteTitle(to.meta?.title)
})

export default router
