'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataUsingToken } from '../../../../lib/store/thunk-api/user-api';
import { accessToken, isLoginUser } from '../../../../lib/slices/auth-slice/auth-slice';
import { isLoadingState, userProfileData } from '../../../../lib/slices/user-slice/user-slice';
import { fetchCityDataApi } from '../../../../lib/slices/city-slice/city-slice';
import { userProfileApi } from '../../../../lib/api/allApi';
import { AppDispatch, RooState } from '../../../../lib/store/store';

const IndexPage = () => {
  const [userProfile, setUserProfile] = useState('')
  const [loading, setLoading] = useState(true);

  const userAccessToken = useSelector(accessToken); 
  const userData = useSelector(userProfileData);
  const isFetching = useSelector(isLoadingState)
  const dispatch = useDispatch<AppDispatch>();
  const cityHai = useSelector((state: RooState) => state.cityData.cityData)
  useEffect(() => {
    // dispatch(fetchUserDataUsingToken(userAccessToken) as any)
    userProfileApi()
      .then((response) => {
        const userDataFromApi = response.data.user;
        setUserProfile(userDataFromApi); // Store user data in state
        setLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setLoading(false); // Set loading state to false if there's an error
      });
    // const data = userProfileApi()
    // console.log(data)

    dispatch(fetchCityDataApi())
  }, []);
  // }, [userAccessToken, dispatch]);

  console.log('data -> ',userProfile)
  // console.log('user data -> ',userData)
  return (
    <div>
      {isFetching ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <>
          <p>hai bhai</p>
          <p>Email: {userData?.email}</p>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
      <p>city hai bhai</p>
      {cityHai && cityHai?.map((city, index) => (
        <p key={index}>{city.city_name}</p>
      ))}
    </div>
  );
};

export default IndexPage;
