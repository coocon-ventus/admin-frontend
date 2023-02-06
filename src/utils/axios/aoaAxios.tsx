import axios from 'axios'

const aoaAxios = (params:any, headers:any) => axios.create({
    baseURL: `${process.env.REACT_APP_SERVER}`,
    timeout : (`${process.env.REACT_APP_API_TIMEOUT}` as unknown as number),
    headers : {

    },
    params : {

    },
    
})

export default aoaAxios;