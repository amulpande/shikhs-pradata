'use client'
import React, { useEffect, useState } from 'react'
import { userMyBookingOrderApi } from '@lib/api/allApi'
import { Card, CardContent, Typography, Button } from '@mui/material';
import { BookingType } from '@lib/types/types';
import FeedbackComponent from './FeedbackComponent';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';

const MyBookingPage = () => {
    const [myOrderData, setMyOrderData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [selectedTutor, setSelectedTutor] = useState<Number>()

    const [show, setShow] = useState(false)

    useEffect(() => {
        userMyBookingOrderApi().then((response) => {
            const myOrder = response.data
            setMyOrderData(myOrder)
            setLoading(false) // loading false since data has been loaded
            // return response.data
        }).catch((error) => {
            setLoading(false) // loading false since we have encounter error
        })
    }, [loading])

    const handleOpen = (tutorId: number) => {
        setShow(true)
        setSelectedTutor(tutorId)
    }

    const handleClose = () => {
        setShow(false)
    }
    console.log('use state order data', myOrderData)
    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>MY BOOKING</h1>
                        <ul>
                            <li>
                                <a href="/index">HOME</a>
                            </li>
                            <li>MY BOOKING</li>
                        </ul>
                    </div>
                </div>
            </div>


            {/* End Banner Area */}
            {loading ?
                <LoadingComponent />

                :
                <div className="reg-area default-padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-1">
                                <div className="reg-items">
                                    <div className="col-md-8 reg-form default-padding-bottom">
                                        <div className="site-heading text-left">
                                            <p>
                                                <strong></strong>
                                            </p>
                                            <h3>
                                                <strong>Payment and policy Related Terms</strong>
                                            </h3>
                                            <hr />
                                            <strong>
                                                <br />
                                                • You don’t have to pay any extra money rather
                                                <br />
                                                • Bill depend on the requirement of service in some specific
                                                case of service it will increases or material cost from
                                                provider side
                                                <br />
                                                • you must have to give feedback from customer and tally bill
                                                with customers <br />
                                                • you must have to tally bill with Provider and take sign of
                                                on it <br />
                                            </strong>
                                            <p />
                                            <hr />
                                            <h2>Booking Status</h2>
                                            <hr />
                                        </div>
                                        <div>

                                            {myOrderData && myOrderData?.map((order: BookingType, index: number) => (
                                                <Card variant="outlined" key={index} style={{ margin: '2px', textAlign: 'center' }}>
                                                    <CardContent>
                                                        <Typography variant="h5" component="div" gutterBottom className='card-header'>
                                                            Order Details
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            <strong>Tutor Name :</strong> {order?.tutor_name}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                        <strong>Date </strong>: {order?.booking_date}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                        <strong>Appointment Time</strong> : {order?.booking_time}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                        <strong>   Subject name </strong>: {order?.subject_name}
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                        <strong>Booking Status </strong>: {order?.status}
                                                        </Typography>

                                                        <Typography variant="body1" gutterBottom>
                                                        <strong> Tution Charge </strong>: Rs{order?.tutor_price}/-
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                        <strong> Payment Status </strong>: {order?.payment_status}
                                                        </Typography>
                                                        {/* <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
                                                            Cancel booking
                                                        </Button> */}
                                                        {/* Add Provider Contact Information here */}
                                                        {order?.status === 'Accepted' && (
                                                            <Card variant="outlined" style={{ marginTop: '20px' }}>
                                                                <CardContent>
                                                                    <Typography variant="h6" gutterBottom>
                                                                        Provider Contact
                                                                    </Typography>
                                                                    <Typography variant="body1" gutterBottom>
                                                                        Provider Name : {order?.tutor_name}
                                                                    </Typography>
                                                                    <Typography variant="body1" gutterBottom>
                                                                        Phone Number : {order?.tutor_contact}
                                                                    </Typography>
                                                                    <Typography variant="body1" gutterBottom>
                                                                        Email : {order?.tutor_email}
                                                                    </Typography>
                                                                    <button className='btn btn-warning text-white' onClick={() => handleOpen(order?.tutor_id)}>Feedback</button>
                                                                </CardContent>
                                                            </Card>
                                                        )}
                                                        {order?.status === 'Rejected' && (
                                                            <Card variant="outlined" style={{ marginTop: '20px', color: 'red' }}>
                                                                <CardContent>
                                                                    <Typography variant="h6" gutterBottom>
                                                                        Your order has been Rejected by tutor
                                                                    </Typography>
                                                                    <Typography variant="h6" gutterBottom>
                                                                        Reason : {order?.cancellation_reason}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <button className='btn btn-success' onClick={() => setShow(!show)}>open</button> */}
            <FeedbackComponent show={show} handleClose={handleClose} tutorId={selectedTutor} />
            {/* End About */}
            
        </>

    )
}

export default MyBookingPage
