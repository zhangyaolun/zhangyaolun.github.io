import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/merchant/getListByPage`,
      method: 'get',
      params: data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/merchant/create`,
      method: 'post',
      data
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/merchant/get`,
      method: 'get',
      params: data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/merchant/update`,
      method: 'post',
      data
    })
  }
}
