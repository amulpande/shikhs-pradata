'use client'
import { BookingType } from '@lib/types/types'
import React from 'react'
interface PropsType {
    data: BookingType[]
    loading: boolean
    customActionButtons: (id: number) => React.ReactNode
}

const PartnerBookingTabel = ({ data, loading, customActionButtons }: PropsType) => {
    return (
        <div>
            <div>
                <table className="table">
                    <thead className="card-header thead-dark">
                        <tr >
                            <th scope="col">User</th>
                            <th scope="col">Email</th>
                            <th scope="col">Time</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (data?.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking?.user_name}</td>
                                <td>{booking?.user_email}</td>
                                <td>{booking?.booking_time}</td>
                                <td>{booking?.booking_date}</td>
                                <td >
                                    {customActionButtons(booking?.id)}
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
