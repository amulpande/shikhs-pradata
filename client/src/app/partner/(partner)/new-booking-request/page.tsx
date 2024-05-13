'use client'
import PartnerBookingTabel from '@/components/PartnerComponent/PartnerTable/PartnerBookingTabel'
import * as api from '@lib/api/allApi'
import useBookingFetchData from '@lib/hooks/useBookingFetchData'

const PartnerNewBookingRequestPage = () => {
    const { data, loading, acceptRequest,rejectRequest } = useBookingFetchData(api.tutorGetAllBooking)

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
            if(reason){
                rejectRequest(id,reason)
            } 
        }
    }
    const renderButton = (id: number) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => handleAccept(id)}>ACCEPT</button>
                <button className='btn btn-danger' onClick={() => handleReject(id)}>REJECT</button>
            </>
        )
    }

    console.log('data from page ', data)
    return (
        <>
            <PartnerBookingTabel data={data} loading={loading} customActionButtons={renderButton} />
        </>
    )
}

export default PartnerNewBookingRequestPage
