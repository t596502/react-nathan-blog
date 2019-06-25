import {combineReducers} from 'redux'
import * as userStore from './user'
import * as common from './common'

export default combineReducers ({
    user:userStore.reducer,
    common:common.reducer
})
