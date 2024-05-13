'use server'
import { getAllApprovedTutorApi } from "@lib/api/allApi"
type FetchTutorDataProps = {
    page: number;
    search: string;
}


export const fetchTutorData = async({page,search}:FetchTutorDataProps) =>{
    const response = await getAllApprovedTutorApi({page,search})
    // console.log('data', response.data)
    return response.data
}