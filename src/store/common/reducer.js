import * as CONSTANTS from '../constants';

const defaultState ={
    loginModalVisible: false,
    registerModalVisible: false,
};

export default (state=defaultState,action)=>{
    const { type, payload } = action
    switch (type) {
        case CONSTANTS.COM_OPEN_AUTHMODAL:
            return {...state,[`${payload}ModalVisible`]:true};
        case CONSTANTS.COM_CLOSE_AUTHMODAL:
            return {...state,[`${payload}ModalVisible`]:false};
        default:
            return state
    }
}
