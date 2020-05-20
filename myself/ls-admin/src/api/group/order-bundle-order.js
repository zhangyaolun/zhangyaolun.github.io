import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/modules/web/bundle/order/list`,
      method: 'post',
      data
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL}/modules/web/bundle/order/detail/${data}`,
      method: 'get'
    })
  },
  applyBack (data) {
    return request({
      url: `${BASE_URL}/modules/web/bundle/order/preRefund/${data}`,
      method: 'get'
    })
  },
  orderBack (data) {
    return request({
      url: `${BASE_URL}/modules/web/bundle/order/realRefund/${data}`,
      method: 'get'
    })
  },
  validateCoupon (data) {
    return request({
      url: `${BASE_URL}/modules/web/bundle/order/validateCoupon/${data}`,
      method: 'get'
    })
  }
}
