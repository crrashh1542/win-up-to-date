import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'

export interface Release {
    channel: string
    style: string
    version: string
    branch: string
    codename: string
    semester: string
    category?: string
}

export interface Category {
    category: string
    id: string
    icon: string
    releases: Release[]
}

export const useBuildsStore = defineStore('builds', () => {
    const list = ref<Category[]>([])
    const isLoading = ref(true)

    async function fetchBuilds() {
        if (list.value.length > 0) {
            isLoading.value = false
            return
        }
        try {
            const response = await request({ url: '/latestBuilds', method: 'get' })
            list.value = response.data.content
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    return { list, isLoading, fetchBuilds }
})
