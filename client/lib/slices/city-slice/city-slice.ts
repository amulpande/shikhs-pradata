import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCityApi } from "../../api/allApi";

const initialState = {
    cityData: '',
    isLoading: false,
    isError: false
}

export const fetchCityDataApi = createAsyncThunk('admin/city', async () => {
    try {
        const responce = await getCityApi()
        // console.log('city data', responce.data)
        return responce.data
    } catch (error) {

    }
})
const citySlice = createSlice({
    initialState,
    name: 'citySlice',
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCityDataApi.pending, (state, { type, payload }) => {
            state.isLoading = true
            state.cityData = ''
        }),
            builder.addCase(fetchCityDataApi.fulfilled, (state, { type, payload }) => {
                state.cityData = payload
                
                state.isError = false
                state.isLoading = false
            }),
            builder.addCase(fetchCityDataApi.rejected,(state,{type,payload})=>{
                state.isError = true
                state.isLoading = false
                state.cityData = ''
            })
    }
})

export default citySlice.reducer