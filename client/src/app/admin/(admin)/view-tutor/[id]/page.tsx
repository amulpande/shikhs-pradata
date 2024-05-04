'use client'
import React, { useEffect, useState } from 'react'
// import { ParamIdType } from '../../../../../../lib/types/types'
// import { ParamIdType } from 'lib/types/types'
import { ParamIdType, TutorType } from '@lib/types/types'
import { getTutorDataByidApi } from '@lib/api/allApi'
import useTutorFetchData from '@lib/hooks/useTutorFetchData'
import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material';

const ViewTutorByIdPage: React.FC<ParamIdType> = ({ params }) => {
  const id = params.id
  console.log('id ', id)
  const [tutorData, setTutorData] = useState<TutorType>()
  const [loading, setLoading] = useState<boolean>(true)
  // useEffect
  useEffect(() => {
    getTutorDataByidApi(id).then((response) => {
      console.log('response ', response.data)
      setTutorData(response.data)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    })
  }, [id])
  // getTutorDataByidApi(id)
  // useTutorFetchData()
  console.log(tutorData)
  return (
    <div>
      {/* <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Avatar alt="Profile Image" src={`${tutorData?.profile_image}`}  sx={{ width: 100, height: 100, margin: '0 auto' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h4">{tutorData?.first_name + ' ' +tutorData?.last_name}</Typography>
        <Typography variant="h4">Email: {tutorData?.email} </Typography>
        <Typography variant="body1">Contact:</Typography>
        <Typography variant="body1">Address: </Typography>
        <Typography variant="body1">Price: </Typography>
        
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Approve</Button>
          <Button variant="contained" color="error">Block</Button>
        </Box>
      </Grid>
    </Grid> */}
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
              <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>Approve</Button>
              <Button variant="contained" color="error">Block</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ViewTutorByIdPage
