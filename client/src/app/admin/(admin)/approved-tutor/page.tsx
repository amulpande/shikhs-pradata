'use client'
import TableComponent from '@/components/AdminComponents/TableComponent/TableComponent'
import React, { useEffect, useState } from 'react'
import { getAllApprovedTutor } from '../../../../../lib/api/allApi'
import useFetchData from '../../../../../lib/hooks/userFetchData'
import { TutorType } from '../../../../../lib/types/types'
import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ApproedTutorPage = () => {
  const [tutors, setTutors] = useState<TutorType[]>([])
  const { data: tutor, loading, error } = useFetchData(getAllApprovedTutor)

  useEffect(() => {
    setTutors(tutor)
  }, [loading])
  // console.log('tutor',tutors)
  const renderCustomActionButtons = (tutorId: number) => (
    <>
      <Button variant="contained" color="success" >BLOCK</Button>
    </>
  );
  return (
    <>

      <TableComponent data={tutors} loading={loading} customActionButtons={renderCustomActionButtons} />
    </>
  )
}

export default ApproedTutorPage
