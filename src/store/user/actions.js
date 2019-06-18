import * as CONSTANTS from '../constants'
import * as api from '@/request/request'
import axios from '@/request/axios'
import { message } from 'antd'
import store from 'store'

export const login = (params)=>{
    return dispatch =>{
        // api.login(params).then(res=>{
        //     const {data,code} = res;
        //     if(code === 0){
        //         store.set('userInfo', data)
        //         console.log(data);
        //         dispatch({
        //             type:CONSTANTS.USER_LOGIN,
        //             payload:data
        //         })
        //     }else {
        //         message.error(res.msg)
        //     }
        //     // console.log(res);
        //     return res
        // })
        axios.post('/user/login', params).then(res => {
            const {data,code} = res;
            if (code === 0) {
                localStorage.setItem('token', res.token)
                dispatch({type:CONSTANTS.USER_LOGIN,payload:data})
            } else {
                message.error(res.msg)
            }
            // return res
        })
    }
}
