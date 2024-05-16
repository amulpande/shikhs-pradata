'use server'
import { getAllApprovedTutorApi } from "@lib/api/allApi"
type FetchTutorDataProps = {
    page: number;
    search: string;
    order_by:string
}


export const fetchTutorData = async({page,search,order_by}:FetchTutorDataProps) =>{
    const response = await getAllApprovedTutorApi({page,search,order_by})
    // console.log('data', response.data)
    return response.data
}