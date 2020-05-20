import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getOrderToken } from '@/utils/auth'
import Cookies from "js-cookie"

const service = axios.create({
  timeout: 5000,
  headers: {
    'retry': 5,
    'retryCount': 0
  },
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token || getToken()) {
      // 会员权限
      config.headers['Authentication-Admin-Web-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.config.responseType && response.config.responseType === 'blob') {
      return response.data
    } else {
      const res = response.data
      if (res.code !== '00000' && res.code !== 200 && res.code !== 0) {
        if (res.code === '10007' || res.code === 403) {
          if (sessionStorage.getItem('jumpToken')) {
            Cookies.remove('jumpToken')
            sessionStorage.removeItem('jumpToken')
            window.location.href = `${process.env.VUE_APP_LAWSONADMIN_API_BASE_URL}/admin/#/login`
            return false
          } else {
            // to re-login
            MessageBox.confirm('你已经登出了，你可以取消退出该页面或再次登录', '确认登出', {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
            return false
          }
        }
        let ErrorMessage = res.error && res.error.errMsg ? res.error.errMsg : res.message ? res.message : 'Error'
        return Promise.reject(new Error(ErrorMessage))
      } else {
        return res
      }
    }
  },
  error => {
    return Promise.reject(new Error('网络超时,请重试'))
    // let config = error.config
    // config.headers.retryCount = config.headers.retryCount || 0
    // if (config.headers.retryCount >= config.headers.retry) {
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(error)
    // }
    // config.headers.retryCount += 1
    // let backoff = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 2000)
    // })
    // return backoff.then(() => {
    //   return service(config)
    // })
  }
)

export default service
