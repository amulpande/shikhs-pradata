'use client'
import InvoiceCompoent from '@/components/InvoiceComponent/InvoiceCompoent'
import PartnerBookingTabel from '@/components/PartnerComponent/PartnerTable/PartnerBookingTabel'
import { tutorGetAcceptedAllBooking } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import { BookingType } from '@lib/types/types'
import { Pagination } from '@mui/material'
import React, { useState } from 'react'

const PartnerRejectedBookingPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sort, setSort] = useState<string>('-id')
    const [status, setStatus] = useState<string>('')

    const { data, loading, totalPages } = useBookingFetchData(tutorGetAcceptedAllBooking, currentPage, sort, status)
    const renderInvoice = () => {

        return <InvoiceCompoent />
    }

    const renderButton = (booking:BookingType) => (
        <button className='btn btn-success' onClick={() => renderInvoice()}> {booking?.payment_status} </button>
        // <button className='btn btn-success'> INVOICE </button>
    )
    return (
        <>
            <div className="d-flex justify-content-end mt-2">
                <select className="form-select me-2" value={sort} onChange={(e) => setSort(e.target.value)} style={{ maxWidth: '200px' }}>
                    <option value={'-id'}>Sort</option>
                    <option value={'order_date'}>Earliest Date</option>
                    <option value={'-order_date'}>Oldest Date</option>
                </select>
                <select className="form-select me-2" value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: '200px' }}>
                    <option value={''}>Filter</option>
                    <option value={'Unpaid'}>Unpaid</option>
                    <option value={'Paid'}>Paid</option>
                </select>
            </div>
            <div>
                <PartnerBookingTabel data={data} loading={loading} customActionButtons={renderButton} />
            </div>
            <div className='mt-2 d-flex justify-content-center'>
                <Pagination
                    count={totalPages}
                    siblingCount={0}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </div>
            {/* <InvoiceCompoent/> */}
        </>
    )
}

export default PartnerRejectedBookingPage
