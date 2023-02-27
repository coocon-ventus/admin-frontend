// action - state management
import {LOGIN, LOGOUT, LOGIN_COUNT_INCREASE, LOGIN_EXTEND}  from './actionNames';
import axios from 'axios'

export const authState = {
    accessToken :'',
    authed: false,
    loginCount : 0
};

//todo
const getExpireFromToken = (token:string) => {

};

const silentRefresh = () => {
    console.log('silent refresh');
};

const tokenExpireTime:number = (`${process.env.REACT_APP_TOKEN_TIMEOUT}` as unknown as number);

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = authState, action:any) => {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN dispatch!!");
            return {
                ...state,
                accessToken : action.accessToken,
                refreshToken : '',
                authed:true
            };
        case LOGOUT:
            axios.defaults.headers.common['Authorization'] = '';
            return {
                ...state,
                authed: false
            };
        case LOGIN_COUNT_INCREASE:
            return {
                ...state,
                loginCount: state.loginCount +1
            };
        case LOGIN_EXTEND:
            return{
                ...state,
                accessToken : action.accessToken
            };
        default:
            return state;
    }
};

export default authReducer;
