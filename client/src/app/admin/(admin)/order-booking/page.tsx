'use client'
import { getAllOrderBookingApi } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import React, { useEffect } from 'react'
import { Table, Button, TableBody, TableCell, TableHead, TableRow, Avatar, TableContainer, Grid, makeStyles } from '@mui/material';
import { BookingType } from '@lib/types/types';
const AdminOrderBookingPage = () => {  
  const { data } = useBookingFetchData<BookingType>(getAllOrderBookingApi)
  console.log('data -> ', data)
  return (
    <>
      <Grid container spacing={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">USER</TableCell>
              <TableCell align="center">TUTOR</TableCell>
              <TableCell align="center">SUBJECT</TableCell>
              <TableCell align="center">BOOKING</TableCell>
              <TableCell align="center">TIME</TableCell>
              <TableCell align="center">ORDER</TableCell>
              <TableCell align="center">PAYMENT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ?

              data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {row?.user_name}
                  </TableCell >
                  <TableCell align="center">
                    {row?.tutor_name}
                  </TableCell >
                  <TableCell align="center">
                    {row?.subject_name}
                  </TableCell >
                  <TableCell align="center" className='w-max'>
                    {row?.booking_date}
                  </TableCell >
                  <TableCell align="center">
                    {row?.booking_time}
                  </TableCell >
                  <TableCell align="center">
                    {row?.status}
                  </TableCell >
                  <TableCell align="center">
                    {row?.payment_status}
                  </TableCell >
                </TableRow>
              ))
              : <p>no booking data </p>}
          </TableBody>
        </Table>
      </Grid>
    </>
  )
}

export default AdminOrderBookingPage
