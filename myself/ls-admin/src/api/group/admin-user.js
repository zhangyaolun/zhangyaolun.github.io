import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  store (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/addAdmin`,
      method: 'post',
      data
    })
  },
  index (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/adminList`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/updateAdmin`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/deleteAdmin`,
      method: 'post',
      data
    })
  },
  resetPwd (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/resetPassword`,
      method: 'post',
      data
    })
  }
}
