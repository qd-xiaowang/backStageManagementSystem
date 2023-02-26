import axios from 'axios'
import {
	ElLoading,
	ElMessage
} from 'element-plus'
import router from '@/router'
//创建axios的一个实例 
var instance = axios.create({
	baseURL: '', //接口统一域名
	timeout: 6000, //设置超时
	// 请求头
	headers: {
		'Content-Type': 'application/json;charset=UTF-8;',
	}
})
let loading = null
//正在请求的数量
let requestCount = 0


//请求拦截器 
instance.interceptors.request.use((config) => {
	return config
	}, (error) =>
	// 对请求错误做些什么
	Promise.reject(error))

//响应拦截器
instance.interceptors.response.use((response) => {
	//响应成功
	return response.data
}, (error) => {
	console.log(error)
	return Promise.reject(error)
})


export default instance
