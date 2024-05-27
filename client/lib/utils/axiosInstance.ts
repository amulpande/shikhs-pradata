import axios from "axios";
import { setCookies, getAuthCookies } from "./cookieStore";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 60000,
	headers: {
		'Content-Type': 'multipart/form-data',
		accept: 'application/json',
	}
})
axiosInstance.interceptors.request.use(
	(config) => {
		const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;;
		if (access_token) {
			config.headers['Authorization'] = `Bearer ${access_token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {

		return response;
	},
	(error) => {
		const originalRequest = error.config;

		if (error?.response?.status === 401 && originalRequest.url === 'user/login/token/verify/') {
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			axiosInstance.defaults.headers['Authorization'] = null
			return Promise.reject(error);
		}
		if (error?.response?.data?.code === 'token_not_valid' && error?.response?.status === 401) {
			const refreshToken = localStorage.getItem('refresh_token')
			if (refreshToken) {

				return axiosInstance.post('user/login/token/refresh/', { refresh: refreshToken })
					.then((response) => {
						const auth = {
							access_token: response.data.access,
							refresh_token: response.data.refresh,
						}
						setCookies('token', JSON.stringify(auth))
						localStorage.setItem('access_token', response.data.access)
						axiosInstance.defaults.headers['Authorization'] =
							'Bearer ' + response.data.access
						originalRequest.headers['Authorization'] =
							'Bearer ' + response.data.access

						return axiosInstance(originalRequest)
					})
					.catch((err) => {

					})
			}
		}
		return Promise.reject(error)
	}
)
export default axiosInstance;
