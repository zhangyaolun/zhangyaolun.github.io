import request from '@/utils/request'

const BASE_URL_MARKET = process.env.VUE_APP_SRSLAWSON_API_BASE_URL
const BASE_URL_ADMIN = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/`,
      method: 'get',
      params: data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/`,
      method: 'post',
      data
    })
  },
  detail (id) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/${id}`,
      method: 'get'
    })
  },
  delList (id) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/${id}/`,
      method: 'delete'
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/${data.id}/`,
      method: 'put',
      data
    })
  },
  upLoadFile (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/imgUpload/forSpecialActivity`,
      method: 'post',
      data
    })
  },
  getSpecialActivityAdminLog (data) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/getSpecialActivityAdminLog`,
      method: 'post',
      data
    })
  },
  getSpecialActivityAdminLogDetail (id) {
    return request({
      url: `${BASE_URL_MARKET}/market/web/v1/specialActivity/getSpecialActivityAdminLog/${id}`,
      method: 'get'
    })
  },
}
