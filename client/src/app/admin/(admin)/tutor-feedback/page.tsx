'use client'
import { approvedDisapprovedFeedbackByAdmin, getFeedbackAdminSideApi } from '@lib/api/allApi'
import useFeedbackFetch from '@lib/hooks/useFeedbackFetch'
import { AdminFeedbackTypes } from '@lib/types/types'
import React, { useEffect, useState } from 'react'

const AdminSideTutorFeedBackPage = () => {
    const { data: feedBack, approvedFeedback, deleteFeedback, dissApprovedFeedback } = useFeedbackFetch(getFeedbackAdminSideApi)
    console.log('data ',feedBack)
    return (
        <div>
            <table className="table">
                <caption>Feedback</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tutor</th>
                        <th scope="col">User</th>
                        <th scope="col">Review</th>
                        <th scope="col">Star</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {feedBack && feedBack.map((feed, index) => (

                        <tr key={index}>
                            <th scope="row">{feed?.id}</th>
                            <td>{feed?.tutor_name}</td>
                            <td>{feed?.user_name}</td>
                            <td>{feed?.review}</td>
                            <td>{feed?.star}</td>
                            <td>{feed?.isApproved ? <button className='btn btn-warning' onClick={() => dissApprovedFeedback(feed?.id)}>Dissapprove</button> : <button className='btn btn-success' onClick={() => approvedFeedback(feed?.id)}>Approve</button>}</td>
                            <td><button className='btn btn-danger' onClick={() => {
                                const isConfirmed = window.confirm('Do you really want to delete this')
                                if (isConfirmed) {
                                    deleteFeedback(feed?.id)
                                }
                            }}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AdminSideTutorFeedBackPage
