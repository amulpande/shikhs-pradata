'use client'

import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { styled } from '@mui/system';
import * as api from '../../../../lib/api/allApi';
import { useDispatch } from 'react-redux';
import { errorNotify, successNotify } from '../../../../lib/notification-toastify/notification-toastify';
import { authLogin } from '../../../../lib/slices/auth-slice/auth-slice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { UserLoginType } from '../../../../lib/types/types';
import { setCookies } from '@lib/utils/cookieStore';

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
  backgroundImage: `url('https://source.unsplash.com/random')`, // Background image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1, // Ensure the background is behind other content
});

const AdminLoginPage = () => {
  const [adminLogin, setAdminLogin] = useState<UserLoginType>({
    'email': '',
    'password': ''
  })
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value })
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    // Add your login logic here
    try {
      setLoading(true)
      const response = await api.adminLoginApi(adminLogin)
      if (response.data.statusCode === 200) {
        dispatch(authLogin(response.data))

        setTimeout(() => {
          successNotify()
          router.push('/admin/index')
        }, 300)
      }
    } catch (error) {
      errorNotify()
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Background />
      <AnimatedContainer maxWidth="xs">
        <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '200px' }}>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            name='email'
            variant="outlined"
            fullWidth
            margin="normal"
            value={adminLogin.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name='password'
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={adminLogin.password}
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
          <Grid item xs={12}>
            <div className="acc-login-footer">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </Grid>
        </form>
      </AnimatedContainer>
      <ToastContainer />
    </>
  );
};

export default AdminLoginPage;
