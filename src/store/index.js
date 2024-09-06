import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token') || '',
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: localStorage.getItem('refreshToken') || '',
		userInfo: {}, // 存储用户信息
		selectedOrgType:"101",
		selectedDwmc:"",//所选的单位，用户登录后也会赋值这个值
		selectedUnit:"",//所选机组 ，默认“”为全部
		yzColor:"#ff6d50",//严重的颜色
		ybColor:"#4facfe",//一般的颜色
		interval:60000//刷新周期
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			localStorage.setItem('token', token);
		},
		setAccessToken(state, accessToken) {
			state.accessToken = accessToken;
			localStorage.setItem('accessToken', accessToken);
		},
		setRefreshToken(state, refreshToken) {
			state.refreshToken = refreshToken;
			localStorage.setItem('refreshToken', refreshToken);
		},
		clearToken(state){
			state.accessToken = "";
			localStorage.setItem('accessToken', "");
			state.refreshToken = "";
			localStorage.setItem('refreshToken', "");
		},
		setUserInfo(state, userInfo) {
			console.log('Setting user info in state:', userInfo);
			state.userInfo = userInfo;
		},
		setSelectedDwmc(state, dwmc) {
			state.selectedDwmc = dwmc;
		},
		setSelectedUnit(state, unit) {
			state.selectedUnit = unit;
		},
		setSelectedOrgType(state, orgtype) {
			state.selectedOrgType = orgtype;
		},
		initSelectedData(state){
			state.selectedDwmc="";
			state.selectedUnit="";
		}
	},
	actions: {
		login({
			commit
		}, credentials) {
			return axios.post('/sysAuth/login', credentials)
				.then(response => {
					const result = response.data.result;
					const accessToken = result.accessToken;
					const refreshToken = result.refreshToken;

					// commit('setAccessToken', accessToken);
					// commit('setRefreshToken', refreshToken);
					//console.log(this.state.accessToken,"this.state.accessToken");
				});
		},
		fetchUserInfo({
			commit
		}) {
			return axios.get('/sysAuth/userInfo')
				.then(response => {
					console.log('Fetched user info:', response.data);
					const userInfo = response.data;
					commit('setUserInfo', userInfo);
				})
				.catch(error => {
					console.error('Failed to fetch user info:', error);
				});
		},
	},
});