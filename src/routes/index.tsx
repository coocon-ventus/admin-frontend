import { useRoutes } from 'react-router-dom';
// routes
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const authState = useSelector((state:any) => state.authState);    
    const authed:boolean = authState.authed;

    const testState = useSelector((state)=>state);

    console.log(testState);

    useEffect(()=>{
        console.log("authed = ["+authed +"]");
    },[]);

    return useRoutes([MainRoutes(authed), AuthenticationRoutes]);
}
