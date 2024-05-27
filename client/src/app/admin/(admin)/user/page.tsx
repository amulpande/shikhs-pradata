'use client'
import {  getAllUserDataApi } from '@lib/api/allApi'
import React, {  useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Pagination } from "@mui/material";
import useUserFetch from '@lib/hooks/useUserFetch';
import { CldImage } from 'next-cloudinary';

const AdminUserDataPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempSearchQuery, setTempSearchQuery] = useState<string>('')

  const { data: usersData, loading, totalCount, totalPages, deleteUser } = useUserFetch(getAllUserDataApi, currentPage, searchQuery)
  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm('Are you about deleting this user?')
    if (isConfirmed) {
      try {
        await deleteUser(id)
      } catch (error) {
        console.error('Not abe to delete ', error)
      }
    }
  }

  return (
    <div>
      <div className="container full-width" style={{ width: '100%', marginTop: -25 }}>
        <div className="row">
          <div className="col-md-12">
            <div className="container mt-2">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={tempSearchQuery}
                    onChange={(e) => setTempSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setSearchQuery(tempSearchQuery);
                      setCurrentPage(1);
                    }}
                  >
                    <i className='fa fa-search'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card mt-2">
              {/* <div className="card-header">
                <h4>USER</h4>
              </div> */}
              <div className='card'>

                <div style={{ overflowX: 'auto' }}>
                  <Table aria-label="user data table">
                    <TableHead className='card-header'>
                      <TableRow>
                        <TableCell>Profile</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ?
                        <TableRow>
                          <TableCell>Loading </TableCell>
                        </TableRow>
                        : usersData && usersData.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell><CldImage src={user?.profile_image || ''} width={50} height={50} alt='profile'/></TableCell>
                            <TableCell>{user?.first_name + ' ' + user?.last_name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.address}</TableCell>
                            <TableCell>{user?.contact}</TableCell>
                            <TableCell>{user?.gender}</TableCell>
                            <TableCell><Button  variant='contained' onClick={() => handleDelete(user?.id)}><i className='fa fa-trash'></i></Button></TableCell>

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
      <div className='mt-2 d-flex justify-content-center'>
        <Pagination
          count={totalPages}
          siblingCount={0}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </div>
      {/* <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => { setCurrentPage(page) }}
        variant="outlined"
        shape="rounded"
      /> */}

    </div>
  )
}

export default AdminUserDataPage
