'use client'
import React from 'react'
import { Table, Button, TableBody, TableCell, TableHead, TableRow, Avatar, TableContainer, Grid, makeStyles } from '@mui/material';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { TutorType } from '@lib/types/types';
import Link from 'next/link';

interface PropsType{
  data : TutorType[],
  loading : boolean,
  customActionButtons : (id: number,tutorName:string) => React.ReactNode
}

const TableComponent = ({ data, loading, customActionButtons }:PropsType) => {
  return (


    <div className='card'>
      <Grid container>
        <Table >
          <TableHead className='card-header'>
            <TableRow>
              <TableCell> <strong>IMAGE</strong></TableCell>
              <TableCell><strong>NAME</strong></TableCell>
              <TableCell align="center"><strong>EMAIL</strong></TableCell>
              <TableCell align="center"><strong>ABOUT</strong></TableCell>
              <TableCell align="center"><strong>EXP</strong></TableCell>
              <TableCell align="center"><strong>SUBJECT</strong></TableCell>
              <TableCell align="center"><strong>CITY</strong></TableCell>
              <TableCell align="center"><strong>CONTACT</strong></TableCell>
              <TableCell align="center"><strong>VIEW</strong></TableCell>
              <TableCell align="center"><strong>STATUS</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className=''>
            {Array.isArray(data) && data.length > 0 ? (data?.map((row: TutorType, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Image src={row?.profile_image ? row?.profile_image : '/assets/images/logo/profileuser.png'} alt={`${row.first_name} ${row.last_name}`} width={70} height={70} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.first_name.toUpperCase() + ' ' + row?.last_name.toUpperCase()}
                </TableCell>
                <TableCell align="center">{row?.email}</TableCell>
                <TableCell align="center" >{row?.short_bio}</TableCell>
                <TableCell align="center">{row?.experience}</TableCell>
                <TableCell align="center">{row?.subjects_name}</TableCell>
                <TableCell align="center">{row?.city_name}</TableCell>
                <TableCell align="center">{row?.contact}</TableCell>
                <TableCell align="center">
                  <Link href={`/admin/view-tutor/${row?.id}`}>

                    <Button variant="contained" color="inherit" onClick={() => {

                    }}><i className="fa fa-eye" aria-hidden="true"></i></Button>
                  </Link>
                </TableCell>
                <TableCell align="center" sx={{ gap: '8px', padding: '5px' }}>

                  {/* {children}  */}
                  {customActionButtons(row?.id, row?.first_name + ' ' + row?.last_name)}
                </TableCell>
              </TableRow>
            ))) : <p>No Data</p>}
          </TableBody>
        </Table>
      </Grid>
    </div>

  )
}

export default TableComponent

