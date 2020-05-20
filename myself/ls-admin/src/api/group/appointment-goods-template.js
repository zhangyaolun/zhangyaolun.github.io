import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/getCommodityList`,
      method: 'get',
      params: data
    })
  },
  getShopList (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/getShopList`,
      method: 'get',
      params: data
    })
  },
  createCommodity (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/createCommodity`,
      method: 'post',
      data
    })
  },
  getMainFileCommodityList (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/getMainFileCommodityList`,
      method: 'get',
      params: data
    })
  },
  getCityList (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/getCityList`,
      method: 'get',
      params: data
    })
  },
  getCommodityDetail (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/getCommodityDetail`,
      method: 'get',
      params: data
    })
  },
  updateCommodity (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/updateCommodity`,
      method: 'post',
      data
    })
  },
  endCommodity (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/endCommodity`,
      method: 'post',
      data
    })
  }
}
