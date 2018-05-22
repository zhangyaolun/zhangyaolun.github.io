import fetch from '../config/fetch'

/**
 * 综合排序
 */
export const indexShopHtml = (x,y,radius,currPage,pageSize,order,type,shopName) => fetch('/shop/geo/withInRadius', {
 	x:x,
	y:y,
	radius:radius,
	currPage:currPage,
	pageSize:pageSize,
	order:order,
	type:type,
	shopName:shopName
});


/**
 * 搜索查询
 */
export const indexShopsearch = (x,y,radius,currPage,pageSize,order,type,shopName) => fetch('/shop/search', {
 	x:x,
	y:y,
	radius:radius,
	currPage:currPage,
	pageSize:pageSize,
	order:order,
	type:type,
	shopName:shopName
});

/**
 * 评论查询
 */
export const destailShop = () => fetch('/shop/geo/withInRadius', {
 	
});