'use client'
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent'
import { Box, Button, Modal, Pagination, Typography } from '@mui/material';
import useTutorFetchData from '@lib/hooks/useTutorFetchData'
import { getAllApprovedTutorApi } from '@lib/api/allApi';
import { useState } from 'react';
import ModelComponent from '@/components/ModalComponent/ModelComponent';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ApproedTutorPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false);
  const { tutors, loading, blockTutor, totalCount, totalPages } = useTutorFetchData(getAllApprovedTutorApi, currentPage, searchQuery)
  const handleOpen = (tutorId: number, tutorName: string) => {
    const isConfirmed = window.confirm(`Are you sure want to block this user ${tutorName}`)
    if (isConfirmed) {
      // setOpen(true)
      blockTutor(tutorId)
    }
  };
  const renderCustomActionButtons = (tutorId: number, tutorName: string) => (
    <>
      {/* <Button variant="contained" color="success" onClick={() => { blockTutor(tutorId) }} >BLOCK</Button> */}
      <Button variant="contained" color="success" onClick={() => handleOpen(tutorId, tutorName)} >BLOCK</Button>
    </>
  );
  return (
    <>
    <div className='card-header'>
      <h3 className='card-title'>Approved Tutor List</h3>
    </div>
      <div className='mt-4 mr-15'>

        <TableComponent data={tutors} loading={loading} customActionButtons={renderCustomActionButtons} />
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => { setCurrentPage(page) }}
          variant="outlined"
          shape="rounded"
        />
      </div>

    </>
  )
}

export default ApproedTutorPage
