import { createSlice } from "@reduxjs/toolkit";
import { tutorApi } from "../../store/thunk-api/tutor-api";
import { RooState } from "../../store/store";
import { TutorType } from "@lib/types/types";

interface initialStateType{
    tutor:TutorType[],
    status:string,
    error:string | null | undefined
}

const initialState:initialStateType = {
    tutor: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', or 'failed'
    error: null,
}

const tutorSlice = createSlice({
    name: "tutor",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(tutorApi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(tutorApi.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tutor = action.payload;
            })
            .addCase(tutorApi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})
export const selectTutorById = (state:RooState, tutorId:number) => {
    console.log('selevt tutor',state.tutorData.tutor.filter(tutor => tutor.id == tutorId))
    return state.tutorData.tutor.filter(tutor => tutor.id == tutorId)[0];
};
export default tutorSlice.reducer