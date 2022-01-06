import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import authReducer from './redux/reducers/authReducer'
import notifyReducer from './redux/reducers/notifyReducer'

const reducer = combineReducers({
    auth:authReducer,
    notify:notifyReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store