import axiosInstance from "../utils/axiosInstance";


// All user api
export const userRegisterApi = (formData: FormData) => axiosInstance.post('user/register/', formData)


export const userProfileApi = () =>
    axiosInstance.get('user/profile/')

export const userLoginApi = async (formData) =>
    axiosInstance.post('user/login/', formData)

export const userResetEmailPasswordApi = (email:string) =>
    axiosInstance.post('user/reset-password/',{email})

export const userPasswordResetApi = (uid: string, token: string, data) =>
    axiosInstance.post(`user/reset-password/${uid}/${token}/`, data)



// All tutor Api
export const tutorRegisterApi = (formData: FormData) => 
    axiosInstance.post('tutor/register/', formData)



// Getting all Subject data 
export const getSubjectsApi = () =>
    axiosInstance.get('admin/subject/')



// Getting all city data
export const getCityApi = () =>
    axiosInstance.get('admin/city/')
