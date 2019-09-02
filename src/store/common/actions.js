import * as CONSTANTS from '../constants'

export const openAuthModal = type => {
    return { type: CONSTANTS.COM_OPEN_AUTHMODAL, payload: type }
}

export const closeAuthModal = type => {
    return { type: CONSTANTS.COM_CLOSE_AUTHMODAL, payload: type }
}

export const generateColorMap = commentList => ({
    type: CONSTANTS.COMMON_COLOR_MAP,
    payload: commentList // 生成头像的颜色匹配
})

export const setWindowWidth = (clientWidth) => {
    return { type: CONSTANTS.COM_SET_WINDOW_WIDTH, payload: clientWidth }
}
