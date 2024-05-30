'use client'
import { userCancelBookingOrderApi } from '@lib/api/allApi';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
const CancelOrderByUser = ({ show, onHide, order }: { show: boolean, onHide: any, order: any }) => {
    const [cancelOrder, setCancelOrder] = useState('')

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        name="cancelOrder"
                        className="form-control"
                        aria-describedby="emailHelp"
                        onChange={(e) => setCancelOrder(e.target.value)}
                        placeholder="Provide Reason"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="secondary" onClick={async () => {
                        try {
                            const response = await userCancelBookingOrderApi(order, { usr_cancellation_reason: cancelOrder })
                            if (response) {
                                Swal.fire({
                                    title: "Appointment Cacnelled!",
                                    text: "Your Appointment has been cancelled!",
                                    icon: "success"
                                });
                            }
                        } catch (error) {
                            console.error('Error in cancel order ', error)
                        }
                    }}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CancelOrderByUser
