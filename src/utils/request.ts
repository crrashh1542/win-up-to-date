import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import router from '@/router'
import { useToastStore } from '@/stores/toast'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
})

http.interceptors.response.use(
    res => res,
    error => {
        const toast = useToastStore()
        const status = error.response?.status
        if (status === 404) {
            router.replace('/404')
            toast.show({ title: '请求失败', body: '参数对应的数据不存在', intent: 'error' })
        } else {
            toast.show({ title: '请求失败', body: error.response?.data?.message ?? '网络异常', intent: 'error' })
        }
        return Promise.reject(error)
    }
)

const request = (config: AxiosRequestConfig = {}) => {
    return http(config)
}

export default request
