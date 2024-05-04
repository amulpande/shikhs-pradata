import { createSlice } from "@reduxjs/toolkit";
import { checkUserLogin } from "../../store/thunk-api/auth-api";
import { cookies } from 'next/headers'
import { useEffect } from "react";
import { clearCookies, getAuthCookies, setCookies, setRoleCookie } from "../../utils/cookieStore";
import { RooState } from "../../store/store";


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
            state.userAccessToken = payload.access
            let auth = {
                access_token: payload.access,
                refresh_token: payload.refresh,
                role:payload.user.role
            }
            setCookies('token',JSON.stringify(auth))
            // console.log('role of user ', auth)
            // const {access_token,refresh_token} = getAuthCookies('token')
            localStorage.setItem('access_token', payload.access)
            localStorage.setItem('refresh_token', payload.refresh)
        },
        authLogout: (state) => {
            state.isAuthenticated = false
            state.userAccessToken = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            clearCookies('token')
            // clearCookies('role')
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
            }),
            builder.addCase(checkUserLogin.rejected, (state, { type, payload }) => {
                state.isAuthenticated = false
                state.isError = true
                state.isPending = false
                state.userAccessToken = null;
            })
    }
})

export const accessToken = (state: RooState) => state.authData.userAccessToken
export const isLoginUser = (state: RooState) => state.authData.isAuthenticated
export const isErrorUser = (state: RooState) => state.authData.isError
export const { authLogout, authLogin } = authSlice.actions
export default authSlice.reducer