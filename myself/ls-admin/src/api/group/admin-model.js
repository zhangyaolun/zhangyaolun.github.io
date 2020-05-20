import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  index (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/modelList`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/deleteModel`,
      method: 'post',
      data
    })
  },
  store (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/addModel`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/updateModel`,
      method: 'post',
      data
    })
  },
  modelLevelIndex (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/modelLevel`,
      method: 'get',
      params: data
    })
  },
  modelListBySupModelIndex (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/model/modelListBySupModel`,
      method: 'get',
      params: data
    })
  }
}
