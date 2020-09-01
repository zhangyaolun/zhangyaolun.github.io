import axios from 'axios'
import {Message} from 'element-ui'

const defaultHeader = {
    'Content-Type': 'application/json',
    'retry': 5,
    'retryCount': 0
};

const request = ({baseURL = '', timeout = 5000, headers = defaultHeader}) => {
    const service = axios.create({
        baseURL,
        timeout,
        headers,
        withCredentials: true
    })

    service.interceptors.request.use(
        config => {
            //config.headers['Authentication-Admin-Web-Token'] = getToken()
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        response => {
            const {httpCode, msg: resultMessage, result, fileDomain} = response.data;

            // 用户登录超时统一处理
            if (httpCode == 'E_300') {
                window.location.href = '/';
                sessionStorage.clear();
                return;
            }
            if (httpCode == 'E_9999') {//前端分类不显示err信息
                return Promise.reject(result);
            }
            if (httpCode != 200) {
                Message({message: resultMessage, type: 'error'})
                return Promise.reject(result);
            }
            return {...response.data};
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
    return service;
}

export const omsAjax = new request({baseURL: '/qtoolsOms'});
