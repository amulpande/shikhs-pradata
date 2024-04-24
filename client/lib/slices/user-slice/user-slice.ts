import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUserDataUsingToken, fetchUserProfileApi } from "../../store/thunk-api/user-api";
import { RooState } from "../../store/store";
// import { fetchUserDataUsingToken } from "../../store/api/user-api";
// fetchUserDataUsingToken


interface UserData {
    id: number;
    first_name: string;
    email: string;
    last_name: string;
    role: number;
    contact: number;
    profile_image: string;
    gender: string;
    address: string;

}

interface UserState {
    user: UserData[];
    isLoading: boolean;
    error?: string  | any; // Optional error state for handling errors
}
const initialState: UserState = {
    user: [],
    isLoading: false,
}

 
const userSlice = createSlice({
    initialState,
    name: 'userSlice', 
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfileApi.pending,(state,{type,payload})=>{
            state.isLoading = true
        }),
        builder.addCase(fetchUserProfileApi.fulfilled, (state,{type,payload})=>{
            state.user = payload
            state.isLoading = false
            // state.error
        }),
        builder.addCase(fetchUserProfileApi.rejected,(state,{type,payload})=>{
            state.user = []
            state.isLoading = false
            state.error = payload
        })
        builder.addCase(fetchUserDataUsingToken.pending, (state, { type, payload }) => {
            state.isLoading = true
        }),
            builder.addCase(fetchUserDataUsingToken.fulfilled, (state, { type, payload }) => {
                
                state.user = payload
                state.isLoading = false
            }),
            builder.addCase(fetchUserDataUsingToken.rejected, (state) => {
                state.isLoading = false;
                state.user = [];
            });
    }
})

export const userProfileData = (state: RooState) => state.userData.user
export const isLoadingState = (state: RooState) => state.userData.isLoading
export default userSlice.reducer