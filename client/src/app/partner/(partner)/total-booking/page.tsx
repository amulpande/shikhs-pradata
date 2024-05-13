'use client'
import InvoiceCompoent from '@/components/InvoiceComponent/InvoiceCompoent'
import PartnerBookingTabel from '@/components/PartnerComponent/PartnerTable/PartnerBookingTabel'
import { tutorGetAcceptedAllBooking } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import React, { useState } from 'react'

const PartnerRejectedBookingPage = () => {

    const {data,loading} = useBookingFetchData(tutorGetAcceptedAllBooking)
    const renderInvoice = () =>{

        return <InvoiceCompoent/>
    }
    
    const renderButton = () =>(
        <button className='btn btn-success' onClick={()=>renderInvoice()}> INVOICE </button>
        // <button className='btn btn-success'> INVOICE </button>
    )
    return (
        <>
            <div className='card'>
                <h3 >
                    TOTAL BOOKING
                </h3>
            </div>
            <PartnerBookingTabel data={data} loading={loading} customActionButtons={renderButton} />
            <InvoiceCompoent/>
        </>
    )
}

export default PartnerRejectedBookingPage
