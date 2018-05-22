
var o = {
  productCategorygetAll:function (data,sucs) {//商品分类信息管理
      commentJs.doPostGet('/productCategory/getCategory/'+data,'', sucs);
  },
  productInfo:function (index,count,data,sucs) {//商品分类点击查询详情  index 页数   count 条数
      commentJs.doPostPost('/productInfo/pageBySelect/'+index+'/'+count,data, sucs);
  },
  productDetailId:function (productId,sucs) {//通过商品ID获取商品信息
      commentJs.doPostGet('/productInfo/getById/'+productId,'', sucs);
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
  userSign:function (suc) {//签到
      commentJs.doPostGet('/userSign/', '', suc);
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
  userCoupon:function (status,index,count,suc) {//我的优惠券查询
      commentJs.doPostGet('/userCoupon/'+status+'/'+index+'/'+count, '', suc);
  },
  userCouponCenter:function (order,index,count,suc) {//优惠券领取查询 order降序传0 升序传1 默认传2
      commentJs.doPostGet('/userCoupon/center/'+order+'/'+index+'/'+count, '', suc);
  },
  userCouponGet:function (datas,suc) {//优惠券领取
      commentJs.doPostPost('/userCoupon/get', datas, suc);
  },
  userOrder:function (index,count,datas,suc) {//我的订单查询
      // 实物订单false  虚拟订单true  fictitious类型
      //orderState状态 Submit待付款 Pay待发货(实物)/待使用(虚拟订单) Delivering待收货  Reject退款/退货 Received 已收货(已完成)  Cancel 已取消  Deleted 已删除
      commentJs.doPostPost('/order/'+index+'/'+count, datas, suc);
  },
  userOrderCancel:function (orderId,suc) {//订单取消
      commentJs.doPostGet('/order/cancel/'+orderId, '', suc);
  },
  userOrderDelete:function (orderId,suc) {//订单删除
      commentJs.doPostGet('/order/delete/'+orderId, '', suc);
  },
  homeGetDate:function (suc) {//首页
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Index&met=index&typ=json&ua=wap&sub_site_id=0', '', suc);
  },
  homeNews:function (suc) {//首页快报
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Uart&met=index_uartlist&typ=json&ua=wap&sub_site_id=0', '', suc);
  },
  seckillGoods:function (suc) {//首页秒杀商品数据
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Miaosha&met=getmiaoshalist&typ=json&ua=wap&sub_site_id=0&k=&u=', '', suc);
  },
  groupsGoods:function (index,suc) {//首页拼团商品数据
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=PinTuan&met=index&typ=json&ua=wap&sub_site_id=0&cat_id='+index+'&k=&u=', '', suc);
  },
  groupsGoodsDetail:function (id,id2,suc) {//拼团商品详情
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=goods&typ=json&goods_id='+id+'&k=&u=&cid=&lbs_geo=&ua=wap&miaoshaid=0&lbs_geo_wechat=&pt_detail_id='+id2, '', suc);
  },
  productDetail:function (id,id2,suc) {//普通商品详情
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=goods&typ=json&goods_id='+id+'&k=&u=&cid=&lbs_geo=&ua=wap&miaoshaid=0&lbs_geo_wechat=&miaoshaid='+id2, '', suc);
  },
  brandlist:function (suc) {//品牌专区
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Brand&met=act_brandlists&typ=json','', suc);
  },
  productGoodsDetail:function (id,page,suc) {//商品列表点击显示搜索详情
      commentJs.doPostGet('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=goodslist&typ=json&ua=wap&sub_site_id=0&cat_id='+id+'&qazdfg=1522814419&pagesize=10&curpage='+page+'&firstRow=0&cat_id='+id, '', suc);
  },
  GoodsCodeDetail:function (id,suc) {//二维码
      var code_data = {
          'k':'BSUAcAFrVCFdV1E5BDYEbQk1UGdcOl45BDFSJwA1Dm4HMwRuBWRSCgQ4AGVUP1E1XXZUIFBuUWECf1JeWmVaNgVtADM=',
          'u':'10088',
          'goods_id':id,
          'miaoshaid':0
      }
      commentJs.doPostPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=getGoodser&typ=json', code_data, suc);
  }
}

