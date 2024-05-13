'use client'
import { userBookTutorApi } from '@lib/api/allApi';
import { UserBookTutortypes } from '@lib/types/types';
// import { Modal, Typography, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModelComponent = ({ open, handleClose, handleOpen, tutorId, subject_id }: any) => {
    const time = ['08:00-09:00', '09:00-10:00', '10:00:11:00', '11:00-12:00', '12:00-01:00', '01:00-02:00', '02:00-03:00']

    const [bookingData, setBookingData] = useState({
        booking_date: '',
        booking_time: '',
        tutor_id: tutorId,
        subject_id: subject_id
    })
    // console.log('tutorid model ', bookingData)
    const handleChange = (e) => {
        const { name, value } = e.target
        setBookingData({ ...bookingData, [name]: value })
    }
    console.log(bookingData);
    
    return (
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
                    variant="primary"
                    onClick={async() => {
                        console.log(bookingData)
                        const response =await userBookTutorApi(bookingData)
                        // console.log('booking')
                    }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BookingModelComponent
