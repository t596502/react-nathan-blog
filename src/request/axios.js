import axios from 'axios'
import {message,Spin} from 'antd'
import store from 'store'
import { Base64 } from 'js-base64';
import {logout} from '@/store/user/actions'
import {openAuthModal} from '@/store/common/actions'
import reduxAction from '@/store'
const instance = axios.create({
    // baseURL:'http://api.nathan-tai.top',
    baseURL:'http://localhost:3000',
    timeout:10000
});
let timer;
//拦截请求
instance.interceptors.request.use(
    config => {
        const userInfo = store.get('userInfo');
        if (userInfo) {
            config.headers['Authorization'] = _cecode(userInfo.token)
        }
        Spin.setDefaultIndicator()
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
        const {code} = response.data
        if (code === 202 && response.data.msg){
            reduxAction.dispatch(logout())
            // reduxAction.dispatch(openAuthModal('login'))
        }
        return response.data
    },
    err => {

        clearTimeout(timer)
        timer = setTimeout(() => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        console.log(err.response);
                        message.error('错误请求')
                        break
                    case 401:
                        localStorage.clear()
                        message.error('登录信息过期或未授权，请重新登录！')
                        break
                    case 403:
                        message.error('拒绝访问！')
                        break
                    case 404:
                        message.error('请求错误,未找到该资源！')
                        break
                    case 500:
                        message.error('服务器出问题了，请稍后再试！')
                        break;
                    default:
                        message.error(`连接错误 ${err.response.status}！`)
                        break
                }
            } else {
                message.error('服务器出了点小问题，请稍后再试！')
            }
        }, 200) // 200 毫秒内重复报错则只提示一次！
        return Promise.reject(err)
    }
)

const _cecode = (token)=>{
    const encode = Base64.toBase64(token +':')
    return `Basic ${encode}`
};
export default instance
