import React from 'react'
import { Modal, Button } from 'react-bootstrap';
const CancelledByUserModal = ({ show, onHide, order }: { show: boolean, onHide: any, order: string }) => {
  console.log('orderr ', order)
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Cacneled Your Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Reason :</strong> {order}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CancelledByUserModal
