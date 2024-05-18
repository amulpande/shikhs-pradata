'use client'
import React, { useState } from 'react'
import { Container, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer } from 'react-toastify';
import { successNotify, errorNotify, customErrorMessageErrorNotify } from '@lib/notification-toastify/notification-toastify';
import { authLogin } from '@lib/slices/auth-slice/auth-slice';
import { UserLoginType } from '@lib/types/types';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as api from '@lib/api/allApi';
import 'react-toastify/dist/ReactToastify.css';

// Define a styled container with animations and background
const AnimatedContainer = styled(Container)({
    marginTop: '64px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: '12px',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});

const Background = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(https://www.pexels.com/photo/sunray-through-trees-1420440/)`, // Background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1, // Ensure the background is behind other content
});

const PartnerLoginPage = () => {
    const [tutorLogin, setTutorLogin] = useState<UserLoginType>({
        'email': '',
        'password': ''
    })
    // const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const dispatch = useDispatch()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTutorLogin({ ...tutorLogin, [e.target.name]: e.target.value })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        // Add your login logic here
        try {
            setLoading(true)
            const response = await api.tutorLoginApi(tutorLogin)
            console.log('tutor login response',response)
            if (response.status==200) {
                successNotify()
                dispatch(authLogin(response.data))
                router.push('/partner/partner-profile')
            }
        } catch (error:any) {
            console.error('Error login partner ',error.response)
            if(error.response.status===400){
                errorNotify()
            }else if(error.response.status===401){
                customErrorMessageErrorNotify(error.response.data.Message)
            }else if(error.response.status===403){
                customErrorMessageErrorNotify(error.response.data.Message)
            }
            // errorNotify()
        } finally {
            setLoading(false)
        }
        // console.log('Logging in with:', adminLogin);
    };
    return (
        <>
            <>
                <Background />
                <AnimatedContainer maxWidth="xs">
                    <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '200px' }}>
                        TUTOR LOGIN
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            name='email'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={tutorLogin.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            name='password'
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={tutorLogin.password}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            style={{ marginBottom: '16px' }}
                        >
                            Login
                        </Button>
                    </form>
                </AnimatedContainer>
                <ToastContainer />
            </>
        </>
    )
}

export default PartnerLoginPage
