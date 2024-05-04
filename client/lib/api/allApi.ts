import axios from "axios";
import { CityStateType, PasswordReseType, UserLoginType } from "../types/types";
import axiosInstance from "../utils/axiosInstance";


// All user api
export const userRegisterApi = (formData: FormData) => axiosInstance.post('user/register/', formData)


export const userProfileApi = () =>
    axiosInstance.get('user/profile/')


export const userLoginApi = async (formData: UserLoginType) =>
    axiosInstance.post('user/login/', formData)

export const userResetEmailPasswordApi = (email: string) =>
    axiosInstance.post('user/reset-password/', { email })

export const userPasswordResetApi = (uid: string, token: string, data:PasswordReseType) =>
    axiosInstance.post(`user/reset-password/${uid}/${token}/`, data)

export const userMyBookingOrderApi = () =>
    axiosInstance.get('booking/user/my-order/')


// All tutor Api
export const tutorRegisterApi = (formData: FormData) =>
    axiosInstance.post('tutor/register/', formData)

export const getAllApprovedTutor = () =>
    axiosInstance.get('admin/all-approved-tutor/')



// All admin api here 
export const adminLoginApi = (data:UserLoginType) =>
    axiosInstance.post('admin/login/',data)

export const adminNotApprovedTutorApi = ()=>
    axiosInstance.get('admin/all-not-approved-tutor/')

export const adminApprovBlockTutorRequestApi = (id:number,data:{tutor_approve:boolean}) =>
    axiosInstance.patch(`admin/approve-tutor/${id}`,data)

export const getAdminAllBlockedTutorApi = () =>
    axiosInstance.get('admin/all-blocked-tutor/') 

export const adminBlockedUnblockedTutor = (id:number,data:{user_blocked:boolean}) =>
    axiosInstance.patch(`admin/blocked-unblocked-tutor/${id}`,data)

export const getTutorDataByidApi = (id:number) =>
    axiosInstance.get(`admin/get-tutor-data/${id}`)

// admin user apis
export const getAllUserDataApi = ({page=1,search=''}: { page?: number, search?: string }) =>
    axiosInstance.get(`admin/get-all-user/?page=${page}&search=${search}`)
// Getting all Subject data 
export const getSubjectsApi = () =>
    axiosInstance.get('admin/subject/')



// Getting all city data
export const getCityApi = () =>
    axiosInstance.get('admin/city/')

export const deleteCityApi = (id:number) =>
    axiosInstance.delete(`admin/city/${id}`)

// fetching state data from api 
export const adminAddCityApi = (data:CityStateType) =>
    axiosInstance.post('admin/city/',data)
