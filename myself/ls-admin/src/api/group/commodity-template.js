import request from '@/utils/request'

//const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
const BASE_URL = 'http://192.168.14.85:8082'
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/getProductList`,
      method: 'get',
      params: data
    })
  },
  getProductDetail (id) {
    return request({
      url: `${BASE_URL}/modules/web/mall/getProductDetail/${id}`,
      method: 'get'
    })
  },
  addProduct (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/addProduct`,
      method: 'post',
      data
    })
  },
  updateProduct (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/updateProduct`,
      method: 'post',
      data
    })
  },
  updateProductStatus (data) {
    return request({
      url: `${BASE_URL}/modules/web/mall/updateProductStatus`,
      method: 'post',
      data
    })
  }
}
