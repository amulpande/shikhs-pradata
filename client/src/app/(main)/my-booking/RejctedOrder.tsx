import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const RejctedOrder = ({ show, onHide, order }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Rejected</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Order Details</h4>
                <p><strong>Tutor Name:</strong> {order?.tutor_name}</p>
                <p><strong>Booking Date:</strong> {order?.booking_date}</p>
                <p><strong>Appointment Time:</strong> {order?.booking_time}</p>
                <p><strong>Subject Name:</strong> {order?.subject_name}</p>
                <h4>Rejection Details</h4>
                <p><strong>Reason:</strong> {order?.cancellation_reason}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default RejctedOrder
