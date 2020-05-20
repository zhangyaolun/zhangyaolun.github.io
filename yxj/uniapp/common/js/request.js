import Vue from 'vue'
import $store from '@/store'
import uni_request from './uni_request.js'
import config from './config.js'
import Encode from './encode.js'

const host = config
/**
 * api前缀
 */
const apiPrefix = '/gw'

let token = null

const request = uni_request({
	timeout: 5000,
	baseURL: `${host}${apiPrefix}`,
	header: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})

request.interceptors.request.use(async config => { // 请求拦截器
	if (uni.getStorageSync('token')) {
		config.header.token = uni.getStorageSync('token')
	}
	return config
})

request.interceptors.response.use((response, ...args) => { // 响应拦截器
	if (response.statusCode === 200) {
		// 获取数据解密
		let getData = response.data
		
		/* wechat 开始 */
		let decodeGetData = JSON.parse(Encode.decodeFuc(getData.data)); //解密data   获取的是字符串
		let toAes = Encode.encodeFunc(decodeGetData); //对解密的数据加密
		if (toAes.md5 === getData.md5) { //解密后的MD5与返回数据的MD5进行比较
			if (decodeGetData.code === 200) {
				response.data = decodeGetData.body
			} else if (decodeGetData.code === 999) {
				$store.dispatch('userInfo/login', {})
			} else {
				const timeError = {
					msg: decodeGetData.msg,
					data: decodeGetData
				}
				response.data = timeError
			}
		}
		
		/* wechat 结束 */
		
		
		/* admin 开始 */
		// let decodeGetData = {}
		// if (getData.data) {
		// 	try {
		// 		decodeGetData = JSON.parse(Encode.decodeFuc(getData.data)) // 解密data   获取的是字符串
		// 	} catch (error) {
		// 		decodeGetData = Encode.decodeFuc(getData.data)
		// 	}
		// }
		// if (getData.code === 200) {
		// 	response.data = decodeGetData
		// } else if (getData.code === 401) {
		// 	//window.location.href = window.location.href.split('#')[0] + '#/login'
		// } else {
		// 	const timeError = {
		// 		msg: getData.msg,
		// 		data: decodeGetData
		// 	}
		// 	response.data = timeError
		// }
		/* admin 结束 */
		
	} else { // 服务器响应不为 200 的统一处理方法
		console.log('服务器响应异常')
	}
	return response
})

request.onerror = async (...args) => { // 请求失败统一处理方法
	console.log('onerror', args)
}

export default request
