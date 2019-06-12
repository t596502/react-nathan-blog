import axios from 'axios'
import {message} from 'antd'
const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000
})

//拦截请求
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        message.error('bed request')
        Promise.reject(error)
    }
);
//拦截响应

instance.interceptors.response.use(
    response => {
        if (response.data.code === 401 && response.data.message) message.warning(response.data.message)
        return response.data
    },
    err => {


        return Promise.reject(err)
    }
)

export default instance
