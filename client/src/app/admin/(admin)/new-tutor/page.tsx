'use client'
import React, { useEffect, useState } from 'react'
import { adminApprovBlockTutorRequestApi, adminBlockedUnblockedTutor, adminNotApprovedTutorApi } from '@lib/api/allApi'
import { Button, Pagination } from '@mui/material';
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent';
import { TutorType } from '@lib/types/types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { acceptNotification, rejectNotification } from '@lib/notification-toastify/notification-toastify';
import useTutorFetchData from '@lib/hooks/useTutorFetchData';

const NewTutorJoinPage = () => {
    // const [tutors, setTutors] = useState<TutorType[]>([])
    const [updated, setUpdated] = useState<boolean>(false)
    const [loadings, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [errors, setError] = useState('')

    const { tutors, loading, error, unBlockTutor, blockTutor, totalPages, acceptTutor } = useTutorFetchData(adminNotApprovedTutorApi, currentPage, searchQuery)
    const handleAccept = (tutorId: number) => {
        // setUpdated(false);
        const isConfirmed = window.confirm('Do you want to accept this user')
        if (isConfirmed) {
            acceptTutor(tutorId)
        }
    };

    const handleReject = (tutorId: number) => {
        const isConfirmed = window.confirm('Do you want to block this user')
        if (isConfirmed) {
            blockTutor(tutorId)
        }
    };
    // Defined button to use in TableComponent
    const renderCustomActionButtons = (tutorId: number) => (
        <>
            <Button variant="contained" color="success" onClick={() => handleAccept(tutorId)}>ACCEPT</Button>
            <Button variant="contained" color="error" onClick={() => handleReject(tutorId)}>BLOCK</Button>
        </>
    );
    return (
        <>
            <div className='mt-10 mr-15' >
                <TableComponent data={tutors} loading={loadings} customActionButtons={renderCustomActionButtons} />
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => { setCurrentPage(page) }}
                    variant="outlined"
                    shape="rounded"
                />
                <ToastContainer />
            </div>

        </>
    )
}

export default NewTutorJoinPage
