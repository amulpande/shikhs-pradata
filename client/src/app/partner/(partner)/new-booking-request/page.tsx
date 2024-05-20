'use client'
import PartnerBookingTabel from '@/components/PartnerComponent/PartnerTable/PartnerBookingTabel'
import * as api from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import { BookingType } from '@lib/types/types'
import { Pagination } from '@mui/material'
import { useState } from 'react'

const PartnerNewBookingRequestPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sort, setSort] = useState<string>('-id')
    const [status, setStatus] = useState<string>('')
    const { data, loading,totalPages, acceptRequest, rejectRequest } = useBookingFetchData(api.tutorGetAllBooking, currentPage, sort, status)

    const handleAccept = (id: number) => {
        const isConfirmed = window.confirm('Are you sure')
        if (isConfirmed) {
            acceptRequest(id)
        }
    }

    const handleReject = (id: number) => {
        const isConfirmed = window.confirm('DO YOU WANT REJECT THIS BOOKING?')
        if (isConfirmed) {
            const reason = prompt('Please provide a reason for cancellation:');
            if (reason) {
                rejectRequest(id, reason)
            }
        }
    }
    const renderButton = (booking:BookingType) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => handleAccept(booking?.id)}>ACCEPT</button>
                <button className='btn btn-danger' onClick={() => handleReject(booking?.id)}>REJECT</button>
            </>
        )
    }

    console.log('data from page ', data)
    return (
        <>
            <div className="d-flex justify-content-end mt-2">
                <select className="form-select me-2" value={sort} onChange={(e) => setSort(e.target.value)} style={{ maxWidth: '200px' }}>
                    <option value={'-id'}>Sort</option>
                    <option value={'booking_time'}>Earliest Time</option>
                    <option value={'-booking_time'}>Oldest First</option>
                </select>

            </div>
            <PartnerBookingTabel data={data} loading={loading} customActionButtons={renderButton} />
            <div className='mt-2 d-flex justify-content-center'>
                <Pagination
                    count={totalPages}
                    siblingCount={0}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </div>
        </>
    )
}

export default PartnerNewBookingRequestPage
