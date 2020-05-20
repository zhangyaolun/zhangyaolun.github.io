import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  index (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/menuList`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/deleteMenu`,
      method: 'post',
      data
    })
  },
  store (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/addMenu`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/updateMenu`,
      method: 'post',
      data
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/menuDetail`,
      method: 'get',
      params: data
    })
  }
}
