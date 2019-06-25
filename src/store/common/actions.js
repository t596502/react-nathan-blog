import * as CONSTANTS from '../constants'

export const openAuthModal = type => {
    return { type: CONSTANTS.COM_OPEN_AUTHMODAL, payload: type }
}

export const closeAuthModal = type => {
    return { type: CONSTANTS.COM_CLOSE_AUTHMODAL, payload: type }
}
