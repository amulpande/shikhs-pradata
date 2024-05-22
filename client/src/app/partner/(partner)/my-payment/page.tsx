'use client'
import { getAllPaymentDataForTutor } from '@lib/api/allApi'
import usePaymentFetch from '@lib/hooks/usePaymentFetch'
import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'

const PartnerMeetingPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data: paymentData, loading } = usePaymentFetch(getAllPaymentDataForTutor, currentPage)
    const formatDate = (timestamp: any) => {
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0];; // Change date to desired format
    }
    return (
        <>
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
                                                : paymentData && paymentData.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td>
                                                            <CldImage src={payment?.user_profile || ''} height={100} width={100} alt='user profile' />
                                                            {payment?.user_name}
                                                        </td>
                                                        <td>{formatDate(payment?.payment_date)}</td>
                                                        <td>{payment?.admin_amount}</td>
                                                        <td>{payment?.tutor_amount}</td>
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

        </>
    )
}

export default PartnerMeetingPage
