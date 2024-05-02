'use client'
import React, { useEffect, useState } from 'react';
// import styles from './ProfilePage.module.scss';
import styles from './ProfilePage.module.scss'
import { userProfileApi } from '../../../../lib/api/allApi';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState('')
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
  console.log('userProfile', userProfile)

  return (
    <div className={`${styles.container} ${styles['emp-profile']}`}>
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className={styles['profile-img']}>
              <img
                src={`${userProfile?.profile_image}`}
                height="250px"
                width="350px"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles['profile-head']}>
              <h5>{userProfile?.first_name + ' ' + userProfile?.last_name}</h5>
              <h6>{userProfile?.address}</h6>
              <p className={styles['proile-rating']} />
              <ul className={`nav nav-tabs ${styles['nav-tabs']}`} id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link active ${styles['nav-link']}`}
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-6">
            <div className={`tab-content ${styles['profile-tab']}`} id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userProfile?.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userProfile?.contact}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userProfile?.address}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
