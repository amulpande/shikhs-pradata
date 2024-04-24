import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/allApi";
 
export const checkUserLogin = createAsyncThunk('user/login', async (data: FormData) => {
    try {
        // console.log('user data are coming', data)
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}user/login/`, data)
        const response = await api.userLoginApi(data)
        // console.log('checkUserLogin  -> ', response.data)
        return response.data.access
    } catch (error) {
        return Promise.reject({ isAuthenticated: false, isError:true });
    }
})
