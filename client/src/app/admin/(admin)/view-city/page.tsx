'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RooState } from '@lib/store/store'
import { fetchCityDataApi } from '@lib/slices/city-slice/city-slice'
import { deleteCityApi } from '@lib/api/allApi';
import { errorNotify, successNotify } from '@lib/notification-toastify/notification-toastify';

const ViewAllCityPage = () => {
  const city = useSelector((state:RooState)=>state.cityData.cityData)
  const [updated,setUpdated] = useState<boolean>()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    // const cityFetchData = getCityApi()
    dispatch(fetchCityDataApi())
  },[dispatch,updated])
  // console.log('city',city)
  return (
    <>
     
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>City ID</TableCell>
            <TableCell>City Name</TableCell>
            <TableCell>State Name</TableCell>
            {/* <TableCell>Delete</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {city?.map((city)=>(

          ))} */}
          {city && city?.map(city => (
            <TableRow key={city?.id}>
              <TableCell>{city?.id}</TableCell>
              <TableCell>{city?.city_name}</TableCell>
              <TableCell>{city?.city_state}</TableCell>
              {/* <TableCell><Button variant="contained" color="error" onClick={()=>{

                // Delete city by id
                // console.log('city id ',city?.id)
                deleteCityApi(city?.id).then((response)=>{
                  successNotify()
                  console.log(response)
                  setUpdated(true)
                }).catch((error)=>{
                  console.error(error)
                  errorNotify()
                  setUpdated(false)
                })
                
              }}>Delete</Button></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
   
    </>
  )
}

export default ViewAllCityPage
