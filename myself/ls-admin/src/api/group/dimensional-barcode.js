import request from '@/utils/request'

const BASE_URL_MARKET = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
const BASE_URL_ADMIN = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL
const BASE_URL_MODULES = process.env.VUE_APP_LAWSONAPP_API_BASE_URL

export default {
  getQRCodeChannelConfig (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/qrCodeConfig/getQRCodeChannelConfig`,
      method: 'get'
    })
  },
  getQRcodeTypeConfig (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/qrCodeConfig/getQRcodeTypeConfig`,
      method: 'get'
    })
  },
  qRcodeVerificationDate (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/new/admin/QRcode/verificationDate`,
      method: 'get',
      params: data
    })
  },
  getCommodityCityList (data) {
    return request({
      url: `${BASE_URL_MODULES}/modules/reserve/getCommodityCityList`,
      method: 'get',
      params: data
    })
  }
}
