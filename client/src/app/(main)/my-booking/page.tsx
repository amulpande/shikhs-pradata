'use client'
import React, { useEffect, useState } from 'react'
import { userMyBookingOrderApi } from '../../../../lib/api/allApi'
import Link from 'next/link'
import { Card, CardContent, Typography, Button } from '@mui/material';

const MyBookingPage = () => {
    const [myOrderData, setMyOrderData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        userMyBookingOrderApi().then((response) => {
            const myOrder = response.data
            // console.log('my order',myOrder)
            setMyOrderData(myOrder)
            setLoading(false) // loading false since data has been loaded
            return response.data
        }).catch((error) => {
            // console.log('errpr aaya',error)
            setLoading(false) // loading false since we have encounter error
            return error
        })
    }, [loading])
    console.log('use state order data', myOrderData)
    return (
        <>
            <div className="uni-banner">
                <div className="container">
                    <div className="uni-banner-text">
                        <h1>MY BOOKING</h1>
                        <ul>
                            <li>
                                <a href="index.php">HOME</a>
                            </li>
                            <li>MY BOOKING</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* End Banner Area */}
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

                                        {myOrderData?.map((order, index) => (
                                            <Card variant="outlined" key={index} style={{ margin: '5px' }}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div" gutterBottom>
                                                        Order Details
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Tutor Name : {order?.tutor_name}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Date: {order?.booking_date}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Appointment Time: {order?.booking_time}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Subject name: {order?.subject_name}
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Booking Status: {order?.status}
                                                    </Typography>

                                                    <Typography variant="body1" gutterBottom>
                                                        Tution Charge: Rs{order?.price}/-
                                                    </Typography>
                                                    <Typography variant="body1" gutterBottom>
                                                        Payment Status: {order?.payment_status}
                                                    </Typography>
                                                    <Button variant="contained" color="error">
                                                        Cancel booking
                                                    </Button>
                                                    {/* Add Provider Contact Information here */}
                                                    {order?.status === 'Accepted' && (
                                                        <Card variant="outlined" style={{ marginTop: '20px' }}>
                                                            <CardContent>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Provider Contact
                                                                </Typography>
                                                                <Typography variant="body1" gutterBottom>
                                                                    Provider Name: {order?.tutor_name}
                                                                </Typography>
                                                                <Typography variant="body1" gutterBottom>
                                                                    Phone Number: radom numbber
                                                                </Typography>
                                                                <Typography variant="body1" gutterBottom>
                                                                    Email:email is not coming from backend
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
            {/* End About */}
            <form method="post" id="feedback-form" className="mfp-hide white-popup-block">
                <div className="col-md-12 login-custom">
                    <h4>Please Give Your Precious Review Feedbck</h4>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group comments">
                                <textarea
                                    className="form-control"
                                    id="comments"
                                    name="message"
                                    placeholder="Tell Me About Your Query minimum 25 words *"
                                    //   pattern="[A-Za-z 0-9]{25}"

                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <button type="submit" name="send">
                                send Review
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}

export default MyBookingPage
