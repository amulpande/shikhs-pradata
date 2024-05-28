'use client'
import React, { useEffect, useState } from 'react'
// import { ParamIdType } from '../../../../../../lib/types/types'
// import { ParamIdType } from 'lib/types/types'
import { ParamIdType, TutorType } from '@lib/types/types'
import { getTutorDataByidApi } from '@lib/api/allApi'
import useTutorFetchData from '@lib/hooks/useTutorFetchData'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ViewTutorByIdPage: React.FC<ParamIdType> = ({ params }) => {
  const id = params.id
  const [tutorData, setTutorData] = useState<TutorType>()
  const [loading, setLoading] = useState<boolean>(true)
  const  router = useRouter()
  // useEffect
  useEffect(() => {
    getTutorDataByidApi(id).then((response) => {
      setTutorData(response.data)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    })
  }, [id])
  return (
    <div>
      <Paper elevation={10} sx={{ padding: 2, maxWidth: 900, margin: 'auto', marginTop: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="Profile Image" src={tutorData?.profile_image} sx={{ width: 100, height: 100 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>{tutorData?.first_name}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Email: {tutorData?.email}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Contact: {tutorData?.contact}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Address: {tutorData?.address}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Price: {tutorData?.price}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Address: {tutorData?.address}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Price: {tutorData?.dob}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Address: {tutorData?.address}</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>Price: {tutorData?.price}</Typography>

          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              {/* <Link href={"/admin/approved-tutor"}> */}
                <Button variant="contained" color="error" onClick={()=>router.back()}>Back</Button>
              {/* </Link> */}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ViewTutorByIdPage
