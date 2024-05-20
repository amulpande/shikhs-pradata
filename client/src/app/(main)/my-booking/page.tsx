'use client'
import React, { useEffect, useState } from 'react'
import { userMyBookingOrderApi } from '@lib/api/allApi'
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { BookingType } from '@lib/types/types';
import FeedbackComponent from './FeedbackComponent';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import Link from 'next/link';
import CheckOut from '@/components/Payment/CheckOut';
import TutorDetails from './TutorDetails';
import RejctedOrder from './RejctedOrder';

const MyBookingPage = () => {
    const [myOrderData, setMyOrderData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [selectedTutor, setSelectedTutor] = useState<Number>()

    const [show, setShow] = useState<boolean>(false)
    const [showTutor, setShowTutor] = useState<boolean>(false)
    const [selectedTutorData, setSelectedTutorData] = useState<any>()
    const [selectedCancelData,setSelectedCanceldData] = useState<any>()
    const [showCancelModal,setShowCancelModal] = useState<boolean>(false)

    useEffect(() => {
        userMyBookingOrderApi().then((response) => {
            const myOrder = response.data
            setMyOrderData(myOrder)
            setLoading(false) // loading false since data has been loaded
        }).catch((error) => {
            setLoading(false) // loading false since we have encounter error
        })
    }, [])

    const handleCancelOrder = (order:BookingType) =>{
        setShowCancelModal(true)
        setSelectedCanceldData({
            tutor_name: order?.tutor_name,
            tutor_contact: order?.tutor_contact,
            tutor_email: order?.tutor_email,
            booking_date:order?.booking_date,
            booking_time:order?.booking_time,
            subject_name:order?.subject_name,
            cancellation_reason:order?.cancellation_reason
        })
    } 

    const handleOpenTutor = (order: BookingType) => {
        setSelectedTutorData({
            tutor_name: order?.tutor_name,
            tutor_contact: order?.tutor_contact,
            tutor_email: order?.tutor_email,
            booking_date:order?.booking_date,
            booking_time:order?.booking_time,
            subject_name:order?.subject_name,
            cancellation_reason:order?.cancellation_reason
        });
        setShowTutor(true)
    }
    const handleCloseTutor = () => {
        setShowTutor(false)
    }

    const handleOpen = (tutorId: number) => {
        setShow(true)
        setSelectedTutor(tutorId)
    }

    const handleClose = () => {
        setShow(false)
        setShowCancelModal(false)
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
                                                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                                                    <Button variant='contained' onClick={() => handleOpenTutor(order)} style={{ marginRight: '10px', flex: 1 }}>Tutor</Button>
                                                                    <Button variant="contained" color="warning" onClick={() => handleOpen(order?.tutor_id)} style={{ marginRight: '10px', flex: 1 }}>Feedback</Button>
                                                                    <div style={{ flex: 1 }}>
                                                                        <CheckOut totalPrice={order?.tutor_price} tutorId={order?.tutor_id} bookingId={order?.id} bookingStatus={order?.payment_status} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {order?.status === 'Rejected' && (
                                                                <Button variant='contained' style={{backgroundColor:'red'}} onClick={()=>handleCancelOrder(order)}>Cancelled</Button>
                                                            )}
                                                            {
                                                                order?.status === 'Pending' && (
                                                                    <Button variant='contained'  disabled={true}>Pending</Button>
                                                                )
                                                            }
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
            <RejctedOrder show={showCancelModal} onHide={handleClose} order={selectedCancelData}/>
            <TutorDetails show={showTutor} onHide={handleCloseTutor} order={selectedTutorData} />
            <FeedbackComponent show={show} handleClose={handleClose} tutorId={selectedTutor} />

        </>

    )
}

export default MyBookingPage
