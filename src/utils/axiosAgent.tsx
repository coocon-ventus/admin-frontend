import axios, { HttpStatusCode } from 'axios';

const commonAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
    validateStatus: function (status) {
        return status < 300; // 상태 코드가 500 미만인 경우에만 해결
    }
});

/* ##### AUTH AGENT ##### */
const auth  = {
    login: (data:any) =>{
        commonAxios.post('/login',data).then(onLoginSuccess).catch(onLoginFail);
        //commonAxios.post('/login',data).then(response => response.data).catch();
    },
    logout: (dispatch:any) => {
    },
    refreshToken: () => {
        console.log('refresh');
        commonAxios.get('/silent-refresh').then(onRefreshSuccess).catch()
    }
}


const onLoginSuccess= (response:any) =>{
    console.log('succuess login');
    const { accessToken } = response.data;
    console.log('access token = [',accessToken,']');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    //setTimeout(auth.refreshToken, TOKEN_EXPIRE_TIME - 60000);
    alert('로그인 성공');
    return true;
}

const onLoginFail= (error:any) =>{
    switch(error.response.data.status){
        case HttpStatusCode.Unauthorized as number:
            alert("NonAuthorized");
            break;
        case HttpStatusCode.InternalServerError:
            alert("로그인 실행 중 내부 오류가 발생했습니다.\n" + "TODO 오류 메시지");
            break;
        default:
            return false;
    }
    return false;
}

const onRefreshSuccess = (response:any) => {
    console.log(response.data);
    alert('로그인 연장 성공!!');
}


/* ##### MEMBER AGENT ##### */
const member = {
    info: () => commonAxios.get('/member/me').then().catch()
}

export default {
    auth,
    member
};