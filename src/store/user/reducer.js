import * as CONSTANTS from '../constants'


const defaultState ={
    auth:0,
    username:'',
};


export default (state = defaultState,action)=>{
    console.log(action);
    switch (action.type) {
        case CONSTANTS.USER_LOGIN:
            const {username,auth} = action.payload;
            return {...state,username,auth}
        default:
            return state
    }

};
