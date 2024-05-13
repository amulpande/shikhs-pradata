import axios from "axios";
import { BookingType, CityStateType, FetchTutorDataProps, PasswordReseType, TutorProfile, UserBookTutortypes, UserLoginType, UserProfileTypes } from "../types/types";
import axiosInstance from "../utils/axiosInstance";


// All user api
export const userRegisterApi = (formData: FormData) => axiosInstance.post('user/register/', formData)

export const userProfileApi = () =>
    axiosInstance.get('user/profile/')

export const userProfileUpdateApi = (data:UserProfileTypes)=>
    axiosInstance.patch('user/profile/',data)


export const userLoginApi = async (formData: UserLoginType) =>
    axiosInstance.post('user/login/', formData)

export const userResetEmailPasswordApi = (email: string) =>
    axiosInstance.post('user/reset-password/', { email })

export const userPasswordResetApi = (uid: string, token: string, data:PasswordReseType) =>
    axiosInstance.post(`user/reset-password/${uid}/${token}/`, data)

export const userMyBookingOrderApi = () =>
    axiosInstance.get('booking/user/my-order/')

export const userBookTutorApi = (data:UserBookTutortypes) =>
    axiosInstance.post('booking/user/book-tutor/',data=data,{
        headers: {
            'Content-Type': 'application/json',
        }
    })




// All tutor Api
export const tutorRegisterApi = (formData: FormData) =>
    axiosInstance.post('tutor/register/', formData)

export const getAllApprovedTutor = () =>
    axiosInstance.get('admin/all-approved-tutor/')

export const tutorLoginApi = (formData:UserLoginType) =>
    axiosInstance.post('tutor/login/',formData)

export const tutorProfileApi = ()=>
    axiosInstance.get('tutor/profile')

export const tutorGetAllBooking = () =>
    axiosInstance.get('booking/tutor/all-booking-order/')

export const tutorUpdateProfile = (data:TutorProfile)=>
    axiosInstance.patch('tutor/update/',data)


export const tutorGetAcceptedAllBooking = () =>
    axiosInstance.get('booking/tutor/all-accepted-booking-order/')

export const tutorAcceptRejectBokoing = (id:number,data:{status:string}) =>
    axiosInstance.patch(`booking/tutor/booking-status/${id}`,data)

export const tutorAcceptRejectWithReasonBokoing = (id:number,data:{status:string,cancellation_reason:string}) =>
    axiosInstance.patch(`booking/tutor/booking-status/${id}`,data)

// using this api for infinite scroll where user can scroll and get new data rather than going throw pagination
export const getAllApprovedTutorApi = ({page=1,search=''}) =>
    axiosInstance.get(`admin/all-approved-tutor/?page=${page}&search=${search}`)



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




// get tutor by id
export const getTutorDataByidApi = (id:number) =>
    axiosInstance.get(`admin/get-tutor-data/${id}`)

export const getAllOrderBookingApi = () =>
    axiosInstance.get('booking/admin/order-booking')




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
