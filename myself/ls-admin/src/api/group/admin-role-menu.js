import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/menu/menuListByRoleId`,
      method: 'get',
      params: data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/role/updateRoleMenu`,
      method: 'post',
      data
    })
  }
}
