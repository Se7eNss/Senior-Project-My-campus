import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import chatReducer from './slices/chat';
import eventReducer from "./slices/event"
import  userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  chat: chatReducer,
  event:eventReducer,
  profile :userReducer
  
});

export { rootPersistConfig, rootReducer };
