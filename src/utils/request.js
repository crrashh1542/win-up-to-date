import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
})

const request = ({
    url,
    method = 'get',
    headers,
    data,
    params,
    ...config
} = {}) => {
    return http({
        url,
        method,
        headers,
        data,
        params,
        ...config,
    })
}

export default request
