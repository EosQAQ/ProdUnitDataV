import axios from 'axios';
import { notification } from 'ant-design-vue'

const service = axios.create({
    // baseURL: 'https://www.easy-mock.com/mock/test',
    timeout: 200000
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        //console.log('config', config)
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

//响应拦截器
service.interceptors.response.use(
    response => {
        // console.log(response)
        const res = response.data
        if (response.status != 200) {
            return Promise.reject(res)
        }
        return res
    },
    error => {
        console.log('err' + error)

        // notification.error({
        //     message: 'Error',
        //     description: error.message
        // })
        return Promise.reject(error)
    }
)

export default service;