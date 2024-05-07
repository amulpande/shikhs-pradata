import { useEffect, useState } from "react";

const useBookingFetchData = <T>(api: { (): Promise<any>; }) =>{
    const [data,setData] = useState<T[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] = useState('')

    useEffect(()=>{
        const fetchBookingData = async()=>{
            setLoading(true);
            try {
                const response = await api()
                setData(response.data)
            } catch (error) {
                setError(error)
            }
        }
        fetchBookingData()
    },[api])
    return {data,loading,error}
}

export default useBookingFetchData