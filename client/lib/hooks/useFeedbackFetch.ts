import { approvedDisapprovedFeedbackByAdmin, deleteFeedbackByAdmin } from "@lib/api/allApi"
import { AdminFeedbackTypes } from "@lib/types/types"
import { useCallback, useEffect, useState } from "react"

function useFeedbackFetch(api: { (): Promise<any> }) {

    const [data, setData] = useState<AdminFeedbackTypes[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const fetchFeedBack = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api()
            setData(response.data)

        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [api])

    useEffect(() => {
        fetchFeedBack()
    }, [fetchFeedBack])

    const approvedFeedback = async (id: number) => {
        setLoading(true);
        try {
            await approvedDisapprovedFeedbackByAdmin(id, true)
            await fetchFeedBack()
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const dissApprovedFeedback = async (id: number) => {
        setLoading(true);
        try {
            await approvedDisapprovedFeedbackByAdmin(id, false)
            await fetchFeedBack()
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteFeedback = async (id: number) => {
        setLoading(true);
        try {
            await deleteFeedbackByAdmin(id)
            await fetchFeedBack()
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data,loading, approvedFeedback, dissApprovedFeedback,deleteFeedback }

}

export default useFeedbackFetch