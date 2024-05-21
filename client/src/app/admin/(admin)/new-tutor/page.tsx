'use client'
import React, { useState } from 'react'
import { adminNotApprovedTutorApi } from '@lib/api/allApi'
import { Button, Pagination } from '@mui/material';
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTutorFetchData from '@lib/hooks/useTutorFetchData';
import Swal from 'sweetalert2'

const NewTutorJoinPage = () => {
    const [loadings, setLoading] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const { tutors, loading, error, unBlockTutor, blockTutor, totalPages, acceptTutor } = useTutorFetchData(adminNotApprovedTutorApi, currentPage, searchQuery)
    const handleAccept = (tutorId: number) => {
        const isConfirmed = window.confirm('Do you want to accept this user')
        if (isConfirmed) {
            acceptTutor(tutorId)
            Swal.fire({
                title: "Accpeted!",
                text: "Tutor Has been Accepted and email has sent to him",
                icon: "success"
            });
        }
    };

    const handleReject = (tutorId: number) => {
        const isConfirmed = window.confirm('Do you want to block this user')
        if (isConfirmed) {
            blockTutor(tutorId)
            Swal.fire({
                title: "Blocked!",
                text: "Tutor Has been Blocked and email has sent to him",
                icon: "success"
            });
        }
    };
    // Defined button to use in TableComponent
    const renderCustomActionButtons = (tutorId: number) => (
        <>
            <div className='d-flex'>
                <Button className="me-2" variant="contained" color="success" onClick={() => handleAccept(tutorId)}><i className="fa fa-check" aria-hidden="true"></i></Button>
                <Button className="me-2" variant="contained" color="error" onClick={() => handleReject(tutorId)}><i className="fa fa-ban" aria-hidden="true"></i></Button>
            </div>
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
