'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataUsingToken } from '../../../../lib/store/thunk-api/user-api';
import { accessToken, isLoginUser } from '../../../../lib/slices/auth-slice/auth-slice';
import { isLoadingState, userProfileData } from '../../../../lib/slices/user-slice/user-slice';
import { fetchCityDataApi } from '../../../../lib/slices/city-slice/city-slice';

const IndexPage = () => {
  const userAccessToken = useSelector(accessToken);
  console.log('access from index ',userAccessToken)
  const userData = useSelector(userProfileData);
  console.log('user data from index',userData)
  const isFetching = useSelector(isLoadingState)
  // console.log('user'userData)
  const dispatch = useDispatch();
  const  cityHai = useSelector((state)=>state.cityData.cityData)
  useEffect(() => {
    
    dispatch(fetchUserDataUsingToken(userAccessToken) as any)

    dispatch(fetchCityDataApi()as any)
  }, [userAccessToken, dispatch]);
  // const tukan = accessToken
  // console.log('tukan',tukan)
  // console.log('isFetching',isFetching)
  console.log('cityhai bhai', cityHai)
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
      {cityHai && cityHai?.map((city,index)=>(
        <p key={index}>{city.city_name}</p>
      ))}
    </div>
  );
};

export default IndexPage;
