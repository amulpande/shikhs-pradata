import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import * as api from "../../api/allApi";

// const axiosWork = axios.create({

// }) 

export const fetchUserProfileApi = createAsyncThunk('user/profile',async(access:any)=>{
    try {
        
        const response = await api.userProfileApi()
        return response.data
    } catch (error) {
        
    }
})

//fetching user data using user token
export const fetchUserDataUsingToken = createAsyncThunk('fetchUserDataUsingToken', async (userAccessToken: string,{ rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}user/profile/`, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
        }
    );
        return response.data.user;
    } catch (error:any) {
        return rejectWithValue(error.response.data);
    }
});

export const userRegisterationPostApi = async(data:any)=>{
    try {
        const responce = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}user/register/`,data)
        return responce
    } catch (error) {
        return 
    }
}

