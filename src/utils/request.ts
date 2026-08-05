import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { useToastStore } from '@/stores/toast'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
})

http.interceptors.response.use(
    (res) => res,
    (error) => {
        const toast = useToastStore()
        toast.show({
            title: '请求失败',
            body: error.response?.data?.message ?? '网络异常',
            intent: 'error',
        })
        return Promise.reject(error)
    }
)

const request = (config: AxiosRequestConfig = {}) => {
    return http(config)
}

export default request
