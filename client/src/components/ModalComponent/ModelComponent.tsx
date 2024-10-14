'use client'
import { userBookTutorApi } from '@lib/api/allApi';
import { orderHasBeenBookedNotify, orderNotBookedErrorNotify } from '@lib/notification-toastify/notification-toastify';
import { UserBookTutortypes } from '@lib/types/types';
// import { Modal, Typography, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


const BookingModelComponent = ({ open, handleClose, handleOpen, tutorId, subject_id }: any) => {
    const time = ['08:00AM-09:00AM', '09:00AM-10:00AM',
        '10:00AM-11:00AM', '11:00AM-12:00AM',
        '12:00PM-01:00PM', '01:00PM-02:00PM',
        '02:00PM-03:00PM', '03:00PM-04:00PM',
        '04:00PM-05:00PM', '05:00PM-06:00PM',
        '06:00PM-07:00PM', '07:00PM-08:00PM',
    ]

    const [bookingData, setBookingData] = useState({
        booking_date: '',
        booking_time: '',
        tutor_id: tutorId,
        subject_id: subject_id
    })

    const handleChange = (e:any) => {
        const { name, value } = e.target
        setBookingData({ ...bookingData, [name]: value })
    }


    return (
        <>

            <Modal show={open} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="dob">Date </label>
                    <input
                        type="date"
                        name="booking_date"
                        id="dob"
                        // name="dob"
                        min={new Date().toISOString().split('T')[0]} // Set maximum date to today
                        value={bookingData.booking_date}
                        onChange={handleChange}
                    />
                    <label htmlFor="time">Time </label>
                    <select id="time" name='booking_time' style={{ marginBottom: '1rem' }} onChange={handleChange} value={bookingData.booking_time}>
                        <option>Select Time</option>
                        {
                            time?.map((time, index) => (
                                <option key={index} value={time} >{time}</option>
                            ))
                        }
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        type='submit'
                        variant="success"
                        onClick={async () => {
                            try {
                                const response = await userBookTutorApi(bookingData)
                                if (response) {
                                    // orderHasBeenBookedNotify()
                                    Swal.fire({
                                        title: "Booking Completed!",
                                        text: "Your appointment has been booked, now waiting for confirmation",
                                        icon: "success"
                                    });
                                }
                                handleClose()
                            } catch (error) {
                                console.error('Error booking', error)
                                // orderNotBookedErrorNotify()
                                Swal.fire({
                                    title: "Oops",
                                    text: "Your Appointment has been cancelled!",
                                    icon: "error"
                                });
                            }
                        }}>
                        Book Now
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <ToastContainer /> */}
        </>
    )
}

export default BookingModelComponent
