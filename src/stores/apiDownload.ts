import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import NProgress from '@/utils/progress'
import type { DownloadContent } from '@/types'

export const useDownloadStore = defineStore('download', () => {
    const download = ref<DownloadContent | null>(null)
    const isError = ref(false)

    async function fetchDownload() {
        if (download.value) return
        NProgress.start()
        try {
            const response = await request({ url: '/download', method: 'get' })
            download.value = response.data.content
        } catch {
            isError.value = true
        } finally {
            NProgress.done()
        }
    }

    return { download, isError, fetchDownload }
})
