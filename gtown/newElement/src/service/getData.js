import request from '@/utils/request'

/*登录*/
export const loginByUsername = (username) => request({url: '/login',method: 'post',data: new URLSearchParams(username)})


/*登出*/
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/*订单状态*/
export const widgetOrderStatus = () => request({url: '/sys/widget/orderStatus',method: 'post'})
/*品牌*/
export const searchBrand = (data) => request({url: '/brand/searchBrand',method: 'post',data: new URLSearchParams(data)})
/*产品经理*/
export const findUser = (data) => request({url: '/preSale/findUser',method: 'post',data: new URLSearchParams(data)})
/*供应商*/
export const searchSupplier = (data) => request({url: '/brand/searchSupplier',method: 'post'})







/*
 *渠道订单管理
 * */
export const channelProList =() => request({url: '/channel/channelProList',method: 'post'})

//渠道订单管理（新增）
export const addchannelPro = (data) => request({url: '/channel/addchannelPro',method: 'post',data: new URLSearchParams(data)})

//渠道订单管理（修改）
export const modchannelPro = (data) => request({url: '/channel/modchannelPro',method: 'post',data: new URLSearchParams(data)})

//渠道订单管理（删除)
export const delchannelPro = (data) => request({url: '/channel/delchannelPro',method: 'post',data: new URLSearchParams(data)})


/*
 *管理渠道
 * */
//查询
export const channelList =(data) => request({url: '/channel/channelList',method: 'post',data: new URLSearchParams(data)})
//删除
export const channelDelChannel = (data) => request({url: '/channel/delChannel',method: 'post',data: new URLSearchParams(data)})
//添加
export const channelAddChannel = (data) => request({url: '/channel/addChannel',method: 'post',data: new URLSearchParams(data)})
//编辑
export const channelModChannel = (data) => request({url: '/channel/modChannel',method: 'post',data: new URLSearchParams(data)})



/*
 *商品管理 
 * */
/*分类管理*/
//查询分类
export const searchCategoryByLevel = (data) => request({url: '/category/searchCategoryByLevel',method: 'post',data: new URLSearchParams(data)})
//查询子分类
export const findByParentId = (data) => request({url: '/category/findByParentId',method: 'post',data: new URLSearchParams(data)})







/*this.$router.push({path:'',params:{name:'1'}})
this.$router.params.name*/


/*
 * 订单管理*/

/*订单修改
 * modType 6已退款
 * */
export const modOrderDetail =(data) => request({url: '/orders/modOrderDetail',method: 'post',data: new URLSearchParams(data)})


/*销售订单查询*/
//销售订单订单查询
export const searchOrderByPro =(data) => request({url: '/orders/searchOrderByPro',method: 'post',data: new URLSearchParams(data)})
//销售订单订单取消
export const cancelOrder =(data) => request({url: '/orders/cancelOrder',method: 'post',data: new URLSearchParams(data)})
//销售订单详情
export const detailListByOrderId =(data) => request({url: '/orders/detailListByOrderId',method: 'post',data: new URLSearchParams(data)})


/*销售子订单查询*/
//订单查询
export const searchDetailViewList =(data) => request({url: '/orders/searchDetailViewList',method: 'post',data: new URLSearchParams(data)})

/*费率异常订单*/
//订单查询
export const searchRateExOrderByPro =(data) => request({url: '/orders/searchRateExOrderByPro',method: 'post',data: new URLSearchParams(data)})
//原订单修改费率
export const modOrder =(data) => request({url: '/orders/modOrder',method: 'post',data: new URLSearchParams(data)})

/*收货地址异常订单*/
//查询
export const searchAddressExOrderByPro =(data) => request({url: '/orders/searchAddressExOrderByPro',method: 'post',data: new URLSearchParams(data)})

/*缺货异常订单列表*/
//查询
export const searchStockExOrderByPro =(data) => request({url: '/orders/searchStockExOrderByPro',method: 'post',data: new URLSearchParams(data)})

/*商品编号对应异常*/
//查询
export const searchSkuExOrderByPro =(data) => request({url: '/orders/searchSkuExOrderByPro',method: 'post',data: new URLSearchParams(data)})





/*
 *系统管理
 * */

