'use server'
import { getAllApprovedTutorApi } from "@lib/api/allApi"
import axiosInstance from "./axiosInstance"

export const fetchTutorData = async({page,search}) =>{
    const response = await getAllApprovedTutorApi({page,search})
    console.log('data', response.data)
    return response.data
}