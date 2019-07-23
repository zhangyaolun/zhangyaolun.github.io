import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui';


// create an axios instance
const service = axios.create({
	baseURL: '/api',
  timeout: 10000, // request timeout
  headers: {'content-type': 'application/x-www-form-urlencoded'}
})
let loading = '';
service.interceptors.request.use((config) => {
  // 遮蔽式请求框
  loading = Loading.service({fullscreen: true, text: '拼命加载中....'})
  return config
}, (error) => {
  Message.error({
  	type: 'error',
    title: '发送失败',
    message: error.message,
    duration: 2 * 1000
  })
  l
  return error;
})

// respone interceptor
service.interceptors.response.use(
  response => {
  	setTimeout(()=>{loading.close();},500);
  	let msg = (title) => {
  		Message({
	      message: title,
	      type: 'error',
	      duration: 2 * 1000
	    })
  	}
  	const data = response.data;
  	if(data.httpCode == 200){
  		return data;
  	}
  	if(data.httpCode == 400 || data.httpCode == 401 || data.httpCode == 500){
  		msg(data.msg);
  		return false;
  	}
  	if(data.httpCode == 500){
  		msg('服务器响应失败');
  		return false;
  	}
  },
  error => {
    Message({
      message: '服务器响应失败',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  })



export default service
