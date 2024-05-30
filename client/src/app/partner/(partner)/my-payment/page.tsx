'use client'
import { getAllPaymentDataForTutor } from '@lib/api/allApi'
import usePaymentFetch from '@lib/hooks/usePaymentFetch'
import { Pagination } from '@mui/material'
import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'

const PartnerMeetingPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [paymentDate, setPaymentDate] = useState<string>('')
    const { data: paymentData, loading ,totalPages} = usePaymentFetch(getAllPaymentDataForTutor, currentPage, paymentDate)
    const formatDate = (timestamp: any) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];; // Change date to desired format
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDate(e.target.value)
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
                                    name="paymentDate"
                                    value={paymentDate}
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
                                                <th>Payment Date</th>
                                                <th>Admin Amount</th>
                                                <th>My Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td>Loading </td>
                                                </tr>
                                                : paymentData.length > 0 ? paymentData.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td>
                                                            <CldImage src={payment?.user_profile || ''} height={100} width={100} alt='user profile' />
                                                            {payment?.user_name}
                                                        </td>
                                                        <td>{formatDate(payment?.payment_date)}</td>
                                                        <td>{payment?.admin_amount}</td>
                                                        <td>{payment?.tutor_amount}</td>
                                                    </tr>
                                                ))
                                                    :
                                                    <tr>
                                                        <td>No Data Found</td>
                                                    </tr>
                                            }
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

export default PartnerMeetingPage
