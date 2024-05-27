'use client'
import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import * as api from '../../../lib/api/allApi';
import Swal from 'sweetalert2'


const PasswordResetForm = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.userResetEmailPasswordApi(email);
            if (response) {
                Swal.fire({
                    title: "Email sent!",
                    text: "Email has been sent to you!",
                    icon: "success"
                });
            }
        } catch (error:any) {
            console.error('Error sending email ',error)
            const response = error?.response?.data?.non_field_errors[0] || 'Something went wrong try again later'
            Swal.fire({
                title: "Something went wrong!",
                text: response,
                icon: "failed"
              });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Reset Password</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
};

export default PasswordResetForm;
