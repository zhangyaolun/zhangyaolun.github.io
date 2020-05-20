import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_SRSLAWSON_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/pushLogList`,
      method: 'get',
      params: data
    })
  },
  uploadFile (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/uploadCsv?templateId=${data.templateId}`,
      method: 'post',
      data: data.file,
    })
  },
  create (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/addActivity`,
      method: 'post',
      data
    })
  },
  templateList (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/templateList`,
      method: 'get',
      params: data
    })
  },
  templateDetail (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/templateDetail`,
      method: 'get',
      params: data
    })
  },
  addMarketMsgActivity (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/addMarketMsgActivity`,
      method: 'post',
      data
    })
  },
  uploadMedia (data) {
    return request({
      url: `${BASE_URL}/notify/web/v1/wechatPush/uploadMedia?msgType=${data.msgType}`,
      method: 'post',
      data: data.media
    })
  }
}
