'use client'
import loading from '@/app/loading'
import { getAllPaymentDataForAdmin } from '@lib/api/allApi'
import usePaymentFetch from '@lib/hooks/usePaymentFetch'
import { PyamentType } from '@lib/types/types'
import { Grid, TextField, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const PaymentDashboard = () => {
    const [currentPage,setCurrentPage] = useState<number>(1)
    const {data} = usePaymentFetch(getAllPaymentDataForAdmin,currentPage)
    console.log('data ',data)
    return (
        <>
            <div className="container full-width" style={{ width: '100%', marginTop: -25 }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-2">
                            <div className="card-header">
                                <h4>PAYMENT</h4>
                            </div>
                            <div className='card'>

                                <div style={{ overflowX: 'auto' }}>
                                    <Table aria-label="user data table">
                                        <TableHead>
                                            <TableRow>
                                                {/* <TableCell>ID</TableCell> */}
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell>Contact</TableCell>
                                                <TableCell>Gnder</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* {loading ?
                                                <TableCell>Loading </TableCell>
                                                : usersData && usersData.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>{user?.id}</TableCell>
                                                        <TableCell>{user?.first_name + ' ' + user?.last_name}</TableCell>
                                                        <TableCell>{user?.email}</TableCell>
                                                        <TableCell>{user?.address}</TableCell>
                                                        <TableCell>{user?.contact}</TableCell>
                                                        <TableCell>{user?.gender}</TableCell>
                                                        <TableCell>{user?.address}</TableCell>
                                                    </TableRow>
                                                ))} */}
                                        </TableBody>
                                    </Table>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentDashboard
