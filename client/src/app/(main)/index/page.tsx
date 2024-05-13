'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingState,userProfileData } from '@lib/slices/user-slice/user-slice';
import { fetchCityDataApi } from '@lib/slices/city-slice/city-slice';
import { userProfileApi } from '@lib/api/allApi';
import { AppDispatch,RooState } from '@lib/store/store';

const IndexPage = () => {
  const [userProfile, setUserProfile] = useState('')
  const [loading, setLoading] = useState(true);

  // const userAccessToken = useSelector(accessToken); 
  const userData = useSelector(userProfileData);
  const isFetching = useSelector(isLoadingState)
  const dispatch = useDispatch<AppDispatch>();
  const cityHai = useSelector((state: RooState) => state.cityData.cityData)
  useEffect(() => {
    userProfileApi()
      .then((response) => {
        const userDataFromApi = response.data.user;
        setUserProfile(userDataFromApi); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setLoading(false); 
      });

    dispatch(fetchCityDataApi())
  }, [dispatch]);
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
