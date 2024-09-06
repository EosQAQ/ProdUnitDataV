import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import axios from 'axios';
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';


var VueTouch = require('vue-touch')

// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import 'vue-awesome/icons/clock.js';

//引入echart
//4.x 引用方式
import echarts from 'echarts'
//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
//import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

Vue.prototype.$czinfo = window.czinfo;
Vue.prototype.$hdjzxx = window.hdjzxx;

Vue.prototype._queryTime = 300000;

// 全局注册

Vue.component('icon', Icon);
Vue.use(dataV);
Vue.use(Antd);
Vue.use(VueTouch, {
	name: 'v-touch'
})

axios.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});


new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');