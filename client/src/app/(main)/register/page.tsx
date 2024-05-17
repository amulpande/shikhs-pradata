'use client'
import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { userRegistrationValuesValidationSchema } from './registerSchema';
import { userRegisterationPostApi } from '@lib/store/thunk-api/user-api';
import { userRegisterApi } from '@lib/api/allApi';
import { registeredSuccessfullyNotify, userEmailAlreadyExistNotify } from '@lib/notification-toastify/notification-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Input, Button, Grid, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { UserRegisterType } from '@lib/types/types';
import { useRouter } from 'next/navigation';

// interface InitialValuesDataType {
//     email: string;
//     firstName: string;
//     lastName: string;
//     contact: string;
//     gender: string;
//     address: string;
//     password: string;
//     confirmPassword: string;
//     profileImage: File | null;
// }

const initialValues: UserRegisterType = {
    email: '',
    firstName: '',
    lastName: '',
    contact: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
    profileImage: null
}
const RegisterHomePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    // useDispatch()

    const formik = useFormik({
        // console.log('aa')
        initialValues,
        validationSchema: userRegistrationValuesValidationSchema,
        onSubmit: async (values) => {
            const formData = new FormData()
            // console.log('register data ',values)
            // alert(JSON.stringify(values, null, 2));
            formData.append('email', values.email)
            formData.append('first_name', values.firstName)
            formData.append('last_name', values.lastName)
            formData.append('contact', values.contact)
            formData.append('gender', values.gender)
            formData.append('address', values.address)
            formData.append('password', values.password)
            formData.append('password2', values.confirmPassword)
            formData.append('profile_image', values.profileImage as File)
            console.log('formdata coming ')
            console.log([...formData.entries()])

            // sending user data  
            try {
                const response = await userRegisterApi(formData)
                registeredSuccessfullyNotify()
                router.push('/login')
                // console.log('register data => ', response.data)
            } catch (error: any) {
                console.log('register error => ', error.response.data.email[0])
                if (error.response.data.email[0] == 'user with this email already exists.') {
                    userEmailAlreadyExistNotify()
                }
            }

        }
    })

    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>REGISTER</h1>
                        <ul>
                            <li>
                                <a href="index">HOME</a>
                            </li>
                            <li>REGISTER</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="account pt-70">
                <div className="container">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={8} md={6}>
                            <div className="form-area reg-area">
                                <Typography variant="h3">Create An Account</Typography>
                                <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="firstName"
                                                name="firstName"
                                                label="First Name"
                                                variant='outlined'
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="lastName"
                                                name="lastName"
                                                label="Last Name"
                                                variant='outlined'
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="address"
                                                name="address"
                                                label="Address"
                                                variant="outlined"
                                                multiline
                                                rows={4} // Adjust the number of rows as needed
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                helperText={formik.touched.address && formik.errors.address}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="contact"
                                                name="contact"
                                                label="Contact"
                                                variant="outlined"
                                                value={formik.values.contact}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                                helperText={formik.touched.contact && formik.errors.contact}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="password"
                                                name="password"
                                                label="Password"
                                                variant="outlined"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                variant="outlined"
                                                value={formik.values.confirmPassword}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            />
                                        </Grid>
                                        {/* Other form fields */}
                                        {/* Radio Buttons for Gender */}
                                        <Grid item xs={12}>
                                            <RadioGroup
                                                row
                                                aria-label="gender"
                                                name="gender"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            </RadioGroup>
                                        </Grid>
                                        <Grid item xs={12}>

                                            <label>Profile Picture</label>
                                            <input
                                                type="file"
                                                name="profileImage"
                                                onChange={(event) => {
                                                    const files = event.currentTarget.files;
                                                    if (files && files.length > 0) {
                                                        formik.setFieldValue('profileImage', event.currentTarget.files?.[0]);
                                                    }
                                                }}
                                            />
                                        </Grid>

                                        {/* Submit Button */}
                                        {/* <Grid container spacing={2} justifyContent="center"> */}
                                        <Grid container item xs={12} justifyContent="center">
                                            <Button type="submit" variant="contained" color="primary">
                                                Register Now
                                            </Button>
                                        </Grid>
                                        {/* </Grid> */}
                                    </Grid>
                                </form>
                                <Typography variant="body1" style={{ marginTop: '16px', textAlign: 'center' }}>
                                    Already Have An Account? <Link href="/login">Login</Link>
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default RegisterHomePage
