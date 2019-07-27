import * as CONSTANTS from '../constants'
import store from 'store'

const defaultState ={
    auth:0,
    username:'',
};

const userInfo = store.get('userInfo');
if(!!userInfo && userInfo !=='undefind'){
    Object.assign(defaultState,{...userInfo})
}

export default (state = defaultState,action)=>{
    switch (action.type) {
        case CONSTANTS.USER_LOGIN:
            const {username,auth} = action.payload;
            return {...state,username,auth};
        case CONSTANTS.USER_LOGOUT:

            return {auth:0,username:'',token:''};
        default:
            return state
    }

};
