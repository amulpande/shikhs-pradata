import { tutorAcceptRejectBokoing, tutorAcceptRejectWithReasonBokoing } from "@lib/api/allApi";
import { BookingType } from "@lib/types/types";
import { useCallback, useEffect, useState } from "react";

const useBookingFetchData = (api: { ({ page, order_by,status }:{ page: number, order_by: string, status:string }): Promise<any>; }, page: number, order_by: string,status:string) => {
    const [data, setData] = useState<BookingType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    // const [timestamp, setTimestamp] = useState(Date.now())
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalPages, setTotalPages] = useState(1)

    const fetchBookingData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api({ page, order_by,status })
            setTotalCount(response.count)
            const calculatedTotalPages = Math.ceil(response.data.count / 10); // Assuming 10 items per page
            setTotalPages(calculatedTotalPages)
            setData(response.data.results)

        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [api,page,order_by,status])

    useEffect(() => {
        fetchBookingData()
    }, [fetchBookingData])

    const acceptRequest = async (bookindId: number) => {
        setLoading(true)
        try {
            await tutorAcceptRejectBokoing(bookindId, { status: 'Accepted' })

            fetchBookingData()
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
            await fetchBookingData()
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return { data, loading, error, totalCount,totalPages,acceptRequest, rejectRequest }
}

export default useBookingFetchData