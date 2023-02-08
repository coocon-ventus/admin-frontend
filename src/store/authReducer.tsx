// action - state management
import {LOGIN, LOGOUT, LOGINTEST}  from './actions';
import axios from 'axios'

export const authState = {
    //accessToken :'',
    authed: false
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
            /*
            if(action.payload){
                console.log("payload true");
                state.authed= true;
            }
            else {
                console.log("payload false");
            }
            */
            return {
                ...state,
                authed:true
            };
        case LOGOUT:
            axios.defaults.headers.common['Authorization'] = '';
            return {
                ...state,
                authed: false
            };
        case LOGINTEST:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;
