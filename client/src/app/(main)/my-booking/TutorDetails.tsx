import React from 'react'
import { Modal, Button, Form, Image } from 'react-bootstrap';

const TutorDetails = ({ show, onHide, order }:{show:boolean,onHide:any,order:any}) => {
    return (
        <>
            <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Tutor Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>

                        <h4>Tutor Details</h4>
                        <p><strong>Tutor Name :</strong> {order?.tutor_name}</p>
                        <p><strong>Booking Date :</strong> {order?.booking_date}</p>
                        <p><strong>Appointment Time :</strong> {order?.booking_time}</p>
                        <p><strong>Subject Name :</strong> {order?.subject_name}</p>
                        <p><strong>Tutor Email :</strong> {order?.tutor_email}</p>
                        <p><strong>Tutor Contact :</strong>  {order?.tutor_contact}</p>
                    </center>
                    {/* <Image src={order?.profile_image}/> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TutorDetails
