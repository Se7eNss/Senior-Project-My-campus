import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
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
  event:eventReducer,
  profile :userReducer
  
});

export { rootPersistConfig, rootReducer };
