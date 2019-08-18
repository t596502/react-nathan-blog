import * as CONSTANTS from '../constants'
import * as api from '@/request/request'
import axios from '@/request/axios'
import { message } from 'antd'
import store from 'store'

export const login = (params)=>{
    return dispatch =>
        api.login(params).then(res=>{
            const {data,code} = res;
            if(code === 0){
                store.set('userInfo', data)
                console.log(data);
                dispatch({
                    type:CONSTANTS.USER_LOGIN,
                    payload:data
                })
            }else {
                message.error(res.msg)
            }
            // console.log(res);
            return res
        });

};

export const logout = ()=>{
    return dispatch =>{
        store.remove('userInfo');
        dispatch({type:CONSTANTS.USER_LOGOUT})
    }
};

export const register =(params) =>{
    return dispatch =>{
        api.register(params).then(res =>{
            const {code,msg } = res;
            if(code === 0)message.success(msg)
            else message.error(msg)
            return res
        })
    }
};
