import axios from 'axios';
import store from './store'; // 引入 Vuex store
import {
	host
} from "@/api/url";

// 创建 Axios 实例
const instance = axios.create({
	baseURL: host + '/api',
	timeout: 5000,
});

// 请求拦截器
// instance.interceptors.request.use(
// 	config => {
// 		const token = store.state.token; // 从 Vuex 中获取 token
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`; // 设置 Authorization 头
// 		}
// 		return config;
// 	},
// 	error => Promise.reject(error)
// );
instance.interceptors.request.use(
	(config) => {
		// 获取 Vuex 中的 token
		const accessToken = localStorage.getItem('accessToken') ;
		const refreshToken = localStorage.getItem('refreshToken') ;
		if (accessToken) {
			// 如果有 accessToken，添加到请求头
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}

		if (refreshToken) {
			// 如果有 refreshToken，添加到请求头
			config.headers['X-Authorization'] = refreshToken;
		}
		return config; 
	},
	(error) => {
		return Promise.reject(error);
	}
);


// 响应拦截器
instance.interceptors.response.use(
	response => response,
	error => {
		// 这里可以处理如 token 过期等错误
		return Promise.reject(error);
	}
);

export default instance;