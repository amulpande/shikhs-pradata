'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authLogin,isErrorUser,isLoginUser } from '@lib/slices/auth-slice/auth-slice';
import * as  api from '@lib/api/allApi';
import { errorNotify,successNotify } from '@lib/notification-toastify/notification-toastify';
import Link from 'next/link';
import { TextField, Button, Grid, Typography,CircularProgress } from '@mui/material'
import { UserLoginType } from '@lib/types/types';
import { useRouter } from 'next/navigation';

const LoginHomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const [userLogindata, setUserLoginData] = useState<UserLoginType>({
    email: '',
    password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLoginData({ ...userLogindata, [e.target.name]: e.target.value })
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);
      const response = await api.userLoginApi(userLogindata);
      if (response.data.statuCode === 200) {
        successNotify()
        dispatch(authLogin(response.data))
        router.push('/profile')
      }
    } catch (error) {
      errorNotify();
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div className="uni-banner">
        <div className="container">
          <div className="uni-banner-text">
            <h1>Login</h1>
            <ul>
              <li>
                <a href="/index">Home</a>
              </li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="account pt-70">
        <div className="container">
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <div className="form-area">
                <Typography variant="h3">Log In To Your Account</Typography>
                
                <form onSubmit={handleSubmit} style={{marginTop:20}}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={userLogindata.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={userLogindata.password}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="acc-login-footer">
                        <Link href="/register">Don't have account?</Link>
                        <Link href="forgot-password">Forgot password?</Link>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                      >
                        {loading ?  <CircularProgress size={24} /> : 'Login'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ToastContainer />

    </>

  )
}

export default LoginHomePage
