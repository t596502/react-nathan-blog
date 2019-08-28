import {applyMiddleware,createStore,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'



// let composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

export default store
