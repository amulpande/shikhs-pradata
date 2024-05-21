import { updateSubjectApi } from '@lib/api/allApi';
import React, { useState ,useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'

const SubjectUpdateComponent = ({ show, handleClose, subject }:any) => {
    const [updatedSubjectName, setUpdatedSubjectName] = useState(subject ? subject.subject_name : '');
    const handleSave = async() => {
        // console.log('Saving updated subject:', updatedSubjectName);
        try {
            const response = await updateSubjectApi(subject.id,updatedSubjectName.toUpperCase())
            console.log('object',response)
        } catch (error) {
            console.error('Error updating subject ',error)
        }
        handleClose(); // Close the modal after saving
    };
    useEffect(() => {
        if (subject) {
            setUpdatedSubjectName(subject.subject_name);
        }
    }, [subject]);
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="updatedSubjectName">Subject Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="updatedSubjectName"
                        value={updatedSubjectName}
                        onChange={(e) => setUpdatedSubjectName(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SubjectUpdateComponent
