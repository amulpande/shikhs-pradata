'use client'
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent'
import { Button} from '@mui/material';
import useTutorFetchData from '../../../../../lib/hooks/useTutorFetchData'
import {getAllApprovedTutor } from '../../../../../lib/api/allApi';

const ApproedTutorPage = () => {
  const {tutors,loading,blockTutor} =useTutorFetchData(getAllApprovedTutor)
  const renderCustomActionButtons = (tutorId: number) => (
    <>
      <Button variant="contained" color="success" onClick={() => {
        blockTutor(tutorId)
      }} >BLOCK</Button>
    </>
  );
  return (
    <>
      <TableComponent data={tutors} loading={loading} customActionButtons={renderCustomActionButtons} />
    </>
  )
}

export default ApproedTutorPage
