import axios from "axios";
import { store } from "../store/store";
 

// const state = store?.getState()?.authData?.userAccessToken; // Get the Redux state
// const accessToken = state.authData.userAccessToken || null ;
// console.log('accesstoken aa raha ahi',accessToken)

const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
// console.log('jjsdds ',access_token)
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 60000,
	headers: {
		Authorization: access_token ? `Bearer ${access_token}` || null : null,
	} 
})
export default axiosInstance;