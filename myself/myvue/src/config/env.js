/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'history';
let imgBaseUrl = 'http://192.168.1.74:8001';


if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){

}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
