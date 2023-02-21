import {LOGIN,LOGOUT} from 'store/actionNames';
import axios , { HttpStatusCode } from 'axios';
import commonAxios from 'utils/commonAxios';

export const Login = async (data:any,dispatch:any, navigate:any)  => {
    try{
        await commonAxios.post('/login',data).then((response:any)=>{

            const { accessToken } = response.data;
            if(accessToken == null || accessToken == undefined){
                alert("로그인 실행 중 내부 오류가 발생했습니다.\n" + "TODO 오류 메시지");
                return false;
            }
            setToken(accessToken);
            dispatch( {
                type: LOGIN,
                payload: response.data
            });

            alert('로그인 성공');
            navigate("/");
            setTimeout(()=>console.log('it\'s refresh time'),2000);
            return true;
        })
        .catch(error =>{
            console.log(JSON.stringify(error.code));
            console.log(JSON.stringify(error));
            console.log(JSON.stringify(error.response));
            switch(error.response.status){
                case HttpStatusCode.Unauthorized:
                    alert("NonAuthorized");
                    break;
                case HttpStatusCode.InternalServerError:
                    alert("로그인 실행 중 내부 오류가 발생했습니다.");
                    break;
                case HttpStatusCode.BadRequest:
                    alert("로그인 실패 \n"+ error.response.data.error_message);
                    break;
                default:
                    alert("로그인 실패.");
                    return false;
            }
        });
    }
    catch(error){
        console.log('exception when tryig login');
        console.log(error);
        /*
        dispatch( {
            type: LOGOUT,
            payload: error,
        })
        */
    }

};

export const RefreshToken= async (data:any,dispatch:any, navigate:any)  => {
    try{
        commonAxios.get('/silent-refresh').then((response:any)=>{
            setToken(response.data)
        })
        .catch(error =>{
            Logout(dispatch,navigate);
            /*
            console.log(JSON.stringify(error.code));
            dispatch( {type: LOGOUT});
            delete commonAxios.defaults.headers.common["Authorization"];
            */
        });
    }
    catch(error){
        console.log('exception when tryig login');
    }
};

export const Logout = (dispatch:any, navigate:any) => {
    console.log('logout!');
    dispatch( {type: LOGOUT});
    delete commonAxios.defaults.headers.common["Authorization"];
    navigate("/");
};

const setToken = (accessToken:any) => {
    //console.log('access token = [',accessToken,']');
    commonAxios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    //console.log('after access token = [',axios.defaults.headers.common['Authorization'],']');
};

