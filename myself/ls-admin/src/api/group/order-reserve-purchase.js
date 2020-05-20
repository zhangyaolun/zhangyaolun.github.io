import request from '@/utils/request'

const BASE_URL = process.env.VUE_APP_LAWSONAPP_API_BASE_URL


export default {
  index (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/orders`,
      method: 'get',
      params: data
    })
  },
  detail (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/orderDetail/${data}`,
      method: 'get'
    })
  },
  applyRefund (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/applyRefund`,
      method: 'get',
      params: data
    })
  },
  immediatelyRefund (data) {
    return request({
      url: `${BASE_URL}/modules/web/reserve/immediatelyRefund/${data}`,
      method: 'get',
    })
  }


	// getOrders : params => {
	// 	const url = `${BASE_URL}/modules/web/reserve/orders`;
  //       return http.get(url, params);
	// },
	// getOrderDetail : params => {
	// 	const url = `${BASE_URL}/modules/web/reserve/orderDetail/`+params;
	//     return http.get(url, params);
	// },
	// applyRefund : params => {
	// 	const url = `${BASE_URL}/modules/web/reserve/applyRefund`;
	//     return http.get(url, params);
	// },
	// immediatelyRefund : params => {
	// 	const url = `${BASE_URL}/modules/web/reserve/immediatelyRefund/`+params;
	//     return http.get(url, params);
	// }
}
