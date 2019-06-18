import {combineReducers} from 'redux'
import * as userStore from './user'

export default combineReducers ({
    user:userStore.reducer
})
