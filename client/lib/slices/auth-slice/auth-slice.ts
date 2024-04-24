import { createSlice } from "@reduxjs/toolkit";
import { checkUserLogin } from "../../store/thunk-api/auth-api";
import { cookies } from 'next/headers'
import { useEffect } from "react";

interface AuthState {
    isAuthenticated: boolean;
    isPending: boolean;
    isError: boolean;
    userAccessToken: string | null;
}
const initialState: AuthState = {
    isAuthenticated: false,
    isPending: false,
    isError: false,
    userAccessToken: null
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        authLogin: (state, { type, payload }) => {
            state.isAuthenticated = true
            console.log('payload from auth slice ', payload)
            state.userAccessToken = payload
            localStorage.setItem('access_token', payload)
        },
        authLogout: (state) => {
            // console.log('state null hua hai ')
            state.isAuthenticated = false
            state.userAccessToken = null
            // destroyCookie(null, 'userAccessToken');
            localStorage.removeItem('access_token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkUserLogin.pending, (state, { type, payload }) => {
            state.isPending = true
            state.isError = false
        }),
            builder.addCase(checkUserLogin.fulfilled, (state, { type, payload }) => {
                state.isAuthenticated = true
                state.isError = false,
                    state.isPending = false
                state.userAccessToken = payload
                localStorage.setItem('access_token', payload)
                // localStorage.setItem('refresh_token',payload)

            }),
            builder.addCase(checkUserLogin.rejected, (state, { type, payload }) => {
                state.isAuthenticated = false
                state.isError = true
                state.isPending = false
                state.userAccessToken = null;
            })
    }
})

export const accessToken = (state: any) => state.authData.userAccessToken
export const isLoginUser = (state: any) => state.authData.isAuthenticated
export const isErrorUser = (state: any) => state.authData.isError
export const { authLogout, authLogin } = authSlice.actions
export default authSlice.reducer