import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { MainCategory } from '@/types'

export const useCategoryStore = defineStore('category', () => {
    const list = ref<MainCategory[]>([])
    const isLoading = ref(true)
    const selectedCategory = ref<string>()

    async function fetchCategories() {
        if (list.value.length > 0) {
            isLoading.value = false
            return
        }
        NProgress.start()
        try {
            const response = await request({ url: '/category', method: 'get' })
            list.value = response.data.content
            // 默认选中第一个分类
            if (list.value.length > 0 && !selectedCategory.value) {
                selectedCategory.value = list.value[0].id
            }
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
            NProgress.done()
        }
    }

    return { list, isLoading, selectedCategory, fetchCategories }
})
