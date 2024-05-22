'use client'
import InvoiceCompoent from '@/components/InvoiceComponent/InvoiceCompoent'
import PartnerBookingTabel from '@/components/PartnerComponent/PartnerTable/PartnerBookingTabel'
import { tutorGetAcceptedAllBooking, tutorSendMeetingUrlToUserApi } from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'
import { BookingType } from '@lib/types/types'
import { Pagination } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PartnerRejectedBookingPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [sort, setSort] = useState<string>('-id')
    const [status, setStatus] = useState<string>('')
    const router = useRouter()

    const { data, loading, totalPages } = useBookingFetchData(tutorGetAcceptedAllBooking, currentPage, sort, status)
    const renderInvoice = () => {

        return <InvoiceCompoent />
    }
    function randomID(len: number) {
        let result = '';
        const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
        const maxPos = chars.length;
        len = len || 5;
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }
    const handleCreateMeeting = async (booking: BookingType) => {
        const roomID = randomID(5);
        const meetingLink = `${window.location.protocol}//${window.location.host}/video-call/${roomID}?roomId=${roomID}`;

        // Send meeting link to the user
        const response = await tutorSendMeetingUrlToUserApi({user_id: booking?.user_id,meeting_link: meetingLink});
        if(response.status==200){
            
        }

        router.push(`/video-call/${roomID}?role=host`);
    };
    
    const renderButton = (booking: BookingType) => (
        <>
            <button className='btn btn-success mr-2'> {booking?.payment_status} </button>
            {
                booking?.payment_status == 'Unpaid' &&
                // <Link href={`/video-call/${roomIdToSend}`}>
                // </Link>
                <button className='btn btn-secondary' onClick={() => handleCreateMeeting(booking)} > <i className='fa fa-video'></i> </button>
            }
        </>
    )
    return (
        <>
            <div className="d-flex justify-content-end mt-2">
                <select className="form-select me-2" value={sort} onChange={(e) => setSort(e.target.value)} style={{ maxWidth: '200px' }}>
                    <option value={'-id'}>Sort</option>
                    <option value={'booking_date'}>Earliest Date</option>
                    <option value={'-booking_date'}>Oldest Date</option>
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
