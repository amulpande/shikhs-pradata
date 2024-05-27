'use client'
import { getAllOrderBookingApi } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import React, { useEffect, useState } from 'react'
import { Table, Button, TableBody, TableCell, TableHead, TableRow, Avatar, TableContainer, Grid, makeStyles, Pagination } from '@mui/material';
const AdminOrderBookingPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<string>('-id')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10);
  const { data, totalCount, totalPages } = useBookingFetchData(getAllOrderBookingApi, currentPage, sort, status, pageSize)
  return (
    <>
      <div className="d-flex justify-content-end mt-2">
        <div className="d-flex justify-content-end mr-2">
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing page size
            }}
            style={{ maxWidth: '200px' }}
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            {/* Add more options if needed */}
          </select>
        </div>
        <select className="form-select me-2" value={sort} onChange={(e) => setSort(e.target.value)} style={{ maxWidth: '200px' }}>
          <option value={'-id'}>Sort</option>
          <option value={'payment_status'}>Paid</option>
          <option value={'-payment_status'}>Unpaid</option>
        </select>

        <select className="form-select" value={status} onChange={(e) => {
          setStatus(e.target.value)
          setCurrentPage(1)
        }} style={{ maxWidth: '200px' }}>
          <option value={''}>Filter</option>
          <option value={'Accepted'}>Accepted</option>
          <option value={'Rejected'}>Rejected</option>
          <option value={'Pending'}>Pending</option>
        </select>
      </div>
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
                      {row?.status == 'Accepted' ? <button className='btn btn-success'>{row?.status}</button> : row?.status == 'Pending' ? <button className='btn btn-warning'>{row?.status}</button> : <button className='btn btn-danger'>{row?.status}</button>}
                    </TableCell >
                    <TableCell align="center">
                      {row?.payment_status == 'Unpaid' ? <button className='btn btn-secondary'>{row?.payment_status}</button> : <button className='btn btn-success'>{row?.payment_status}</button>}
                    </TableCell >
                  </TableRow>
                ))
                : <p>no booking data </p>}
            </TableBody>
          </Table>
        </Grid>
        <div className='mt-2 d-flex justify-content-center'>
          <Pagination
            count={totalPages}
            siblingCount={0}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default AdminOrderBookingPage
