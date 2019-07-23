
var o = {
  getUserIntegral:function (sucs) {//积分查询
      commentJs.doPostGet('/taikang/getUserIntegral','', sucs);
  },
  productCategorygetAll:function (data,sucs) {//商品分类信息管理
      commentJs.doPostGet('/productCategory/getCategory/'+data,'', sucs);
  },
  productInfo:function (index,count,data,sucs) {//商品分类点击查询详情  index 页数   count 条数
      commentJs.doPostPost('/productInfo/pageBySelect/'+index+'/'+count,data, sucs);
  },
  productDetailId:function (productId,sucs) {//通过商品ID获取商品信息
      commentJs.doPostGet('/productInfo/getById/'+productId,'', sucs);
  },
  wxBinding:function (data,sucs) {//通过二维码分享绑定
      commentJs.doPostPost('/wx/binding',data, sucs);
  },
  productDetailIds:function (sucs) {//通过商品ID获取商品信息
      commentJs.doPostGet('../../json/productGoodsDetail.json','', sucs);
  },
  shopcarAll:function (sucs) {//购物车商品查询
      commentJs.doPostGet('/productCargo/findByUserIdList','', sucs);
  },
  shopcarAdd:function (skuid,num, sucs) {//加入购物车
      commentJs.doPostGet('/productCargo/addCargo/'+skuid+'/'+num,'', sucs);
  },
  shopcarUpCargo:function (data, sucs) {//更新购物车
      commentJs.doPostPost('/productCargo/upCargo', data, sucs);
  },
  shopSubOrder:function (datas,sucs) {//订单结算
      commentJs.doPostPost('/order/subOrder',datas, sucs);
  },
  shopcardel:function (cargoId,sucs) {//删除购物车商品/order/subOrder
      commentJs.doPostPost('/productCargo/delCargo',cargoId, sucs);
  },
  collectionSave:function (datas,sucs) {//收藏商品  collectType 1商品  2店铺
      commentJs.doPostPost('/userCollect/save',datas, sucs);
  },
  collectionDelete:function (datas,sucs) {//取消收藏商品  collectType 1商品  2店铺
      commentJs.doPostPost('/userCollect/delete',datas, sucs);
  },
  collectionList:function (collectType,index,count,sucs) {//查询收藏商品店铺列表  collectType 1商品  2店铺
      commentJs.doPostGet('/userCollect/getUserCollect/'+collectType+'/'+index+'/'+count,'', sucs);
  },
  collectionSeach:function (datas,sucs) {//查询是否收藏商品  collectType 1商品  2店铺
      commentJs.doPostPost('/userCollect/judgeCollect',datas, sucs);
  },
  login:function (login_data, suc) {//登录
      commentJs.doPostPost('/userLogin/login', login_data, suc);
  },
    refundApply:function (datas,suc) {//订单退款退货
        commentJs.doPostPost('/refund/apply', datas, suc);
    },
    refundOrder:function (index,count,suc) {//退款/退货订单查询
        commentJs.doPostGet('/refund/record/'+index+'/'+count, '', suc);
    },
  userInfo:function (code,suc) {//微信登录
      commentJs.doPostGet('/wx/userInfo/'+code, '', suc);
  },
  userRewardShare:function (data,suc) {//微信分享(提供appid、nonceStr、timestamp、signature等信息)
      commentJs.doPostPost('/userReward/share', data, suc);
  },
  wxpayorderNumber:function (orderNumber,suc) {//支付
      commentJs.doPostGet('/wxpay/pay/'+orderNumber, '', suc);
  },
  userPointRecord:function (index,count,suc) {//积分查询列表
      commentJs.doPostGet('/userPoint/record/'+index+'/'+count, '', suc);
  },
  userPoint:function (suc) {//查询总积分
      commentJs.doPostGet('/userPoint/point', '', suc);
  },
  useBuyerAddress:function (index,count,suc) {//查询收货地址
      commentJs.doPostGet('/useBuyerAddress/'+index+'/'+count, '', suc);
  },
  useDelAddress:function (id,suc) {//删除收货地址
      commentJs.doPostGet('/useBuyerAddress/del/'+id, '', suc);
  },
  useModAddress:function (datas,suc) {//修改收货地址
      commentJs.doPostPost('/useBuyerAddress/modify', datas, suc);
  },
  useAddAddress:function (datas,suc) {//添加收货地址
      commentJs.doPostPost('/useBuyerAddress/add', datas, suc);
  },
  useDefaultAddress:function (suc) {//查询默认收货地址
      commentJs.doPostGet('/useBuyerAddress/default', '', suc);
  },
  userOrder:function (index,count,datas,suc) {//我的订单查询
      // 实物订单false  虚拟订单true  fictitious类型
      //orderState状态 Submit待付款 Pay待发货(实物)/待使用(虚拟订单) Delivering待收货  Reject退款/退货 Received 已收货(已完成)  Cancel 已取消  Deleted 已删除
      commentJs.doPostPost('/order/'+index+'/'+count, datas, suc);
  },
  userOrderConfirm:function (orderId,suc) {//订单确认收货
      commentJs.doPostGet('/order/confirm/'+orderId, '', suc);
  },
    userOrderCancel:function (orderId,suc) {//订单取消
        commentJs.doPostGet('/order/cancel/'+orderId, '', suc);
    },
  userOrderCount:function (suc) {//各个订单数量查询
      commentJs.doPostGet('/order/count/', '', suc);
  },
    userOrderDelete:function (orderId,suc) {//订单删除GET /userReward/account
        commentJs.doPostGet('/order/delete/'+orderId, '', suc);
    },
  spikeactivityList:function (suc) {//秒杀活动列表
      commentJs.doPostGet('/productSpikeActivity/activityList', '', suc);
  },
  spikeProductList:function (spikeActivityId,suc) {//通过秒杀活动ID获取秒杀活动商品
      commentJs.doPostGet('/productSpikeActivity/spikeActivityProductList/'+spikeActivityId, '', suc);
  },
  spikeActivityDetail:function (spikeProductId,suc) {//通过秒杀商品ID获取商品详情
      commentJs.doPostGet('/productSpikeActivity/spikeActivityProductInfo/'+spikeProductId, '', suc);
  },
    spikeActivityDetails:function (suc) {//通过秒杀商品ID获取商品详情
        commentJs.doPostGet('../../json/shopCar.json', '', suc);
    },
  categoryList:function (suc) {//获取拼团活动类目信息
      commentJs.doPostGet('/groupBuyActivity/categoryList', '', suc);
  },
  userSettingQuery:function (suc) {//账号信息查询
      commentJs.doPostGet('/userSetting/query', '', suc);
  },
  userSettingModify:function (datas,suc) {//账号信息修改
      commentJs.doPostPost('/userSetting/modify', datas, suc);
  },
  userSettingSendCode:function (datas,suc) {//邮箱发送验证码
      commentJs.doPostPost('/userSetting/sendCode', datas, suc);
  },
  userSettingvalidateEmail:function (datas,suc) {//绑定邮箱
      commentJs.doPostPost('/userSetting/validateEmail', datas, suc);
  },
  userSettingSendText:function (datas,suc) {//手机发送验证码
      commentJs.doPostPost('/userSetting/sendText', datas, suc);
  },
  userSettingPhone:function (datas,suc) {//手机绑定
      commentJs.doPostPost('/userSetting/validatePhone', datas, suc);
  },
  userUserTestify:function (datas,suc) {//手机绑定
     commentJs.doPostPost('/userSetting/userTestify', datas, suc);
  },
  homeGetDate:function (id,suc) {//首页
      commentJs.doPostGet('/home/index/'+id, '', suc);
  },
  hotSearch:function (suc) {//热搜
      commentJs.doPostGet('/home/hotSearch', '', suc);
  },
  homeNews:function (type,suc) {//广告位 11专题管理-公告，12专题管理-帮助中心，13专题管理-关于我们， 14专题管理-意见反馈, 21广告位管理-推荐分类，22广告位管理-用户页活动，23广告位管理-积分页活动
      commentJs.doPostGet('/home/mobileFastnews/'+type, '', suc);
  },
  brandlist:function (suc) {//品牌专区
      commentJs.doPostGet('/brand/list/1/100000', '', suc);
  },
  payNotifyTest:function (id,suc) {//支付
      commentJs.doPostPost('/taikang/pay/'+id, '', suc);
  },
  footprintSave:function (data,suc) {//足迹
      commentJs.doPostPost('/footprint/save', data, suc);
  },
  footprintSeach:function (index,count,suc) {//足迹查询
      commentJs.doPostGet('/footprint/'+index+'/'+count, '', suc);
  },
  footprintdelete:function (suc) {//足迹删除
      commentJs.doPostGet('/footprint/delete', '', suc);
  },
  useBuyerexpress:function (type,suc) {//物流公司名字
      commentJs.doPostGet('/useBuyerAddress/express/'+type, '', suc);
  },
  getLogisticsInfo:function (logisticsId,waybill,suc) {//物流
      //commentJs.doPostGet('../../json/skill.json', '', suc);

     commentJs.doPostGet('/order/getLogisticsInfo/'+logisticsId+'/'+waybill, '', suc);
  },
}
