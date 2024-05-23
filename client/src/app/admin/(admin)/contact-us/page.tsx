'use client'
import { TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { CldImage } from 'next-cloudinary';
import React, { useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import loading from '../loading';
import useContactUsFecth from '@lib/hooks/useContactUsFetch';
import { getContactUsApi } from '@lib/api/allApi';

const AdminContactUsPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const [searchQuery, setSearchQuery] = useState<string>('');
    const [tempSearchQuery, setTempSearchQuery] = useState<string>('')
    const { data: contactData, loading, totalPages, deleteContact } = useContactUsFecth(getContactUsApi, currentPage)
    return (
        <>
            <div>
                <div className="container full-width" style={{ width: '100%', marginTop: -25 }}>
                    <div className="row">
                        <div className="col-md-12">
                            {/* <div className="container mt-2">
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
                            </div> */}
                            <div className="card mt-2">

                                <div className='card'>

                                    <div style={{ overflowX: 'auto' }}>
                                        <Table aria-label="user data table ">
                                            <TableHead className='card-header'>
                                                <TableRow>
                                                    {/* <TableCell>Profile</TableCell> */}
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Contact</TableCell>
                                                    <TableCell>Message</TableCell>
                                                    {/* <TableCell>Gender</TableCell> */}
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {loading ?
                                                    <TableRow>
                                                        <TableCell>Loading </TableCell>
                                                    </TableRow>
                                                    : contactData && contactData.map((contact) => (
                                                        <TableRow key={contact.id}>
                                                            {/* <TableCell><CldImage src={contact?. || ''} width={50} height={50} alt='profile' /></TableCell> */}
                                                            {/* <TableCell>{contact?. + ' ' + contact?.}</TableCell> */}
                                                            <TableCell>{contact?.name}</TableCell>
                                                            <TableCell>{contact?.email}</TableCell>
                                                            <TableCell>{contact?.contact}</TableCell>
                                                            <TableCell>{contact?.message}</TableCell>
                                                            <TableCell><Button variant='contained' className='btn btn-danger' onClick={() => {
                                                                const isConfirmed = window.confirm('Are you sure?')
                                                                if(isConfirmed){
                                                                    deleteContact(contact?.id)
                                                                }
                                                            }}><i className='fa fa-trash'></i></Button></TableCell>
                                                            {/* <TableCell><Button variant='contained' className='btn btn-danger'><i className='fa fa-trash'></i></Button></TableCell> */}

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
        </>
    )
}

export default AdminContactUsPage
