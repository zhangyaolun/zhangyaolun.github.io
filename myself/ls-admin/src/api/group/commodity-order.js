import request from '@/utils/request'

//const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
const BASE_URL = 'http://192.168.14.85:8082'
export default {
  getOrderList (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/getOrderList`,
      method: 'get',
      params: data
    })
  },
  getOrderDetail (id) {
    return request({
      url: `${BASE_URL}/modules/web/mall/getOrderDetail/${id}`,
      method: 'get'
    })
  },
  exportOrderData (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/exportOrderData`,
      method: 'get',
      params: data,
      responseType: 'blob'
    })
  }
}
