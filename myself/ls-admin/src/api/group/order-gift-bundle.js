import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/getGiftList`,
      method: 'post',
      data
    })
  },
  del (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/giftDelete/${data}`,
      method: 'get'
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/getGiftDetail/${data}`,
      method: 'get'
    })
  },
  store (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/createBundle`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/updateBundle`,
      method: 'post',
      data
    })
  },
  updateBundleSort (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/updateBundleSort`,
      method: 'post',
      data
    })
  },
  handlerCouponId (data) {
    return request({
      url: `${BASE_URL}/modules/web/gift/getCouponDetail/`+data,
      method: 'get'
    })
  }
}
