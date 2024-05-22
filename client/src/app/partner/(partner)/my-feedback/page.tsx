'use client'
import { tutorGetAllFeedback } from '@lib/api/allApi'
import useFeedbackFetch from '@lib/hooks/useFeedbackFetch'
import { CldImage } from 'next-cloudinary'
import React from 'react'

const PartnerMyFeedBackPage = () => {
    const { data: feedback, loading } = useFeedbackFetch(tutorGetAllFeedback)
    return (
        <div className='mt-2'>
            <table className="table">
                <thead className="card-header thead">
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Review</th>
                        <th scope="col">Star</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        feedback && feedback.map((feed, index) => (
                            <tr key={index} className="card-body">
                                <td>
                                    <CldImage src={feed?.user_profile} height={100} width={100} alt='User Profile'/>
                                    {feed?.user_name}
                                </td>
                                <td>{feed?.user_email}</td>
                                <td>{feed?.review}</td>
                                <td>{feed?.star}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default PartnerMyFeedBackPage
