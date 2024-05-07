'use client'
import React from 'react'
import { Table, Button, TableBody, TableCell, TableHead, TableRow, Avatar, TableContainer, Grid, makeStyles } from '@mui/material';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { TutorType } from '../../../../lib/types/types';
import Link from 'next/link';


const TableComponent = ({ data, loading, customActionButtons }) => {
  // console.log('data from table component ', data?.data)
  // console.log('loading', loading)
  return (
    <Grid container spacing={5}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>IMAGE</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell align="center">EMAIL</TableCell>
            <TableCell align="center">ABOUT</TableCell>
            <TableCell align="center">EXP</TableCell>
            <TableCell align="center">SUBJECT</TableCell>
            <TableCell align="center">CITY</TableCell>
            <TableCell align="center">CONTACT</TableCell>
            <TableCell align="center">VIEW</TableCell>
            <TableCell align="center">STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (data?.map((row: TutorType, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Image src={row?.profile_image ? row?.profile_image : '/assets/images/logo/profileuser.png'} alt={`${row.first_name} ${row.last_name}`} width={70} height={70} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.first_name.toUpperCase() + ' ' + row?.last_name.toUpperCase()}
              </TableCell>
              <TableCell align="center">{row?.email}</TableCell>
              <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>{row?.short_bio}</TableCell>
              <TableCell align="center">{row?.experience}</TableCell>
              <TableCell align="center">{row?.subjects_name}</TableCell>
              <TableCell align="center">{row?.city_name}</TableCell>
              <TableCell align="center">{row?.contact}</TableCell>
              <TableCell align="center">
                <Link href={`/admin/view-tutor/${row?.id}`}>

                  <Button variant="contained" color="inherit" onClick={() => {
                    // router.push(`/tutors/${row?.id}`)
                  }}>VIEW</Button>
                </Link>
              </TableCell>
              <TableCell align="center" sx={{ gap: '8px', padding: '5px' }}>

                {/* {children}  */}
                {customActionButtons(row?.id)}
              </TableCell>
            </TableRow>
          ))) : <p>No Data</p>}
        </TableBody>
      </Table>
    </Grid>
  )
}

export default TableComponent

