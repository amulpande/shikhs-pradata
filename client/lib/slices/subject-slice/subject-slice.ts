import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import * as api from "../../api/allApi";

const initialState = {
    subjects: [],
    isError: '',
    isPending: false
}

export const fetchSubjectApi = createAsyncThunk('admin/subject/', async () => {
    try {
        const response = await api.getSubjectsApi()
        return response.data
    } catch (error) {

    }
})

const subjectSlice = createSlice({
    initialState,
    name: 'subjectSlice',
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(fetchSubjectApi.pending,(state,{type,payload})=>{
            state.isPending = true 
        }),
        builder.addCase(fetchSubjectApi.fulfilled, (state,{type,payload})=>{
            state.subjects = payload
            state.isPending = false
        }),
        builder.addCase(fetchSubjectApi.rejected,(state,{type,payload}:any)=>{
            state.isError = payload
        })
    }
})

export default subjectSlice.reducer