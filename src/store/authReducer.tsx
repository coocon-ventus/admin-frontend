// action - state management
import * as authAction from './authActions';
import axios from 'axios'

export const authState = {
    //accessToken :'',
    authed: false
};

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = authState, action:any) => {
    switch (action.type) {
        case authAction.LOGIN:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.accessToken;
            console.log('123');
            setTimeout(()=>{console.log('timeout')},2000);
            return {
                ...state,
                //accessToken: action.accessToken,
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
