import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/role/roleListByUserId`,
      method: 'get',
      params: data
    })
  },
  store (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/role/addUserRole`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/role/deleteUserRole`,
      method: 'post',
      data
    })
  }
}
