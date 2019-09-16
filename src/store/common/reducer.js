import * as CONSTANTS from '../constants';
import { groupBy, random } from '@/lib'

const defaultState ={
    colorList: ['magenta', 'blue', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue', 'purple'], // 标签颜色
    colorMap: {},
    loginModalVisible: false,
    registerModalVisible: false,
    windowWidth:0
};

export default (state=defaultState,action)=>{
    const { type, payload } = action
    switch (type) {
        case CONSTANTS.COM_OPEN_AUTHMODAL:
            return {...state,[`${payload}ModalVisible`]:true};
        case CONSTANTS.COM_CLOSE_AUTHMODAL:
            return {...state,[`${payload}ModalVisible`]:false};
        case CONSTANTS.COM_SET_WINDOW_WIDTH:
            return { ...state, windowWidth: payload }
        case CONSTANTS.COMMON_COLOR_MAP:
            console.log(payload);
            const list = groupBy(payload, item => item.author)
            console.log(list);
            const colorList = state.colorList
            let colorMap = {};
            list.forEach(item => {
                colorMap[item[0].author] = colorList[random(colorList)]
                item[0]['replyList'].forEach(d => {
                    if (!colorMap[d.author]) colorMap[d.author] = colorList[random(colorList)]
                })
            })
            return { ...state, colorMap }
        default:
            return state
    }
}
