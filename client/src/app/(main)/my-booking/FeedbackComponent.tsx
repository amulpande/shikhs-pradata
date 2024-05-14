'use client'
import { sendFeedBackApi } from '@lib/api/allApi';
import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const FeedbackComponent = ({ show, handleClose ,tutorId}:any) => {
    const [review, setReview] = useState('');
    const [value, setValue] = useState(5); // Default star rating
    console.log('selected tutor in modal',tutorId)

    const handleSave = async() => {
        // api call for feedback 
        try {
            const response = await sendFeedBackApi({'review':review,'star':value,'tutor_id':tutorId})
            console.log('response of feedback',response.data)
        } catch (error) {
            console.error('Error posting feedback',error)
        }
        handleClose(); 
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Feedback Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formStarRating">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue:any) => {
                                setValue(newValue);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formReview">
                        {/* <Form.Label >Review</Form.Label> */}
                        <Form.Control as="textarea" placeholder='Please provide your review' rows={3} value={review} onChange={(e) => setReview(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FeedbackComponent;
