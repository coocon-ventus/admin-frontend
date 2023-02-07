
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LOGIN } from '../../../../store/actions'

// ================================|| AUTH - REDIRECT ||================================ //

const CooconAuthRedirect = () => {
    const authState = useSelector((state:any) => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const [accessToken, setAccessToken] = useState(authState.accessToken);

    useEffect(()=>{
        const redirectToken:string = window.location.search.substring(7);

        dispatch({type: LOGIN, accessToken: redirectToken});
        console.log(authState.accessToken);
        console.log(authState.authed);

        navigate('/');
    },[]);

    return (
        <>
        </>
    );
};

export default CooconAuthRedirect;
