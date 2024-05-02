import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authPersistConfig } from "./persist-config";
import userSlice from "../slices/user-slice/user-slice";
import authSlice from "../slices/auth-slice/auth-slice";
import citySlice from "../slices/city-slice/city-slice";
import subjectSlice from "../slices/subject-slice/subject-slice";
import tutorSlice from "../slices/tutor-slice/tutor-slice";


export const rootReducer = combineReducers({
    userData : userSlice,
    authData : persistReducer(authPersistConfig,authSlice),
    cityData : citySlice,
    subjectData : subjectSlice,
    tutorData : tutorSlice,
})