import * as CONSTANTS from '../constants'
import store from 'store'

const defaultState ={
    auth:0,
    username:'',
    setTime:0,
    authorInfo:{}
};

const userInfo = store.get('userInfo');
const authorInfo = store.get('authorInfo');
if(!!userInfo && userInfo !=='undefind'){
  if(userInfo.setTime && (new Date().getTime() -userInfo.setTime  > (2*60 * 60*1000))){
        store.remove('userInfo');        
      }else{
        Object.assign(defaultState,{...userInfo})
      }
}
if(!!authorInfo && authorInfo !=='undefind'){
    Object.assign(defaultState,{authorInfo})
}

export default (state = defaultState,action)=>{
    switch (action.type) {
        case CONSTANTS.USER_LOGIN:
            const {username,auth,setTime} = action.payload;
            return {...state,username,auth,setTime};
        case CONSTANTS.USER_LOGOUT:

            return {...state,auth:0,username:'',token:'',setTime:0};
        case CONSTANTS.USER_AUTHOR_INFO:
            const authorInfo = action.payload
            return {...state,authorInfo};
        default:
            return state
    }

};
