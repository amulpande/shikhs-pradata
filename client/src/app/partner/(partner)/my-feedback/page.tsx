'use client'
import { tutorGetAllFeedback } from '@lib/api/allApi'
import useFeedbackFetch from '@lib/hooks/useFeedbackFetch'
import React from 'react'

const PartnerMyFeedBackPage = () => {
    const {data:feedback,loading} = useFeedbackFetch(tutorGetAllFeedback)
    console.log('data',loading)
    return (
        <div>
            {
                loading?<h4>loading</h4> : <h4>done</h4>
            }
            <table className="table">
                <thead className="card-header thead">
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">User</th>
                        <th scope="col">Review</th>
                        <th scope="col">Star</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        feedback && feedback.map((feed,index)=>(
                            <tr key={index} className="card-body">
                                <td>{feed?.user_name}</td>
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
