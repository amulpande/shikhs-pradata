'use client'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Link from 'next/link';
import { tutorRegisterApi, userRegisterApi } from '../../../../lib/api/allApi';
import { tutorRegistrationValidationSchema } from './tutorRegistrationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityDataApi } from '../../../../lib/slices/city-slice/city-slice';
import { fetchSubjectApi } from '../../../../lib/slices/subject-slice/subject-slice';
import { customErrorMessageErrorNotify, registeredSuccessfullyNotify, successNotify } from '@lib/notification-toastify/notification-toastify';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { AppDispatch, RooState } from '@lib/store/store';
import { CircularProgress } from '@mui/material';
import { TutorRegisterDataType } from '@lib/types/types';


const TutorRegisterPage = () => {

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const cityHai = useSelector((state:RooState )=> state.cityData.cityData)
  const subjectData = useSelector((state:RooState) => state.subjectData.subjects)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchCityDataApi())
    dispatch(fetchSubjectApi())
  }, [dispatch]);

  const initialValues: TutorRegisterDataType = {
    email: '',
    firstName: '',
    lastName: '',
    contact: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    short_bio: '',
    city: '',
    subjects: '',
    experience: '',
    dob: '',
    price: '',
  }
  const formik = useFormik({
    initialValues,
    validationSchema: tutorRegistrationValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true) 
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('first_name', values.firstName)
      formData.append('last_name', values.lastName)
      formData.append('contact', values.contact)
      formData.append('gender', values.gender)
      formData.append('address', values.address)
      formData.append('password', values.password)
      formData.append('password2', values.confirmPassword)
      formData.append('profile_image', values.profileImage as File)
      formData.append('short_bio', values.short_bio)
      formData.append('city', values.city)
      formData.append('subjects', values.subjects)
      formData.append('experience', values.experience)
      formData.append('dob', values.dob)
      formData.append('price', values.price)

      try {
        
        const response = await tutorRegisterApi(formData)
        if (response.status==200){
          registeredSuccessfullyNotify()
          router.push('/login')
          
        }
      } catch (error:any) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.email[0];
          customErrorMessageErrorNotify(errorMessage) 
        }
        console.error('Error registering tutor',error)
      } finally{
        setIsLoading(false)
      }
    }
  })

  const calculateMaxDate = () => {
    const today = new Date();
    const past18Years = new Date(today.setFullYear(today.getFullYear() - 18));
    return past18Years.toISOString().split('T')[0];
  };
  const mmaxDate = calculateMaxDate()
  return (

    <>
      <div className="uni-banner">
        <div className="container">
          <div className="uni-banner-text">
            <h1>REGISTER</h1>
            <ul>
              <li>
                <Link href="/index">HOME</Link>
              </li>
              <li>REGISTER</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="account pt-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10 col-sm-12 col-12">
              <div className="form-area reg-area">
                <h3>Create An Account</h3>
                <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.email}</div>
                    ) : null}
                  </div>{" "}


                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.firstName}</div>
                    ) : null}
                  </div>{" "}


                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.lastName}</div>
                    ) : null}
                  </div>{" "}
                  <br />

                  <div className="form-group ">
                    <textarea
                      placeholder="Enter Your Address"
                      name="address"
                      className="form-control"
                      id="result"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // defaultValue={""}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.address}</div>
                    ) : null}
                  </div>
                  <br />

                  <div className="form-group">
                    <label>Gender</label>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '10px' }}>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={formik.values.gender === "male"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div style={{ marginRight: '10px' }}>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          checked={formik.values.gender === "female"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label htmlFor="female">Female</label>
                      </div>

                    </div>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.gender}</div>
                    ) : null}
                  </div>
                  <br></br>

                  <div className="form-group">
                    <input
                      type="text"
                      name="contact"
                      className="form-control"
                      placeholder="Mobile"
                      value={formik.values.contact}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.touched.contact && formik.errors.contact ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.contact}</div>
                    ) : null}
                  </div>

                  {/* <div className="form-group"></div> */}

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      // maxLength={}
                      minLength={8}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  {/* <br /> */}


                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      maxLength={12}
                      minLength={5}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                  <br />

                  <div className="form-group">
                    <input
                      type="text"
                      name="experience"
                      className="form-control"
                      placeholder="Experience"
                      value={formik.values.experience}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.experience && formik.errors.experience ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.experience}</div>
                    ) : null}
                  </div>{" "}


                  <div className="form-group">
                    <input
                      type="text"
                      name="short_bio"
                      className="form-control"
                      placeholder="About your self"
                      value={formik.values.short_bio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.short_bio && formik.errors.short_bio ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.short_bio}</div>
                    ) : null}
                  </div>{" "}



                  <div className="form-group">
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      placeholder="Your charges"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.price}</div>
                    ) : null}
                  </div>{" "}
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      name="city"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                      className="form-control"
                    >
                      <option value="">Select a city</option>
                      {cityHai && cityHai?.map((city:any) => (
                        <option key={city.id} value={city.id}>{city.city_name}</option>
                      ))}
                    </select>
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-danger">{formik.errors.city}</div>
                    ) : null}
                  </div>
                  <br />
                  {/* Subject Data */}
                  <div className="form-group">
                    <label htmlFor="Subject">Subject</label>
                    <select
                      id="subjects"
                      name="subjects"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subjects}
                      className="form-control"
                    >
                      <option value="">Select a Subject</option>
                      {subjectData && subjectData?.map((subject:any) => (
                        <option key={subject.id} value={subject.id}>{subject.subject_name}</option>
                      ))}
                    </select>
                    {formik.touched.subjects && formik.errors.subjects ? (
                      <div className="text-danger">{formik.errors.subjects}</div>
                    ) : null}
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                      type="file"
                      name="profileImage"
                      className="form-control"
                      placeholder="Select Profile pic"
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        if (files && files.length > 0) {
                          // const fileName = files?.[0]
                          formik.setFieldValue('profileImage', event.currentTarget.files?.[0])
                        } else {

                        }
                      }}
                      onBlur={formik.handleBlur}

                    />
                    {formik.touched.profileImage && formik.errors.profileImage ? (
                      <div className="error-message" style={{ color: 'red' }}>{formik.errors.profileImage}</div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthdate">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.dob && formik.errors.dob ? 'is-invalid' : ''}`}
                      max={mmaxDate} // Set maximum date to today

                    />
                    {formik.touched.dob && formik.errors.dob && (
                      <div className="invalid-feedback">{formik.errors.dob}</div>
                    )}
                  </div>

                  <button type='submit' name="registerbtn" className="submit-btn"
                  disabled={!formik.isValid || !formik.dirty}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Register Now'}
                  </button>
                  <p>
                    Already Have An Account? <Link href="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>


  )
}

export default TutorRegisterPage
