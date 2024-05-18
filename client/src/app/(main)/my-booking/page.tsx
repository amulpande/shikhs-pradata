'use client'
import React, { useEffect, useState } from 'react'
import { userMyBookingOrderApi } from '@lib/api/allApi'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { BookingType } from '@lib/types/types';
import FeedbackComponent from './FeedbackComponent';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import Link from 'next/link';
import CheckOut from '@/components/Payment/CheckOut';

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
        }).catch((error) => {
            setLoading(false) // loading false since we have encounter error
        })
    }, [])

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
                                <Link href="/index">HOME</Link>
                            </li>
                            <li>MY BOOKING</li>
                        </ul>
                    </div>
                </div>
            </div>
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
                                                • You don’t have to pay any extra money
                                                <br />
                                                • Only pay once your session has completed
                                                <br />
                                                • you must have to give feedback for better understanding
                                            </strong>
                                            <p />
                                            <hr />
                                            <h2>Booking Status</h2>
                                            <hr />
                                        </div>
                                        <Grid container spacing={2}>
                                            {myOrderData && myOrderData.map((order: BookingType, index: number) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Card variant="outlined" style={{ margin: '2px', textAlign: 'center' }}>
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
                                                                        <Button variant="contained" color="warning"  onClick={() => handleOpen(order?.tutor_id)}>Feedback</Button>
                                                                        {/* <Button variant="contained" color="info" >Pay Now</Button>
                                                                         */}

                                                                         <CheckOut totalPrice={order?.tutor_price} tutorId={order?.tutor_id} bookingId={order?.id} bookingStatus={order?.payment_status}/>
                                                                         

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
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            <FeedbackComponent show={show} handleClose={handleClose} tutorId={selectedTutor} />
            
        </>

    )
}

export default MyBookingPage
