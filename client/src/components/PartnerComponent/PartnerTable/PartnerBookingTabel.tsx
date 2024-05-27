'use client'
import { BookingType } from '@lib/types/types'
import { CldImage } from 'next-cloudinary'
import React from 'react'
interface PropsType {
    data: BookingType[]
    loading: boolean
    customActionButtons: (booking: BookingType) => React.ReactNode
}

const PartnerBookingTabel = ({ data, loading, customActionButtons }: PropsType) => {
    return (
        <div className='mt-2'>
            <div>
                <table className="table">
                    <thead className="card-header thead-dark">
                        <tr >
                            <th scope="col">User</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Address</th>
                            <th scope="col">Time</th>
                            <th scope="col">Date</th>
                            {/* <th scope="col">User Cancelled</th> */}
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (data?.map((booking, index) => (
                            <tr key={index}>
                                <td>
                                    <CldImage src={`https://res.cloudinary.com/dossxd9nu/image/upload/v1715841663/${booking?.user_profile}`|| ''} height={100} width={100} alt='user profile' />
                                    {booking?.user_name}
                                </td>
                                <td>{booking?.user_email}</td>
                                <td>{booking?.user_contact}</td>
                                <td>{booking?.user_address}</td>
                                <td>{booking?.booking_time}</td>
                                <td>{booking?.booking_date}</td>
                                {/* <td>{booking?.usr_cancellation_reason.length>0?booking?.usr_cancellation_reason.length>0:'NAN'}</td> */}
                                <td >
                                    {customActionButtons(booking)}
                                </td>
                            </tr>
                        )))
                            : <tr><td>
                                No Data Found
                            </td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PartnerBookingTabel
