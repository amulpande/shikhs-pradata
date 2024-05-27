'use client'
import { useState } from "react"
import { userPasswordResetApi } from "@lib/api/allApi"
import { PasswordReseType } from "@lib/types/types"
import { Container, Typography, TextField, Button } from '@mui/material';
import { customErrorMessageErrorNotify, customSuccessMessageErrorNotify } from "@lib/notification-toastify/notification-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPasswordPage = ({ params }: {
  params: {
    slug: string[]
  }
}) => {
  // 
  const [resetPassword, setResetPassword] = useState<PasswordReseType>({
    password: '',
    password2: ''
  })
  const uid = params.slug[0]
  const token = params.slug[1]

  const handleChange = (e) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await userPasswordResetApi(uid, token, resetPassword)
      if (response) {
        customSuccessMessageErrorNotify('Password has been changed')
      }

    } catch (error) {
      customErrorMessageErrorNotify('Not able to change password Try again later')
      throw error
    }
  }
  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom align="center">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={resetPassword.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="password2"
            value={resetPassword.password2}
            onChange={handleChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '1rem' }}>
            Submit
          </Button>
        </form>
      </Container>
      <ToastContainer/>
    </>

  )
}

export default ResetPasswordPage
