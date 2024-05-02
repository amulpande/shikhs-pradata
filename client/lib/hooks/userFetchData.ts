// const useFetchData = 
import { AxiosResponse } from "axios";
import { useState,useEffect } from "react";

function useFetchData(api: { (): Promise<AxiosResponse<any, any>>; (): Promise<any>; }){
    const [data,setData]=useState([])
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] = useState('')
    useEffect(()=>{
        api()
        .then((response)=>{
            setData(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
            setError(error)
        })
        console.log(data)
    },[loading])
    return {data,loading,error}
}
export default useFetchData