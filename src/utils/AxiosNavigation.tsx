// AxiosNavigation.js
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export function useAxiosNavigation() {
    // Use useRef to prevent a re-render in the useEffect.
    // A ref, cannot be used as a useEffect dependency, hence,
    // your linters shouldn't complain about missing dependencies.
    const navRef = useRef(useNavigate());
    useEffect(() => {

    const intercetpor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
        console.log("axiosNavigation error" + JSON.stringify(error));
        switch (error?.response?.status) {
            case 500:
                alert("요청 처리중 오류")
            break;
            case 401:
                alert("인증 오류! 재 로그인 필요");
                navRef.current('/login');  
                break;
            case 404:
                alert("??");
                break;
            default:
        }
        return Promise.reject(error);
    });

    return () => {
      axios.interceptors.response.eject(intercetpor);
    };
  }, []);
}

export default function AxiosNavigation() {
  useAxiosNavigation();
  return <></>;
}