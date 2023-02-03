// action - state management
import * as authAction from './authActions';

export const authState = {
    accessToken :'',
    authed: false
};

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = authState, action:any) => {
    switch (action.type) {
        case authAction.LOGIN:
            return {
                ...state,
                accessToken: action.accessToken,
                authed: true
            };
        case authAction.LOGOUT:
            return {
                ...state,
                accessToken: '',
                authed: false
            };
        default:
            return state;
    }
};

export default authReducer;
