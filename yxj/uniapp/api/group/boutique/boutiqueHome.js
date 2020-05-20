import request from '@/common/js/request.js'

export default {
	
	/* 系列课列表查询 */
    getSeriesCurriculumList (data) { return request.post('/content/getSeriesCurriculumList', data) },
	
	/* 单节课列表查询 */
	getSingletonCurriculumList (data) { return request.post('/content/getSingletonCurriculumList', data) },
	
	
}

