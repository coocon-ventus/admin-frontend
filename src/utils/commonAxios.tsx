import axios from 'axios';

const commonAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
    validateStatus: function (status) {
        return status < 300; // 상태 코드가 500 미만인 경우에만 해결
    }
});


export default commonAxios;