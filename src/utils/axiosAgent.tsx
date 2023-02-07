import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { LOGIN, LOGOUT } from '../store/actions';
import { useNavigate } from 'react-router-dom'

const TOKEN_EXPIRE_TIME:number = (`${process.env.REACT_APP_TOKEN_TIMEOUT}` as unknown as number);
const dispatch = useDispatch();
const navigate = useNavigate();

const commonAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
});

/* ##### AUTH AGENT ##### */
const auth = {
    login: (email:string, password:string) =>{
        const data = {
            email,
            password
        };
        commonAxios.post('/login',data).then(onLoginSuccess).catch()
    },
    logout: () => {

        dispatch({type: LOGOUT});
        navigate("/");
    },
    refreshToken: () => commonAxios.get('/silent-refresh').then(onRefreshSuccess).catch()
}


const onLoginSuccess= (response:any) =>{
    console.log('succuess login');
    const { accessToken } = response.data;
    console.log('access token = [',accessToken,']');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

    dispatch({type:LOGIN});
    setTimeout(auth.refreshToken, TOKEN_EXPIRE_TIME - 60000);
}

const onLoginFail= (error:any) =>{
    console.log('fail to login');
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
    auth
};