'use client'
import { getAllUserDataApi } from '@lib/api/allApi'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Pagination } from "@mui/material";
import { UserDataTypes } from '@lib/types/types';

const AdminUserDataPage = () => {
  const [usersData, setUsersData] = useState<UserDataTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempSearchQuery,setTempSearchQuery] = useState<string>('')
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    setLoading(true)
    getAllUserDataApi({ page: currentPage, search: searchQuery }).then((response) => {
      const data = response.data.results
      const total = response.data.count
      setUsersData(data)
      setLoading(false)
      setTotalPages(Math.ceil(total / 4)) // this will provide total page according to data which will fetch
      console.log(total)
    }).catch(() => {
      console.error('Error while fetching users data')
      setLoading(false)
    })
  }, [currentPage, searchQuery])
  console.log('user ', usersData)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // setTempSearchQuery(searchQuery)
              setSearchQuery(tempSearchQuery)
              setCurrentPage(1)}}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Table aria-label="user data table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Gnder</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ?
            <TableCell>Loading </TableCell>
            : usersData && usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user?.id}</TableCell>
                <TableCell>{user?.first_name + ' ' + user?.last_name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.address}</TableCell>
                <TableCell>{user?.contact}</TableCell>
                <TableCell>{user?.gender}</TableCell>
                <TableCell>{user?.address}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

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

export default AdminUserDataPage
