import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL
export default {
  getList (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/getList`,
      method: 'post',
      data
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/create`,
      method: 'post',
      data
    })
  },
  update (data) {
    return request({
      url: `${BASE_URL}/modules/web/group/update`,
      method: 'post',
      data
    })
  },
  getGiftDetail (id) { // 查询特惠券包详情 repository/editor?id=16&mod=53
    return request({
      url: `${BASE_URL}/modules/web/group/gift/detail/${id}`,
      method: 'get'
    })
  },
  groupDetail (id) {
    return request({
      url: `${BASE_URL}/modules/web/group/get/${id}`,
      method: 'get'
    })
  },
  endGroup (id) { // 手动结束活动
    return request({
      url: `${BASE_URL}/modules/web/group/endGroup/${id}`,
      method: 'post'
    })
  }
}
