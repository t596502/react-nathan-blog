import * as CONSTANTS from '../constants'
import store from 'store'

const defaultState ={
    auth:0,
    username:'',
    authorInfo:{}
};

const userInfo = store.get('userInfo');
const authorInfo = store.get('authorInfo');
if(!!userInfo && userInfo !=='undefind'){
    Object.assign(defaultState,{...userInfo})
}
if(!!authorInfo && authorInfo !=='undefind'){
    Object.assign(defaultState,{authorInfo})
}

export default (state = defaultState,action)=>{
    switch (action.type) {
        case CONSTANTS.USER_LOGIN:
            const {username,auth} = action.payload;
            return {...state,username,auth};
        case CONSTANTS.USER_LOGOUT:

            return {...state,auth:0,username:'',token:''};
        case CONSTANTS.USER_AUTHOR_INFO:
            const authorInfo = action.payload
            return {...state,authorInfo};
        default:
            return state
    }

};
