import request from '@/utils/request'

const BASE_URL_ADMIN = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL
// http://192.168.14.85:8080/backend
export default {
  getList (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/customSegment/getList`,
      method: 'get',
      params: data
    })
  },
  add (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/customSegment/add?name=${data.name}&memo=${data.memo}`,
      method: 'post',
      data: data.file
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/customSegment/update?name=${data.name}&memo=${data.memo}&id=${data.id}`,
      method: 'post',
      data: data.file
    })
  },
  delete (id) {
    return request({
      url: `${BASE_URL_ADMIN}/admin/v1/customSegment/delete?id=${id}`,
      method: 'post'
    })
  }
}
