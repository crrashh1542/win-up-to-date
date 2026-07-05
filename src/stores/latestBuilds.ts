import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import type { Category, DataVersion } from '@/types'

export const useBuildsStore = defineStore('builds', () => {
    const list = ref<Category[]>([])
    const isLoading = ref(true)
    const dataVersion = ref<DataVersion | null>(null)

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

    async function fetchDataVersion() {
        if (dataVersion.value) return
        try {
            const response = await request({ url: '/version', method: 'get' })
            dataVersion.value = response.data.content
        } catch (error) {
            console.error(error)
        }
    }

    return { list, isLoading, dataVersion, fetchBuilds, fetchDataVersion }
})
