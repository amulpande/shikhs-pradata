import { tutorAcceptRejectBokoing, tutorAcceptRejectWithReasonBokoing } from "@lib/api/allApi";
import { BookingType } from "@lib/types/types";
import { useCallback, useEffect, useState } from "react";

const useBookingFetchData = (api: { (): Promise<any>; }) => {
    const [data, setData] = useState<BookingType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    // const [timestamp, setTimestamp] = useState(Date.now())

    const fetchBookingData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api()
            console.log('console response ', response)
            setData(response.data)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [api])

    useEffect(() => {
        fetchBookingData()
    }, [fetchBookingData])

    const acceptRequest = async (bookindId: number) => {
        setLoading(true)
        try {
            await tutorAcceptRejectBokoing(bookindId, { status: 'Accepted' })

            fetchBookingData()
            console.log('data from custom hook', data)
            // setData(data.data)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const rejectRequest = async (bookngId: number, reason: string) => {
        setLoading(true)
        try {
            await tutorAcceptRejectWithReasonBokoing(bookngId, { status: 'Rejected', cancellation_reason: reason })
            console.log('object')
            await fetchBookingData()
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return { data, loading, error, acceptRequest, rejectRequest }
}

export default useBookingFetchData