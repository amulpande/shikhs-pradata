'use client'
import { getAllOrderBookingApi } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import React, { useEffect } from 'react'
import { Table, Button, TableBody, TableCell, TableHead, TableRow, Avatar, TableContainer, Grid, makeStyles } from '@mui/material';
import { BookingType } from '@lib/types/types';
const AdminOrderBookingPage = () => {
  const { data } = useBookingFetchData(getAllOrderBookingApi)
  return (
    <>
      <div className='mt-4'>
        <Grid container spacing={2} >
          <Table>
            <TableHead className='card-header'>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>USER</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>TUTOR</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>SUBJECT</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>BOOKING</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>TIME</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>ORDER</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>PAYMENT</TableCell>
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
      </div>
    </>
  )
}

export default AdminOrderBookingPage
