import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/list`,
      method: 'post',
      data
    })
  },
  region () { // 获取默认地区商户信息
    return request({
      url: `${BASE_URL}/market/web/mch/info/get/region`,
      method: 'get'
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/create`,
      method: 'post',
      data
    })
  },
  detail (id) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/detail/${id}`,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/mod`,
      method: 'post',
      data
    })
  },
  upLoadCsv (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/upload/csv`,
      method: 'post',
      data
    })
  },
  updateStatus (data) { // 公开
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/mod/status`,
      method: 'post',
      data
    })
  },
  wechat (id) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/sync/wechat/${id}`,
      method: 'get'
    })
  },
  codeDetail (id) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/pre/code/detail/${id}`,
      method: 'get'
    })
  },
  createCode (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/create/pre/code`,
      method: 'post',
      data
    })
  },
}
