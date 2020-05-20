import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  login (data) {
    return request({
      url: `${BASE_URL}/market/web/common/login`,
      method: 'post',
      data
    })
  },
  getUserNav () {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/nav`,
      method: 'get'
    })
  },
  logout () {
    return request({
      url: `${BASE_URL}/market/web/common/loginOut`,
      method: 'post'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/admin/updateAdminPassword`,
      method: 'post',
      data
    })
  }
}
