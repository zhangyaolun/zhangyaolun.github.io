import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/orders`,
      method: 'get',
      params: data
    })
  },
  applyRefund (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/applyRefund`,
      method: 'get',
      params: data
    })
  },
  applyRefundForCancel (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/applyRefundForCancel`,
      method: 'get',
      params: data
    })
  },
  exportOrderData (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/exportOrderData`,
      method: 'get',
      params: data,
      responseType: 'blob'
    })
  },
}
