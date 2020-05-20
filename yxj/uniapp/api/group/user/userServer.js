import request from '@/common/js/request.js'

export default {
	/* 登录 */
  login (data) { return request.post('/user/registerLogin', data) },
}


//export const _API_IndexDownload = data => request.downloadFile('https://yinchengnuo.com/static/images/0.jpg', data) // 下载文件接口

//export const _API_IndexUpload = data => request.uploadFile('/user/auth_share', data) // 上次文件接口


/* const task = _API_Index() // 执行接口并保存请求任务
task.then(res => console.log(res)).catch(e => console.log(e)) // 请求任务的结果处理
setTimeout(() => task.abort(), 567) // 需要的时候，可以主动取消请求任务
const fileD = _API_IndexDownload({
	header: {
		test: 666666
	}
}) // 执行下载文件接口并保存请求任务
fileD.onProgressUpdate(e => console.log(e)) // 监听下载进度
fileD.then(res => console.log(res)).catch(e => console.log(e)) // 下载任务的结果处理
let fileU
setTimeout(() => {
	uni.compressImage({
		src: '../../static/colorUIPreview.jpg',
		quality: 100
	}).then(([, {
		tempFilePath
	}]) => {
		fileU = _API_IndexUpload({ // 执行上传文件接口并保存请求任务
			name: 'img',
			filePath: tempFilePath,
			formData: {
				a: 1,
				b: 2
			}
		})
		fileU.onProgressUpdate(e => console.log(e)) // 监听上传进度
		fileU.then(res => {
			console.log(res)
		})
	})
}, 5678) */
