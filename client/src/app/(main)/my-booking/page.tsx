'use client'
import React, { useEffect, useState } from 'react'
import { userMyBookingOrderApi } from '@lib/api/allApi'
import { Card, CardContent, Typography, Button, Grid, Pagination } from '@mui/material';
import { BookingType } from '@lib/types/types';
import FeedbackComponent from './FeedbackComponent';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import Link from 'next/link';
import CheckOut from '@/components/Payment/CheckOut';
import TutorDetails from './TutorDetails';
import RejctedOrder from './RejctedOrder';
import useBookingFetchData from '@lib/hooks/useBookingFetchData';
import { CldImage } from 'next-cloudinary';
import CancelOrderByUser from './CancelOrderByUser';

const MyBookingPage = () => {
    const [selectedTutor, setSelectedTutor] = useState<Number>()

    const [show, setShow] = useState<boolean>(false)
    const [showTutor, setShowTutor] = useState<boolean>(false)
    const [selectedTutorData, setSelectedTutorData] = useState<any>()
    const [selectedCancelData, setSelectedCanceldData] = useState<any>()
    const [showCancelModal, setShowCancelModal] = useState<boolean>(false)
    const [orderBy, setOrderBy] = useState('-id')
    const [status, setStatus] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [showMyCancelOrder, setShowMyCancerOrder] = useState<boolean>(false)
    const [paymentDate, setPaymentDate] = useState<string>('')

    const { data: myOrderData, loading, totalPages } = useBookingFetchData(userMyBookingOrderApi, currentPage, orderBy, status, 9, paymentDate)

    const handleCancelOrder = (order: BookingType) => {
        setShowCancelModal(true)
        setSelectedCanceldData({
            tutor_name: order?.tutor_name,
            tutor_contact: order?.tutor_contact,
            tutor_email: order?.tutor_email,
            booking_date: order?.booking_date,
            booking_time: order?.booking_time,
            subject_name: order?.subject_name,
            cancellation_reason: order?.cancellation_reason
        })
    }

    const handleOpenTutor = (order: BookingType) => {
        setSelectedTutorData({
            tutor_name: order?.tutor_name,
            tutor_contact: order?.tutor_contact,
            tutor_email: order?.tutor_email,
            booking_date: order?.booking_date,
            booking_time: order?.booking_time,
            subject_name: order?.subject_name,
            cancellation_reason: order?.cancellation_reason
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
        setShowMyCancerOrder(false)
    }
    const handleOpenCancelOrder = (order: BookingType) => {
        setSelectedTutor(order?.id)
        setShowMyCancerOrder(true)
    }

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
                                    <div className="col-md-4 reg-form default-padding-bottom">
                                        <div className="site-heading text-left">
                                            <h3><strong>Payment and Policy Related Terms</strong></h3>
                                            <hr />
                                            <strong>
                                                • You don’t have to pay any extra money <br />
                                                • Once paid than it can not be refunded <br />
                                                • You must give feedback for better understanding
                                            </strong>

                                            <hr />
                                            <h3>Booking Status</h3>
                                            <div className="d-flex justify-content-end">
                                                <select className="form-select me-2" value={orderBy} onChange={(e) => {
                                                    setOrderBy(e.target.value)
                                                    setCurrentPage(1)
                                                }} style={{ maxWidth: '200px' }}>
                                                    <option value={'-id'}>Sort</option>
                                                    <option value={'payment_status'}>Paid</option>
                                                    <option value={'-payment_status'}>Unpaid</option>
                                                    <option value={'-usr_cancellation_reason'}>Your Cancelled order</option>
                                                </select>

                                                <select className="form-select me-2" value={status} onChange={(e) => {
                                                    setStatus(e.target.value)
                                                    setCurrentPage(1)
                                                }} style={{ maxWidth: '200px' }}>
                                                    <option value={''}>Filter</option>
                                                    <option value={'Accepted'}>Accepted</option>
                                                    <option value={'Rejected'}>Rejected</option>
                                                    <option value={'Pending'}>Pending</option>
                                                </select>

                                                <input
                                                    className='form-control me-2'
                                                    style={{ maxWidth: '200px' }}
                                                    id='paymentDate'
                                                    name='paymentDate'
                                                    value={paymentDate}
                                                    type='date'
                                                    onChange={(e) => {
                                                        setPaymentDate(e.target.value)
                                                        
                                                    }}
                                                />
                                            </div>
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
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '200px', margin: '0 auto' }}>
                                                                <CldImage
                                                                    src={order?.tutor_profile}
                                                                    height={200}
                                                                    width={200}
                                                                    alt='tutor profile'
                                                                    crop="fill"
                                                                />
                                                            </div>
                                                            <Typography variant="body1" gutterBottom>
                                                                <strong><i className="fas fa-user-circle"></i></strong> : {order?.tutor_name}
                                                            </Typography>
                                                            <Typography variant="body1" gutterBottom>
                                                                <strong><i className="fa fa-calendar" aria-hidden="true"></i></strong> : {order?.booking_date}
                                                            </Typography>
                                                            <Typography variant="body1" gutterBottom>
                                                                <strong><i className="fas fa-hourglass-half"></i></strong> : {order?.booking_time}
                                                            </Typography>
                                                            <Typography variant="body1" gutterBottom>
                                                                <strong> <i className='fa fa-book'></i> </strong>: {order?.subject_name}
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

                                                            {order?.status === 'Accepted' && order?.usr_cancellation_reason.length == 0 && (
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Button
                                                                        variant='contained'
                                                                        size="small"
                                                                        onClick={() => handleOpenTutor(order)}
                                                                        style={{ marginRight: '10px' }}
                                                                    >
                                                                        {/* <i className='fa fa-user'></i> */}
                                                                        Tutor
                                                                    </Button>
                                                                    {
                                                                        order?.payment_status == 'Paid' ?
                                                                            (<Button
                                                                                variant="contained"
                                                                                size="small" color="warning"
                                                                                onClick={() => handleOpen(order?.tutor_id)}
                                                                                style={{ marginRight: '10px' }}
                                                                            >
                                                                                {/* <i className='fa fa-comments'></i> */}
                                                                                Feedback
                                                                            </Button>)
                                                                            :
                                                                            (
                                                                                <Button variant='contained' onClick={() => handleOpenCancelOrder(order)} style={{ backgroundColor: 'red', marginRight: '10px' }}>
                                                                                    Cancel
                                                                                </Button>
                                                                            )
                                                                    }
                                                                    <div>
                                                                        {/* <Button onClick={()=>{
                                                                            const isConfirmed = window.confirm('Once payment done than its not refundable')
                                                                        }}>
                                                                            Pay
                                                                        </Button> */}

                                                                        <CheckOut
                                                                            totalPrice={order?.tutor_price}
                                                                            tutorId={order?.tutor_id}
                                                                            bookingId={order?.id}
                                                                            bookingStatus={order?.payment_status}
                                                                        />
                                                                    </div>

                                                                </div>
                                                            )}
                                                            {order?.status === 'Rejected' && (
                                                                <Button variant='contained' style={{ backgroundColor: 'red' }} onClick={() => handleCancelOrder(order)}>Rejected</Button>
                                                            )}
                                                            {order?.usr_cancellation_reason.length > 0 ? (
                                                                <Button variant='contained'>You have canceled</Button>
                                                            ) : (
                                                                <>
                                                                    {/* {(order?.status === 'Pending' || (order?.status === 'Accepted' && order?.payment_status !== 'Paid')) && (
                                                                        // <Button variant='contained' onClick={() => handleOpenCancelOrder(order)} style={{ backgroundColor: 'red', marginRight: '10px' }}>
                                                                        //     Cancel Order
                                                                        // </Button>
                                                                    )} */}
                                                                    {order?.status === 'Pending' && (
                                                                        <>
                                                                            <Button variant='contained' onClick={() => handleOpenCancelOrder(order)} style={{ backgroundColor: 'red', marginRight: '10px' }}>
                                                                                Cancel
                                                                            </Button>
                                                                            <Button variant='contained' disabled={true}>Pending</Button>
                                                                        </>
                                                                    )}
                                                                </>
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
            <div className='mt-2 d-flex justify-content-center'>
                <Pagination
                    count={totalPages}
                    siblingCount={0}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </div>
            <CancelOrderByUser show={showMyCancelOrder} onHide={handleClose} order={selectedTutor} />
            <RejctedOrder show={showCancelModal} onHide={handleClose} order={selectedCancelData} />
            <TutorDetails show={showTutor} onHide={handleCloseTutor} order={selectedTutorData} />
            <FeedbackComponent show={show} handleClose={handleClose} tutorId={selectedTutor} />

        </>

    )
}

export default MyBookingPage
