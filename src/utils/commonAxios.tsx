import axios from 'axios';

const commonAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
    validateStatus: function (status) {
        return status < 300; // 상태 코드가 2XX인 경우에만 정상
    }
});

// TODO 개발 용도의 함수 추후 삭제 필요
commonAxios.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 수행할 일
      // ...
      //console.log('axios authorization = ' + commonAxios.defaults.headers.common['Authorization']);
      return config;
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error);
});
/*
commonAxios.interceptors.response.use(
    function (config) {
      // 요청을 보내기 전에 수행할 일
      // ...
      console.log("interceptor-정상응답");
      return config;
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      console.log("interceptor-오류응답");
      return Promise.reject(error);
});
*/
export default commonAxios;