'use client'
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent'
import { Box, Button, Modal, Pagination, Typography } from '@mui/material'
import { getAdminAllBlockedTutorApi } from '@lib/api/allApi'
import useTutorFetchData from '@lib/hooks/useTutorFetchData'
import { useState } from 'react'
import ModelComponent from '@/components/ModalComponent/ModelComponent'

const BlockedTutoAdminPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const { tutors, loading, error, unBlockTutor ,totalPages} = useTutorFetchData(getAdminAllBlockedTutorApi, currentPage, searchQuery)
    const handleOpen = (tutorId:number,tutorName:string) => {
        const isConfirmed = window.confirm(`Are you sure want to unclock this ${tutorName}`)
        if (isConfirmed) {
            // setOpen(true)
            unBlockTutor(tutorId)
        }
    };
    const renderCustomActionButtons = (tutorId: number, tutorName: string) => {
        return (
            <>
                {/* <Button variant="contained" color="inherit" onClick={() => unBlockTutor(tutorId)}>UNBLOCK</Button> */}
                <Button variant="contained" color="success" onClick={()=> handleOpen(tutorId,tutorName)}>UNBLOCK</Button>
                {/* <ModelComponent block={()=>unBlockTutor(tutorId)} handleOpen={handleOpen} handleClose={handleClose} open={open} tutorId={tutorId} tutorName={tutorName}/> */}
            </>
        )
    }
    return (
        <div className='mt-10 mr-15'>
            <TableComponent data={tutors} loading={loading} customActionButtons={renderCustomActionButtons} />
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => { setCurrentPage(page) }}
                variant="outlined"
                shape="rounded"
            />
        </div>
    )
}

export default BlockedTutoAdminPage
