import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api  from "../../api/allApi";

export const tutorApi = createAsyncThunk('all-approved-tutor',async()=>{
    const response = await api.getAllApprovedTutor()
    return response.data
})