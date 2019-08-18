import * as CONSTANTS from '../constants';

const defaultState ={
    colorList: ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple'], // 标签颜色
    colorMap: {},
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
