import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  index (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/role/roleList`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/role/updateRole`,
      method: 'post',
      data
    })
  },
  store (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/role/addRole`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url:  `${BASE_URL}/market/web/v1/role/deleteRole`,
      method: 'post',
      data
    })
  }
}
