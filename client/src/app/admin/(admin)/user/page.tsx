'use client'
import { getAllUserDataApi } from '@lib/api/allApi'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Pagination } from "@mui/material";
import { UserDataTypes } from '@lib/types/types';

const AdminUserDataPage = () => {
  const [usersData, setUsersData] = useState<UserDataTypes[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    setLoading(true)
    getAllUserDataApi({ page: currentPage, search: searchQuery }).then((response) => {

      const data = response.data.results
      const total = response.data.count
      setUsersData(data)
      setLoading(false)
      setTotalPages(Math.ceil(total / 10)) // this will provide total page according to data which will fetch
    }).catch(() => {
      console.error('Error while fetching users data')
      setLoading(false)
    })
  }, [currentPage, searchQuery])
  // console.log('user ', usersData)

  return (
    <div>
      <div className="container full-width" style={{ width: '100%', marginTop: -25 }}>
        <div className="row">
          <div className="col-md-12">
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={tempSearchQuery}
                  onChange={(e) => setTempSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // setTempSearchQuery(searchQuery)
                    setSearchQuery(tempSearchQuery)
                    setCurrentPage(1)
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <div className="card mt-2">
              <div className="card-header">
                <h4>USER</h4>
              </div>
              <div className='card'>

                <div style={{ overflowX: 'auto' }}>
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
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
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
