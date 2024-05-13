import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/allApi";
import { UserLoginType } from "@lib/types/types";
 
export const checkUserLogin = createAsyncThunk('user/login', async (data: UserLoginType) => {
    try {
        const response = await api.userLoginApi(data)
        return response.data.access
    } catch (error) {
        return Promise.reject({ isAuthenticated: false, isError:true });
    }
})
