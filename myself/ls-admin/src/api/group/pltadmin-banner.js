import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_PLT_API_BASE_URL
export default {
  initSelectData (data) {
    return request({
      url: `${BASE_URL}/pltadmin/v1/banner/initSelectData`,
      method: 'get',
      params: data
    })
  },
  getBannerList (data) {
    return request({
      url: `${BASE_URL}/pltadmin/v1/banner/`,
      method: 'get',
      params: data
    })
  },
  batchOpenBanner (data) {
    return request({
      url: `${BASE_URL}/pltadmin//v1/banner/batchOpenBanner`,
      method: 'post',
      data
    })
  }
}
