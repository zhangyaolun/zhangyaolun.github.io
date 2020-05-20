import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  getOrderList (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/getOrderList`,
      method: 'post',
      data
    })
  },
  getOrderSubDetail (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/getOrderSubDetail/${data}`,
      method: 'get'
    })
  },
  refundToAdmin (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/refundToAdmin/${data}`,
      method: 'post'
    })
  }
}
