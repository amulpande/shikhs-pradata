'use client'
import React, { useEffect, useState } from 'react'
import { adminApprovBlockTutorRequestApi, adminNotApprovedTutorApi } from '../../../../../lib/api/allApi'
import { Button} from '@mui/material';
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent';
import { TutorType } from '../../../../../lib/types/types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { acceptNotification, rejectNotification } from '../../../../../lib/notification-toastify/notification-toastify';

const NewTutorJoinPage = () => {
    const [tutors, setTutors] = useState<TutorType[]>([])
    const [updated, setUpdated] = useState<boolean>(false)
    const [loadings,setLoading] = useState<boolean>(true)
    const [errors,setError] = useState('')
    
    useEffect(() => {
        adminNotApprovedTutorApi().then((response)=>{
            setTutors(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
            setError(error)
        })
    }, [loadings, updated])
    
    const handleAccept = (tutorId: number) => {
        setUpdated(false);
        setTutors([]); // Clear tutors data temporarily to show loading state
        adminApprovBlockTutorRequestApi(tutorId, { 'tutor_approve': true })
            .then(() => {
                acceptNotification();
                setUpdated(true); // Triggers useEffect
            })
            .catch(error => {
                console.error('Error accepting tutor:', error);
                setError(error); 
            });
    };

    const handleReject = (tutorId: number) => {
        setUpdated(false);
        setTutors([]); 
        adminApprovBlockTutorRequestApi(tutorId, { 'tutor_approve': false })
            .then(() => {
                rejectNotification();
                setUpdated(true);
            })
            .catch(error => {
                console.error('Error rejecting tutor:', error);
                setError(error); 
            });
    };
    // Defined button to use in TableComponent
    const renderCustomActionButtons = (tutorId: number) => (
        <>
            <Button variant="contained" color="success" onClick={() => handleAccept(tutorId)}>ACCEPT</Button>
            <Button variant="contained" color="error" onClick={() => handleReject(tutorId)}>REJECT</Button>
        </>
    );
    console.log('page rendered')
    return (
        <div style={{ marginTop: '5px' }}>
            <TableComponent data={tutors} loading={loadings} customActionButtons={renderCustomActionButtons} />
            <ToastContainer />
        </div>
    )
}

export default NewTutorJoinPage
