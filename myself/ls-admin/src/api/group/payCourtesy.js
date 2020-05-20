import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/list`,
      method: 'post',
      data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/create`,
      method: 'post',
      data
    })
  },
  detail (id) {
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/detail/${id}`,
      method: 'get'
    })
  },
  detailBase (id) {
    return request({
      url: `${BASE_URL}/market/web/mch/coupon/get/base/${id}`,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/mod`,
      method: 'post',
      data
    })
  },
  updateStatus (data) { // 公开
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/mod/status`,
      method: 'post',
      data
    })
  },
  wechat (id) { // 同步微信
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/sync/wechat/${id}`,
      method: 'get'
    })
  },
  terminate (id) { // 活动终止
    return request({
      url: `${BASE_URL}/market/web/mch/pay/gift/terminate/${id}`,
      method: 'get'
    })
  }
}
