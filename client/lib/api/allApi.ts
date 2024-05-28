import axios from "axios";
import {  CityStateType, ContactUsType,  PasswordReseType, TutorProfile, UserBookTutortypes, UserLoginType, UserProfileTypes } from "../types/types";
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

export const userMyBookingOrderApi = ({page=1,order_by='-id',status='',page_size=10}) =>
    axiosInstance.get(`booking/user/my-order/?page=${page}&order_by=${order_by}&status=${status}&page_size=${page_size}`)

export const userBookTutorApi = (data:UserBookTutortypes) =>
    axiosInstance.post('booking/user/book-tutor/',data=data,{
        headers: {
            'Content-Type': 'application/json',
        }
    })

export const userCancelBookingOrderApi =  (id:number,data:{usr_cancellation_reason:string})=>
    axiosInstance.patch(`booking/user/cancel-order/${id}`,data)


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

export const tutorGetAllBooking = ({page=1,order_by='-id'}) =>
    axiosInstance.get(`booking/tutor/all-booking-order/?page${page}&order_by=${order_by}`)

export const tutorUpdateProfile = (data:TutorProfile)=>
    axiosInstance.patch('tutor/update/',data)


export const tutorGetAcceptedAllBooking = ({page=1,order_by='-id',status=''}) =>
    axiosInstance.get(`booking/tutor/all-accepted-booking-order/?page${page}&order_by=${order_by}&payment_status=${status}`)

export const tutorAcceptRejectBokoing = (id:number,data:{status:string}) =>
    axiosInstance.patch(`booking/tutor/booking-status/${id}`,data)

export const tutorAcceptRejectWithReasonBokoing = (id:number,data:{status:string,cancellation_reason:string}) =>
    axiosInstance.patch(`booking/tutor/booking-status/${id}`,data)

// using this api for infinite scroll where user can scroll and get new data rather than going throw pagination
export const getAllApprovedTutorApi = ({page=1,search='',order_by='-id',status=''}) =>
    axiosInstance.get(`admin/all-approved-tutor/?page=${page}&subjects=${search}&order_by=${order_by}&status`)



// tutor to get all his/her feedback
export const tutorGetAllFeedback = () =>
    axiosInstance.get('rating/tutor/feedback/')

export const tutorSendMeetingUrlToUserApi = (data:any) =>
    axiosInstance.post('booking/tutor/send-meeting-link/',data)



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

export const adminDeleteUserApi = (id:number,data:{isDeleted:boolean})=>
    axiosInstance.patch(`admin/delete-user/${id}`,data)




// get tutor by id
export const getTutorDataByidApi = (id:number) =>
    axiosInstance.get(`admin/get-tutor-data/${id}`)

export const getAllOrderBookingApi = ({page=1,order_by='-id',status='',page_size=10}:{page?:number,order_by?:string,status:string,page_size:number}) =>
    axiosInstance.get(`booking/admin/order-booking/?page=${page}&order_by=${order_by}&status=${status}&page_size=${page_size}`)






// admin user apis
export const getAllUserDataApi = ({page=1,search=''}: { page?: number, search?: string }) =>
    axiosInstance.get(`admin/get-all-user/?page=${page}&search=${search}`)


// Getting all Subject data 
export const getSubjectsApi = () =>
    axiosInstance.get('admin/subject/')

export const getAdminSubjectsApi = () =>
    axiosInstance.get('admin/subject/admin')

export const postSubjectApi = (data:string) =>
    axiosInstance.post('admin/subject/',{'subject_name':data})

export const updateSubjectApi = (id:number,data:string) =>
    axiosInstance.patch(`admin/subject/${id}`,{'subject_name':data},{
        headers:{
            "Content-Type":'application/json'
        }
    })

export const disableSubjectByAdminApi = (id:number)=>
    axiosInstance.put(`admin/subject/disable/${id}`)

export const enableSubjectByAdminApi = (id:number)=>
    axiosInstance.put(`admin/subject/enable/${id}`)

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

export const getAdminTotalEarningApi = ()  =>
    axiosInstance.get('payment/admin/total-earning/')

export const getTutorAllTotalngApi = () =>
    axiosInstance.get('payment/tutor/total-earning/')

export const getAllPaymentDataForTutor = ({page}:{page:number}) =>
    axiosInstance.get(`payment/tutor/all-payment/?page=${page}`)

export const getAllPaymentDataForAdmin = ({page}:{page:number}) =>
    axiosInstance.get(`payment/admin/all-payment/?page=${page}`)



// contact us apis
export const postContactUsApi = (data:ContactUsType) =>
    axiosInstance.post('contact/create-contact-us/',data,{
        headers:{
            'Content-Type':'application/json'
        }
    })


export const getContactUsApi = ({page}:{page:number}) =>
    axiosInstance.get(`contact/create-contact-us/?page=${page}`)

export const deleteContactUsByAdminApi = (id:number) => 
    axiosInstance.delete(`contact/contact-us-details/${id}`)