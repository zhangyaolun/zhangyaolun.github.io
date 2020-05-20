import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/getList`,
      method: 'get',
      params: data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/cteate`,
      method: 'post',
      data
    })
  },
  detail (id) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/get/${id}`,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/update`,
      method: 'post',
      data
    })
  },
  merchantList () {
    return request({
      url: `${BASE_URL}/market/web/v1/merchant/getList`,
      method: 'get'
    })
  },
  updateActivityStatus (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/updateActivityStatus`,
      method: 'post',
      data
    })
  },
  getCMCouponRecord (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/getCMCouponRecord`,
      method: 'post',
      data
    })
  },
  getExportCMCouponRecordList (data) {
    return request({
      url: `${BASE_URL}/market/web/v1/cmActivity/getExportCMCouponRecordList`,
      method: 'get',
      params: data
    })
  }
}
