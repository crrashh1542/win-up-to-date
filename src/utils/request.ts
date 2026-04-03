import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
})

const request = (config: AxiosRequestConfig = {}) => {
    return http(config)
}

export default request
