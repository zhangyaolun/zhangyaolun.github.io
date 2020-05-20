import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  index (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/paramSetting/paramList`,
      method: 'post',
      data
    })
  },
  getList(data) {
    return request({
      url :`${BASE_URL}/market/web/v1/paramSetting/getListByParamType?paramType=`+data,
      method: 'get'
    })
  },
  getListBySuperParamCode(data) {
    return request({
      url :`${BASE_URL}/market/web/v1/paramSetting/getListBySuperParamCode?superParamCode=`+data,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/paramSetting/updateParam`,
      method: 'post',
      data
    })
  },
  store (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/paramSetting/addParam`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/paramSetting/deleteParam`,
      method: 'post',
      data
    })
  }
}
