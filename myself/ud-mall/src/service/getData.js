import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 登录
 */
export const login = (username,password) => fetch('/api/user-login', {
  username: username,
  password:password,
});
/**
 * 退出登录
 */
export const logout = () => fetch('/api/user-logout', {

});

/**
 * 查询类别 1 2 3
 */
export const findCategory = (level) => fetch('/api/product/findByLevel', {
  level: level,
});
/**
 * 根据父类别查询子类别
 */
export const findCategoryById = (code,level) => fetch('/api/product/findByCategoryCode', {
  code: code,
  level:level,
});
/**
 * 根据商品分类获取商品列表   pro搜索关键词
 */
export const findProductByPro = (currentPage,categoryCode,pro,sort) => fetch('/api/product/findProductByPro', {
  currentPage: currentPage,
  categoryCode:categoryCode,
  pro:pro,
  sort:sort
});
/**
 * 根据商品详情
 */
export const findProductDetailById = (id) => fetch('/api/product/findProductById', {
  id: id,
});

/**
 * 获取评论列表
 */
export const findByProductIdComment = (id) => fetch('/api/product/findByProductIdComment', {
  id: id,
});


/*获取验证码*/
export const phoneMessage = () => fetch('/api/user/register/achieveVCodes', {

});
/*找回密码*/
export const passwordMessage = () => fetch('/api/user-login', {

});
/*我的收藏*/
//查询
export const userCollection = (currentPage) => fetch('/api/user/collection/searchUserCollectionByAccountIdPage', {
  currentPage:currentPage
});
//加入
export const userAddCollection = (typeId) => fetch('/api/user/collection/insertUserCollection', {
  type:2,
  typeId:typeId,
});
//取消收藏
export const userDeleteCollection = (id,stat) => fetch('/api/user/collection/updateUserCollection', {
  id:id,
  stat:stat,
});

/*购物车*/
//查询
export const findShopCar = () => fetch('/api/user/shopCar/findShopCarByUserId', {

});
//修改
export const modShopCar = (productId,num) => fetch('/api/user/shopCar/modShopCar', {
  productId:productId,
  num:num,
});
//删除单个商品
export const delOneShopCar = (productId) => fetch('/api/user/shopCar/delShopCarProduct', {
  productId:productId,
});
//删除多个商品
//删除多个商品
export const delMoreShopCar = (productId) => fetch('/api/user/shopCar/delShopCarProductList', {
  productId:productId,
});
//清空购物车
export const delAllShop = () => fetch('/api/user/shopCar/delAllProduct', {

});
//添加
export const shopaddShopCar = (productId,num) => fetch('/api/user/shopCar/addShopCar', {
  productId:productId,
  num:num,
});
/*收货地址*/
//查询默认收货地址
export const userAddress = () => fetch('/api/user/deliveryAddress/searchUserDeliveryAddressByAccountIdAndDefault', {

});
//新增收货地址
export const insertDeliveryAddress = (name,moblie,isDefault,province,city,area,address,zip) => fetch('/api/user/deliveryAddress/insertDeliveryAddress', {
  name:name,
  moblie:moblie,
  isDefault:isDefault,
  province:province,
  city:city,
  area:area,
  address:address,
  zip:zip,
});
//修改收货地址
export const updateDeliveryAddress = (id,accountId,name,moblie,isDefault,province,city,area,address) => fetch('/api/user/deliveryAddress/updateDeliveryAddress', {
  id:id,
  accountId:accountId,
  name:name,
  moblie:moblie,
  isDefault:isDefault,
  province:province,
  city:city,
  area:area,
  address:address,
});
//修改默认地址
export const DeliveryAddress = (id,isDefault) => fetch('/api/user/deliveryAddress/updateDeliveryAddress', {
  id:id,
  isDefault:isDefault,
});
//删除地址
export const DeleteAddress = (id) => fetch('/api/user/deliveryAddress/updateDeliveryAddress', {
  id:id,
  stat:false,
});
//查询收货地址
export const searchUserDeliveryAddress = () => fetch('/api/user/deliveryAddress/searchUserDeliveryAddress', {

});
/*提交订单*/
export const createOrder = (userDeliveryId,remark,proItem) => fetch('/api/order/createOrder', {
  userDeliveryId:userDeliveryId,
  remark:remark,
  proItem:proItem,
});
//获取个人信息
export const getUserInfo = () => fetch('/api/user/userInfo/searchUserInfo', {
});
//修改个人信息
export const updateUserInfo = (userInfo) => fetch('/api/user/userInfo/updateUserInfo', {
  id:userInfo.uid?userInfo.uid:'',
  userImage:userInfo.userImage?userInfo.userImage:'',
  name:userInfo.name?userInfo.name:'',
  mobile:userInfo.mobile?userInfo.mobile:'',
  birthday:userInfo.birthday?userInfo.birthday:'',
  email:userInfo.email?userInfo.email:'',
  sex:userInfo.sex?userInfo.sex:'',
});
//注册 第一步
export const regsiterUserStep1 = (mobile) => fetch('/api/user/register/step1/'+mobile, {
});
//注册 第二步
export const regsiterUserStep2 = (vcode,passwd) => fetch('/api/user/register/step2', {
  vcode:vcode,
  passwd:passwd,
});
//用户密码找回 第一步 验证码和手机号
export const forgetPwdStep1 = (mobile,picVCode) => fetch('/api/user/recoverPasswd/step1/'+mobile+'/'+picVCode, {
});
//用户密码找回 第二步 获取手机验证码
export const forgetPwdAchieveVCodes = (mobile,picVCode) => fetch('/api/user/recoverPasswd/achieveVCodes', {
});
//用户密码找回 第二步 设置新密码
export const forgetPwdStep2 = (msgVCode,password) => fetch('/api/user/recoverPasswd/step2', {
  msgVCode:msgVCode,
  password:password,
});
//用户修改密码
export const updatePwd = (oldPasswd,newPasswd) => fetch('/api/user/recoverPasswd/updatePasswd', {
  oldPasswd:oldPasswd,
  newPasswd:newPasswd,
});

/*查询指定*/
export const findByCode = (code) => fetch('/api/address/findByCode', {
  code:code,
});
/*查询省级*/
export const findFirstLevelAddress = () => fetch('/api/address/findFirstLevelAddress', {

});
/*查询下一级*/
export const findSubs = (code) => fetch('/api/address/findSubs', {
  code:code,
});
/*查询我的订单列表  orderNo 订单编号（没有传空）
 status  订单状态 1待支付 2待发货 5待收货 8待评价 9完成*/
export const findOrderList = (currentPage,orderNo='',status=0) => fetch('api/order/findByUserId', {
  currentPage:currentPage,
  orderNo:orderNo,
  status:status
});
/*删除订单 -1 取消订单 0*/
export const changeOrderStatus = (id,status) => fetch('api/order/modById', {
  id:id,
  status:status,
});
/*发表评论*/
export const addComment = (orderId,commentList) => fetch('api/product/addComment', {
  orderId:orderId,
  commentList:commentList,
});
/*查询单个商品详情*/
export const findOrderId = (id) => fetch('/api/order/findById', {
  id:id
});
/*获取分类*/
export const findAllCategory = () => fetch('/api/product/indexCategory', {

});

