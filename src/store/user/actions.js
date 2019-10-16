import * as CONSTANTS from '../constants'
import * as api from '@/request/request'
import {message} from 'antd'
import store from 'store'

export const login = (params) => {
    return dispatch => {
        return api.login(params).then(res => {
            const {data, code} = res;
            if (code === 0) {
                data.setTime = new Date().getTime()
                store.set('userInfo', data)
                dispatch({
                    type: CONSTANTS.USER_LOGIN,
                    payload: data
                })
            } else {
                message.error(res.msg)
            }
            return res
        });
    }
};

export const logout = () => {
    return dispatch => {
        store.remove('userInfo');
        dispatch({type: CONSTANTS.USER_LOGOUT})
    }
};

export const register = (params) => {
    return dispatch => {
        return api.register(params).then(res => {
            const {code, msg} = res;
            if (code === 0){
                message.success(msg)
            } else message.error(msg)
            return res
        })
    }
};

export const getAuthorInfo = () =>{
    return dispatch => {
        return api.getAuthorInfo().then(res => {
            const {code, msg,data} = res;
            if (code === 0){
                store.set('authorInfo', data)
                dispatch({
                    type: CONSTANTS.USER_AUTHOR_INFO,
                    payload: data
                });
            } else message.error(msg)
            return res
        })
    }
}
