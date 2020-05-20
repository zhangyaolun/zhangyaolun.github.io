import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL
export default {
  getPurchaseList (data) {
    return request({
      url: `${BASE_URL}/admin/v1/purchase/getPurchaseList`,
      method: 'get',
      params: data
    })
  },
  getTempUrl (id) {
    return request({
      url: `${BASE_URL}/admin/v1/purchase/getTempUrl/${id}`,
      method: 'get'
    })
  }
}
