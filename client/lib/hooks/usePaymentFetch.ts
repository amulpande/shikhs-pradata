import { PyamentType } from "@lib/types/types";
import { useState, useEffect, useCallback } from "react"

function usePaymentFetch(api: { ({ page,paymentDate}: { page: number,paymentDate:string }): Promise<any>; }, page: number,paymentDate:string=''){
    const [data,setData] = useState<PyamentType[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [totalPages, setTotalPages] = useState(1)
    const [error, setError] = useState('')

    const fetchData = useCallback(async()=>{
        try {
            const response = await api({page,paymentDate})
            setData(response.data.results)
            setTotalCount(response.data.count)
            const calculatedTotalPages = Math.ceil(response.data.count / 5) // 5 data per page will displaying
            setTotalPages(calculatedTotalPages)
        } catch (error:any) {
            // Handle error
            setError(error)
        }finally {
            setLoading(false);
        }
    },[api,page,paymentDate])

    useEffect(()=>{
        fetchData()
    },[fetchData])

    return {data,loading,error,totalCount,totalPages}
}

export default usePaymentFetch