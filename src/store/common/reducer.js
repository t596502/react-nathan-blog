import * as CONSTANTS from '../constants';
import { groupBy, random } from '@/lib'

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
        case CONSTANTS.COMMON_COLOR_MAP:
            const list = groupBy(payload, item => item.userId)
            const colorList = state.colorList
            let colorMap = {}
            list.forEach(item => {
                colorMap[item[0].userId] = colorList[random(colorList)]
                item[0]['replies'].forEach(d => {
                    if (!colorMap[d.userId]) colorMap[d.userId] = colorList[random(colorList)]
                })
            })
            return { ...state, colorMap }
        default:
            return state
    }
}
