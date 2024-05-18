'use client'
import React, { useEffect, useState } from 'react';
import { userProfileApi, userProfileUpdateApi } from '@lib/api/allApi';
import { CldImage } from 'next-cloudinary';
import { UserProfileTypes } from '@lib/types/types';


const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileTypes>({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    address: '',
    profile_image: ''
  })
  const [updateMode, setUpadateMode] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    userProfileApi()
      .then((response) => {
        const userDataFromApi = response.data.user;
        setUserProfile(userDataFromApi);
        setLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setLoading(false); // Set loading state to false if there's an error
      });
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserProfile((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <div className="uni-banner">
        <div className="container">
          <div className="uni-banner-text">
            <h1>MY BOOKING</h1>
            <ul>
              <li>
                <a href="index">HOME</a>
              </li>
              <li>MY BOOKING</li>
            </ul>
          </div>
        </div>
      </div>
      <section className="card shadow-lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <CldImage className='rounded' src={userProfile?.profile_image || ''} width={300} height={300} alt="..." />
                    </div>
                    <div className="col-lg-8" >
                      <form className="row g-3 " onSubmit={async (e) => {
                        e.preventDefault()
                        try {
                          const { first_name,last_name,address,contact} = userProfile
                          const data:any = { first_name,last_name,address,contact}
                          const response = await userProfileUpdateApi(data)
                          console.log('profile response ', response.data)
                        } catch (error) {
                          console.error('Error updating profile', error)
                        }
                      }}>
                        <div className="col-md-12">
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
                                    value={userProfile?.first_name}
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
                                    value={userProfile?.last_name}
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
                                    value={userProfile?.email}
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
                                    value={userProfile?.contact}
                                    disabled={updateMode}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="inputEmail4" className="form-label">
                                    Address *
                                  </label>
                                  <textarea
                                    name='address'
                                    className="form-control"
                                    id="inputEmail4"
                                    value={userProfile?.address}
                                    disabled={updateMode}
                                    onChange={handleChange}

                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-end gap-3">
                                {!updateMode &&
                                  <button type="submit" className="btn btn-success btn-lg">
                                    Update
                                  </button>}
                                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setUpadateMode(!updateMode)}>
                                  Edit
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
