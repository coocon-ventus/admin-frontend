import { combineReducers } from 'redux';
// reducer import
import customizationReducer from './customizationReducer';
import authReducer from './authReducer';

import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage'

// ==============================|| COMBINE REDUCER ||============================== //
const persistConfig = {
    key : "root",
    storage:storageSession,
    whitelist :["authReducer","authState"]
};
const reducer = combineReducers({
    customization: customizationReducer,
    authState: authReducer
});

export default persistReducer(persistConfig,reducer);
 