import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));
const CooconAuthRegister = Loadable(lazy(() => import('../views/pages/authentication/authentication3/CooconRegister')));
const CooconAuthLogin = Loadable(lazy(() => import('../views/pages/authentication/authentication3/CooconLogin')));
const CooconAuthRedirect = Loadable(lazy(() => import('../views/pages/authentication/authentication3/CooconAuthRedirect')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/pages/login/coocon',
            element: <CooconAuthLogin />
        },
        {
            path: '/pages/register/coocon',
            element: <CooconAuthRegister />
        },
        {
            path: '/auth/redirect',
            element: <CooconAuthRedirect />
        }
    ]
};

export default AuthenticationRoutes;
