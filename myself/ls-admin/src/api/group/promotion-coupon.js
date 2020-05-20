import request from '@/utils/request'

const BASE_URL_MARKET = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
const BASE_URL_ADMIN = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/getList`,
      method: 'get',
      params: data
    })
  },
  fileImg (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/file/uploadImg`,
      method: 'post',
      data
    })
  },
  creat (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/create`,
      method: 'post',
      data
    })
  },
  upLoadCsv (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/new/admin/file/upLoadCsv`,
      method: 'post',
      data
    })
  },
  commodityCd (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/new/admin/CommodityMst/${data}`,
      method: 'get'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/update`,
      method: 'post',
      data
    })
  },
  updateStatus (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/updateStatus`,
      method: 'post',
      data
    })
  },
  delete (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/delete`,
      method: 'post',
      data
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/coupon/get`,
      method: 'get',
      params: data
    })
  },
}
