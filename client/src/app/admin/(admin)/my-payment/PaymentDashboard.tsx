'use client'
import { getAllPaymentDataForAdmin } from '@lib/api/allApi'
import usePaymentFetch from '@lib/hooks/usePaymentFetch'
import { Pagination } from '@mui/material'
import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'

const PaymentDashboard = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const { data: paymentData, loading, totalPages } = usePaymentFetch(getAllPaymentDataForAdmin, currentPage, selectedDate)
    const formatDate = (timestamp: any) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];; // Change date to desired format
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value)
    }
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-6">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <label htmlFor="paymentDate">Payment Date:</label>
                            </div>
                            <div className="col-md-9">
                                <input
                                    type="date"
                                    id="paymentDate"
                                    name="payment_date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container full-width" style={{ width: '100%', marginTop: -25 }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-2">


                            <div className='card'>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="table">
                                        <thead className='card-header'>
                                            <tr>
                                                <th>User</th>
                                                <th>Tutor</th>
                                                <th>Tutor Amount</th>
                                                <th>Payment Date</th>
                                                <th>My Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td>Loading </td>
                                                </tr>
                                                : paymentData && paymentData.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td>
                                                            <CldImage src={payment?.user_profile || ''} height={100} width={100} alt='user profile' />
                                                            {payment?.user_name}
                                                        </td>
                                                        <td>
                                                            <CldImage src={payment?.tutor_profile || ''} height={100} width={100} alt='tutor profile' />
                                                            {payment?.tutor_name}
                                                        </td>
                                                        <td>{payment?.tutor_amount}</td>
                                                        <td>{formatDate(payment?.payment_date)}</td>
                                                        <td>{payment?.admin_amount}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2 d-flex justify-content-center'>
                <Pagination
                    count={totalPages}
                    siblingCount={0}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </div>
        </>
    )
}

export default PaymentDashboard
