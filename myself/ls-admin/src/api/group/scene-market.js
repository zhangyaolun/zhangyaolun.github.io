import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
//const BASE_URL = 'http://192.168.14.175:9090'
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/market/web/scene/marketing/activity/list`,
      method: 'post',
      data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/market/web/scene/marketing/activity/create`,
      method: 'post',
      data
    })
  },
  detail (id) {
    return request({
      url: `${BASE_URL}/market/web/scene/marketing/activity/detail/${id}`,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/scene/marketing/activity/mod`,
      method: 'post',
      data
    })
  },
  statusMod (data) {
    return request({
      url: `${BASE_URL}/market/web/scene/marketing/activity/mod/status`,
      method: 'post',
      data
    })
  }
}
