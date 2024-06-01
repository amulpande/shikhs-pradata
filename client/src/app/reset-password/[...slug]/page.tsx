'use client'
import { useState } from "react"
import { userPasswordResetApi } from "@lib/api/allApi"
import { PasswordReseType } from "@lib/types/types"
import { Container, Typography, TextField, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


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

  const handleChange = (e: any) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await userPasswordResetApi(uid, token, resetPassword)
      if (response) {
        Swal.fire({
          title: "Reset Password!",
          text: "Password has been reset!",
          icon: "success"
        });
      }

    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: "Token is either invalid or expired",
        icon: "error"
      });
    }
  }
  const isSubmitDisabled = !resetPassword.password || !resetPassword.password2;
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
          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '1rem' }} disabled={isSubmitDisabled}>
            Submit
          </Button>
        </form>
      </Container>
      <ToastContainer />
    </>

  )
}

export default ResetPasswordPage
