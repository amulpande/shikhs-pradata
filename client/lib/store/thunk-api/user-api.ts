import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import * as api from "../../api/allApi";

// const axiosWork = axios.create({

// }) 

export const fetchUserProfileApi = createAsyncThunk('user/profile',async(access:any)=>{
    try {
        
        const response = await api.userProfileApi()
        console.log('profile api data here ',response.data)
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
        // console.log('inside fetchuserwithtoken',response.data.user)
        return response.data.user;
    } catch (error) {
        // console.error('Failed to fetch user data:', error);
        // throw error; 
        return rejectWithValue(error.response.data);
    }
});

export const userRegisterationPostApi = async(data:any)=>{
    try {
        const responce = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}user/register/`,data)
        // console.log('user post data',responce)
        return responce
    } catch (error) {
        return 
    }
}

