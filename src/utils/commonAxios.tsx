import axios from 'axios';

const commonAxios = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
});
