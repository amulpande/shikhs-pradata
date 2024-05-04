'use client'
import { getAllUserDataApi } from '@lib/api/allApi'
import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Pagination } from "@mui/material";

const AdminUserDataPage = () => {
  useEffect(() => {
    getAllUserDataApi({ search: 'h' }).then((response) => {
      const data = response.data.results
      console.log(data)
    }).catch(() => {
      console.error()
    })
  }, [])
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            // value={searchQuery}
            // onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" 
          // onClick={() => fetchData(1)}
          >Search</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="user data table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={100}
        // page={currentPage}
        // onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  )
}

export default AdminUserDataPage
