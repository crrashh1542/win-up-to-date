import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { FeatureIdCategory, FeatureIdContent } from '@/types'

export const useFeatureIdStore = defineStore('featureId', () => {
    // 菜单（分类列表）
    const menu = ref<FeatureIdCategory[]>([])
    const isMenuLoading = ref(true)
    const selectedCategory = ref<string>()

    // 各分类的页面数据缓存
    const pages = ref<Record<string, FeatureIdContent>>({})
    const isPageLoading = ref(false)

    async function fetchMenu(routeId?: string) {
        if (menu.value.length > 0) {
            isMenuLoading.value = false
            return
        }
        NProgress.start()
        try {
            const response = await request({ url: '/id', method: 'get' })
            menu.value = response.data.content
            // 优先选中路由对应的分类，否则默认第一个
            if (routeId && menu.value.some((cat) => cat.id === routeId)) {
                selectedCategory.value = routeId
            } else if (menu.value.length > 0) {
                selectedCategory.value = menu.value[0].id
            }
        } catch (error) {
            console.error(error)
        } finally {
            isMenuLoading.value = false
            NProgress.done()
        }
    }

    async function fetchData(category: string) {
        if (pages.value[category]) return
        isPageLoading.value = true
        NProgress.start()
        try {
            const response = await request({
                url: `/id/${category}`,
                method: 'get',
            })
            pages.value[category] = response.data.content
        } catch (error) {
            console.error(error)
        } finally {
            isPageLoading.value = false
            NProgress.done()
        }
    }

    return {
        menu,
        isMenuLoading,
        selectedCategory,
        pages,
        isPageLoading,
        fetchMenu,
        fetchData,
    }
})
