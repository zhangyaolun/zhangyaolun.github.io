
import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONADMIN_API_BASE_URL

export default {
  index (data) {
    return request({
      url: `${BASE_URL}/admin/new/admin/card/txnList`,
      method: 'post',
      data
    })
  },
  refund (data) {
    return request({
      url: `${BASE_URL}/admin/new/admin/card/exception/${data}`,
      method: 'get'
    })
  }
}
