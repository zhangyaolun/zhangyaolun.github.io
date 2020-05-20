import request from '@/common/js/request.js'

export default {
	
	/* 获取用户关注直播间 */
    getSubscribeStudio (data) { return request.post('/studio/getSubscribeStudio', data) },
	
	/* 直播首页获取直播列表 */
	getLiveList (data) { return request.post('/studio/getLiveList', data) },
	
}

