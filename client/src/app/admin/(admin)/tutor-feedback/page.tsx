'use client'
import { getFeedbackAdminSideApi } from '@lib/api/allApi'
import useFeedbackFetch from '@lib/hooks/useFeedbackFetch'
import { CldImage } from 'next-cloudinary'

const AdminSideTutorFeedBackPage = () => {
    const { data: feedBack, approvedFeedback, deleteFeedback, dissApprovedFeedback } = useFeedbackFetch(getFeedbackAdminSideApi)
    const handleDissapprove = (id: number) => {
        const isConfirmed = window.confirm('Are you sure?')
        if (isConfirmed) {
            dissApprovedFeedback(id)
        }
    }

    const handleApprove = (id: number) => {
        const isConfirmed = window.confirm('Are you sure?')
        if (isConfirmed) {
            approvedFeedback(id)
        }
    }
    return (
        <div>
            <table className="table">
                <caption>Feedback</caption>
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope='col'>Tutor Profile</th>
                        <th scope="col">Tutor</th>
                        <th scope="col">User Profile</th>
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
                            <th scope="row"><CldImage src={feed?.tutor_profile || ''} height={50} width={50} alt='tutor profile'/></th>
                            <td>{feed?.tutor_name}</td>
                            <td><CldImage src={feed?.user_profile || ''} height={50} width={50} alt='user profile'/></td>
                            <td>{feed?.user_name}</td>
                            <td>{feed?.review}</td>
                            <td>{feed?.star}</td>
                            <td>{feed?.isApproved ?
                                    <button className='btn btn-warning' onClick={() => handleDissapprove(feed?.id)}><i className='fa fa-times'></i></button>
                                :
                                    <button className='btn btn-success' onClick={() => handleApprove(feed?.id)}><i className='fa fa-check'></i></button>}
                            </td>
                            <td><button className='btn btn-danger' onClick={() => {
                                const isConfirmed = window.confirm('Do you really want to delete this')
                                if (isConfirmed) {
                                    deleteFeedback(feed?.id)
                                }
                            }}><i className='fa fa-trash'></i></button></td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default AdminSideTutorFeedBackPage
