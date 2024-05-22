'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RooState } from '@lib/store/store'
import { fetchCityDataApi } from '@lib/slices/city-slice/city-slice'
import { deleteCityApi } from '@lib/api/allApi';
import { errorNotify, successNotify } from '@lib/notification-toastify/notification-toastify';
import { CityFetchType } from '@lib/types/types';

const ViewAllCityPage = () => {
  const city = useSelector((state:RooState)=>state.cityData.cityData)
  const [updated,setUpdated] = useState<boolean>()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    // const cityFetchData = getCityApi()
    dispatch(fetchCityDataApi())
  },[dispatch,updated])
  return (
    <>
     
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>City ID</TableCell>
            <TableCell>City Name</TableCell>
            <TableCell>State Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {city && city?.map((city : CityFetchType) => (
            <TableRow key={city?.id}>
              <TableCell>{city?.id}</TableCell>
              <TableCell>{city?.city_name}</TableCell>
              <TableCell>{city?.city_state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </>
  )
}

export default ViewAllCityPage
