// http/request.js
// 引入axios的实例
import instance from "./index"
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

const axios = ({
	method,
	url,
	data,
	config
}) => {
	// 返回一个新的字符串把大写全部换成小写
	method = method.toLowerCase()
	// 判断请求方法是什么返回对应的请求操作
	if (method == 'post') {
		return instance.post(url, data, {
			...config
		})
	} else if (method == 'get') {
		return instance.get(url, {
			params: data,
			...config
		})
	} 
	else if (method == 'delete') {
		return instance.delete(url, {
			params: data,
			...config
		})
	} 
	else if (method == 'patch') {
		return instance.patch(url,data, {
			...config
		})
	} 
	else if (method == 'put') {
		return instance.put(url, data, {
			...config
		})
	} else {
		console.error('未知的method' + method)
		return false
	}
}
export default axios