/*菜单管理 */
//获取所有菜单
export const allMenus =() => request({url: '/sys/menu/allMenus',method: 'post'})
//获取所有一级菜单菜单
export const allParentMenu =() => request({url: '/sys/menu/allParentMenu',method: 'post'})
//修改菜单信息
export const createOrUpdate =(data) => request({url: '/sys/menu/createOrUpdate',method: 'post',data: new URLSearchParams(data)})
//添加菜单信息
export const addOrUpdate =(data) => request({url: '/sys/menu/createOrUpdate',method: 'post',data: new URLSearchParams(data)})
//删除菜单信息
export const deleteMenus =(id) => request({url: '/sys/menu/delete/'+id,method: 'post'})

/*账号管理*/
//账号查询
export const sysUserSearch =(data) => request({url: '/sys/user/search',method: 'post',data: new URLSearchParams(data)})
//查询所有角色
export const sysRoleAll =() => request({url: '/sys/role/all',method: 'post'})
//添加账号
export const addSysCreate =(data) => request({url: '/sys/user/create',method: 'post',data: new URLSearchParams(data)})
//查询账号是否存在
export const accountValidate =(data) => request({url: '/sys/user/validate/account/'+data,method: 'post'})
//角色启用
export const roleSysDisable =(id) => request({url: '/sys/user/update/disable/'+id,method: 'post'})
//角色禁用
export const roleSysEnable =(id) => request({url: '/sys/user/update/enable/'+id,method: 'post'})
//查询所有分类
export const sysAllCategory =(data) => request({url: '/sys/userCategory/all',method: 'post',data: new URLSearchParams(data)})
//查询所有渠道
export const sysAllChannel =(data) => request({url: '/sys/userChannel/all',method: 'post',data: new URLSearchParams(data)})
//角色修改
export const sysUserRoleUupdate =(data) => request({url: '/sys/user/role/update',method: 'post',data: new URLSearchParams(data)})
//分类修改添加
export const sysCategoryAdd =(oid,cid) => request({url: '/sys/userCategory/add/'+oid+'/'+cid,method: 'post'})
//分类修改取消
export const sysCategoryDel =(oid,cid) => request({url: '/sys/userCategory/delete/'+oid+'/'+cid,method: 'post'})
//渠道修改添加
export const sysChannelAdd =(oid,cid) => request({url: '/sys/userChannel/add/'+oid+'/'+cid,method: 'post'})
//渠道修改取消
export const sysChannelDel =(oid,cid) => request({url: '/sys/userChannel/delete/'+oid+'/'+cid,method: 'post'})

/*角色管理*/
//角色新增
export const sysRoleAdd =(data) => request({url: '/sys/role/create',method: 'post',data: new URLSearchParams(data)})
//角色操作删除
export const sysRoleDel =(id) => request({url: '/sys/role/del/'+id,method: 'post'})
//角色操作编辑 菜单查询
export const sysRoleMenu =(id) => request({url: '/sys/role/menu/search/'+id,method: 'post'})
//菜单启用
export const sysRoleMenuAdd =(id,pid) => request({url: '/sys/role/menu/add/'+id+'/'+pid,method: 'post'})
//菜单禁用
export const sysRoleMenuDel =(id,pid) => request({url: '/sys/role/menu/del/'+id+'/'+pid,method: 'post'})

/*参数配置*/
//参数查询
export const sysConfigSearch =() => request({url: '/sys/config/search',method: 'post'})
//参数修改 或 新增
export const sysConfigCreateOrUpdate =(data) => request({url: '/sys/config/createOrUpdate',method: 'post',data: new URLSearchParams(data)})

/*规则配置*/
//规则查询
export const ruleEngineFind =(roleName) => request({url: '/ruleEngine/find/'+roleName,method: 'post'})
//添加
export const ruleEngineAdd = (data) => request({url: '/ruleEngine/add',method: 'post',data: new URLSearchParams(data)})
//修改
export const ruleEngineUpdate = (data) => request({url: '/ruleEngine/update',method: 'post',data: new URLSearchParams(data)})
//删除
export const ruleEngineDel = (id) => request({url: '/ruleEngine/del/'+id,method: 'post'})