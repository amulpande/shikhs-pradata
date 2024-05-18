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


// all rating for tutor
export const ratingTutorApi = () =>
    axiosInstance.get('rating/feedback-tutor/')



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
export const getAllApprovedTutorApi = ({page=1,search='',order_by='-id'}) =>
    axiosInstance.get(`admin/all-approved-tutor/?page=${page}&subjects=${search}&order_by=${order_by}`)



// tutor to get all his/her feedback
export const tutorGetAllFeedback = () =>
    axiosInstance.get('rating/tutor/feedback/')



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

export const postSubjectApi = (data:string) =>
    axiosInstance.post('admin/subject/',{'subject_name':data})

export const updateSubjectApi = (id:number,data:string) =>
    axiosInstance.patch(`admin/subject/${id}`,{'subject_name':data},{
        headers:{
            "Content-Type":'application/json'
        }
    })


// Getting all city data
export const getCityApi = () =>
    axiosInstance.get('admin/city/')

export const deleteCityApi = (id:number) =>
    axiosInstance.delete(`admin/city/${id}`)

// fetching state data from api 
export const adminAddCityApi = (data:CityStateType) =>
    axiosInstance.post('admin/city/',data)

// feedback send by user
export const sendFeedBackApi = (data:any) =>
    axiosInstance.post('rating/feedback-tutor/',data,{
        headers:{"Content-Type":'application/json'}
    })

export const getFeedbackAdminSideApi = () =>
    axiosInstance.get('rating/admin/tutor-feedback/')

export const approvedDisapprovedFeedbackByAdmin = (id:number,data:boolean) => 
    axiosInstance.patch(`rating/admin/tutor-feedback/approve-disapprove/${id}`,{'isApproved':data},{
        headers:{"Content-Type":'application/json'}
    })

export const deleteFeedbackByAdmin = (id:number) =>
    axiosInstance.delete(`rating/admin/tutor-feedback/delete/${id}`)

// Feedback for main page to display
export const getFeedbackForMainPage = () =>
    axiosInstance.get('rating/main/feedback/')




// payment api
export const getPaymentApi = (data:any) =>
    axiosInstance.post('payment/create-checkout-session/',data)

export const getWebHookApi = () =>
    axiosInstance.post('payment/webhook/stripe/')
