import axios from "axios";
import { store } from "../store/store";
import { setCookies } from "./cookieStore";

const clearStorage = () => {
	localStorage.removeItem('access_token')
	localStorage.removeItem('refresh_token')
	axiosInstance.defaults.headers['Authorization'] = null
	// window.location.href = '/'
}


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
		// console.log(access_token)
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

		// Preventing infinte loop
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
						setCookies('token',JSON.stringify(auth))
						localStorage.setItem('access_token', response.data.access)
						axiosInstance.defaults.headers['Authorization'] =
							'Bearer ' + response.data.access
						originalRequest.headers['Authorization'] =
							'Bearer ' + response.data.access

						return axiosInstance(originalRequest)
					})
					.catch((err) => {
						console.log(err)
						// clearStorage()
					})
			} else {
				// clearStorage()
			}
		} else {
			// clearStorage()
		}
		// console.log(error)
		return Promise.reject(error)
	}
)
export default axiosInstance;


// import axios from "axios";
// import { store } from "../store/store";
// import { setCookies } from "./cookieStore";

// const clearStorage = () => {
// 	localStorage.removeItem('access_token')
// 	localStorage.removeItem('refresh_token')
// 	axiosInstance.defaults.headers['Authorization'] = null
// 	// window.location.href = '/'
// }

// const handleUnauthorizedRequest = (error) => {
// 	const originalRequest = error.config;

// 	// Preventing infinte loop
// 	if (error?.response?.status === 401 && originalRequest.url === 'user/login/token/verify/') {
// 		localStorage.removeItem('access_token')
// 		localStorage.removeItem('refresh_token')
// 		axiosInstance.defaults.headers['Authorization'] = null
// 		return Promise.reject(error);
// 	}
// 	if (error?.response?.data?.code === 'token_not_valid' && error?.response?.status === 401) {
// 		const refreshToken = localStorage.getItem('refresh_token')
// 		if (refreshToken) {
// 			return axiosInstance.post('user/login/token/refresh/', { refresh: refreshToken })
// 				.then((response) => {
// 					const auth = {
// 						access_token: response.data.access,
// 						refresh_token: response.data.refresh,
// 					}
// 					setCookies('token',JSON.stringify(auth))
// 					localStorage.setItem('access_token', response.data.access)
// 					axiosInstance.defaults.headers['Authorization'] =
// 						'Bearer ' + response.data.access
// 					originalRequest.headers['Authorization'] =
// 						'Bearer ' + response.data.access

// 					return axiosInstance(originalRequest)
// 				})
// 				.catch((err) => {
// 					console.log(err)
// 					clearStorage()
// 				})
// 		} else {
// 			clearStorage()
// 		}
// 	} else {
// 		clearStorage()
// 	}
// 	console.log(error)
// 	return Promise.reject(error)
// }

// const axiosInstance = axios.create({
// 	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
// 	timeout: 60000,
// 	headers: {
// 		'Content-Type': 'multipart/form-data',
// 		accept: 'application/json',
// 	}
// })

// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		const access_token = typeof window!== 'undefined'? localStorage.getItem('access_token') : null;;
// 		// console.log(access_token)
// 		if (access_token) {
// 			config.headers['Authorization'] = `Bearer ${access_token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return handleUnauthorizedRequest(error);
// 	}
// );

// axiosInstance.interceptors.response.use(
// 	(response) => {

// 		return response;
// 	},
// 	(error) => {
// 		return handleUnauthorizedRequest(error);
// 	}
// )
// export default axiosInstance;