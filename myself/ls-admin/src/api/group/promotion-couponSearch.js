import request from '@/utils/request'

const BASE_URL_MARKET = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
const BASE_URL_ADMIN = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL

export default {
  getUserId (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/user/getUserId/${data}`,
      method: 'get'
    })
  },
  getUserCoupon (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/getUserCouponList`,
      method: 'post',
      data
    })
  },
  checkExportCoupon (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/new/coupon/checkExportCoupon`,
      method: 'get',
      params: data
    })
  }
}
