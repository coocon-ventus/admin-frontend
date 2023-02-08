import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import queryString from 'query-string';
import axios, { HttpStatusCode } from 'axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {LOGIN, LOGINTEST} from 'store/actions';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

import commonAxios from 'utils/commonAxios';
import axiosAgent from 'utils/axiosAgent';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../hooks/useScriptRef';
import AnimateButton from '../../../ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// ============================|| COOCON - LOGIN ||============================ //

const LoginForm = ({ ...others }) => {

    const theme:any = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state:any) => state.customization);
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const query = queryString.parse(window.location.search);


    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />


                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values: any, { setErrors, setStatus, setSubmitting }:any) => {
                    await commonAxios.post('/login',values)
                    .then(response => {
                        let accessToken = response.data;
                        console.log("정상처리 " + accessToken);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                        dispatch({type: LOGIN});
                        
                        alert("로그인 성공");
                        navigate("/");
                    })
                    .catch(error =>{
                        switch(error.response.data.status){
                            case HttpStatusCode.Unauthorized:
                                alert("NonAuthorized");
                                break;
                            case HttpStatusCode.InternalServerError:
                                alert("로그인 실행 중 내부 오류가 발생했습니다.\n"+ "TODO 오류 메시지");
                                break;
                            default:
                                return false;
                        }
                    });
                    
                    try {
                        /*
                        dispatch({type:LOGIN, payload: await axiosAgent.auth.login(values)});
                        navigate("/");
                        */
                        /*
                        const response = await axios({
                            url : 'http://localhost:8080/login',
                            method : 'post',
                            data : values
                        })
                        .then(function(response) {
                            console.log("응답결과"+response.data);
                        })
                        .catch(function(err){
                            alert('로그인 실패');
                        });
                        */
                        /*
                        console.log(JSON.stringify(scriptedRef));
                        if (scriptedRef.current) {
                            console.log('onSbumit');
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                        */
                    } catch (err:any) {
                        /*
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                        */
                    }
                }}
          
                Formik
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }:any) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="로그인 유지"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                비밀번호 찾기
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    로그인
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
