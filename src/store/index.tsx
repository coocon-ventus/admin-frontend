import { legacy_createStore as createStore , applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import { persistStore } from "redux-persist";

// ==============================|| REDUX - MAIN STORE ||============================== //

export const store = createStore(reducer);
export const persistor = persistStore(store);
export default { store, persistor };
