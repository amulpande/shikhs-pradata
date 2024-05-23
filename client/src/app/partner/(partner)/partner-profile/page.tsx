'use client'
import { tutorProfileApi, tutorUpdateProfile } from '@lib/api/allApi'
import { customErrorMessageErrorNotify, customSuccessMessageErrorNotify } from '@lib/notification-toastify/notification-toastify'
import { TutorProfile, TutorType } from '@lib/types/types'
import { CldImage } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PartnerProfilePage = () => {
    const [updateMode, setUpadateMode] = useState<boolean>(true)
    const [profileUpdated,setProfileUpdated] = useState<boolean>(false)
    const [tutorProfile, setTutorProfile] = useState<TutorProfile>({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        address: '',
        price: '',
        profile_image: ''
    })
    useEffect(() => {
        const fetchTutorProfile = async () => {
            try {
                const response = await tutorProfileApi()
                setTutorProfile(response.data.user)
            } catch (error) {

            }
        }
        fetchTutorProfile()
    }, [profileUpdated])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTutorProfile((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Page title */}
                        <div className="">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        {/* Form START */}
                        <form className="row g-3" onSubmit={async(e) => {
                            e.preventDefault()
                            setProfileUpdated(false)
                            const { first_name, last_name, contact, address, price } = tutorProfile
                            const data:any = { first_name, last_name, contact, address, price }
                            try {
                                const response = await tutorUpdateProfile(data)
                                if(response){
                                    customSuccessMessageErrorNotify('Profile Updated')
                                }
                                
                            } catch (error) {
                                console.error('Error updating profile ')
                                customErrorMessageErrorNotify('Something went wrong try again latter')
                            } finally{
                                setProfileUpdated(true)
                            }
                        }}>
                            {/* Contact detail */}
                            <div className="col-md-8">
                                <div className="bg-secondary-soft p-4 rounded">
                                    <div className="mb-3">
                                        <h4 className="mb-4">Contact detail</h4>
                                        <div className="row g-3">
                                            {/* First Name */}
                                            <div className="col-md-6">
                                                <label className="form-label">First Name *</label>
                                                <input
                                                    type="text"
                                                    name='first_name'
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-label="First name"
                                                    value={tutorProfile?.first_name}
                                                    disabled={updateMode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* Last name */}
                                            <div className="col-md-6">
                                                <label className="form-label">Last Name *</label>
                                                <input
                                                    name='last_name'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-label="Last name"
                                                    value={tutorProfile?.last_name}
                                                    disabled={updateMode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* Phone number */}
                                            <div className="col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmail4"
                                                    disabled={true}
                                                    value={tutorProfile?.email}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            {/* Mobile number */}
                                            <div className="col-md-6">
                                                <label className="form-label">Mobile number *</label>
                                                <input
                                                    name='contact'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-label="Phone number"
                                                    value={tutorProfile?.contact}
                                                    disabled={updateMode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* Email */}
                                            <div className="col-md-6">
                                                <label htmlFor="inputEmail4" className="form-label">
                                                    Address
                                                </label>
                                                <textarea
                                                    name='address'
                                                    className="form-control"
                                                    id="inputEmail4"
                                                    value={tutorProfile?.address}
                                                    onChange={handleChange}
                                                    disabled={updateMode}
                                                />
                                            </div>
                                            {/* Skype */}
                                            <div className="col-md-6">
                                                <label className="form-label">Price</label>
                                                <input
                                                    name='price'
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    aria-label="Phone number"
                                                    value={tutorProfile?.price}
                                                    disabled={updateMode}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="bg-secondary-soft p-4 rounded">
                                    <div className="mb-3">
                                        <div className="text-center">
                                            <div className="square position-relative display-2 mb-3">

                                                {tutorProfile?.profile_image ? <CldImage src={tutorProfile?.profile_image || '' } width={500} height={500} className='rounded-circle' alt='...' />
                                                    :
                                                    <i className="fas fa-fw fa-user position-absolute top-150 start-150 translate-middle text-secondary" />
                                                }
                                                <input type="file" id="customFile" name="file" className="form-control visually-hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end gap-3">
                                {!updateMode &&

                                    <button type="submit" className="btn btn-success btn-lg">
                                        Update
                                    </button>
                                }
                                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setUpadateMode(!updateMode)}>
                                    <i className='fa fa-edit'></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Form END */}
                </div>
            </div>
            <ToastContainer/>

        </>
    )
}

export default PartnerProfilePage
