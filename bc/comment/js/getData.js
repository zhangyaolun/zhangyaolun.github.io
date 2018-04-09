
var o = {
  login:function () {//登录
      var login_data = {
          'k':'BSUAcAFrVCFdV1E5BDYEbQk1UGdcOl45BDFSJwA1Dm4HMwRuBWRSCgQ4AGVUP1E1XXZUIFBuUWECf1JeWmVaNgVtADM=',
          'u':'10088'
      }
      commentJs.doPostPost('http://ucenter.g-town.com.cn/index.php?ctl=User&met=editMobileInfo&typ=json', login_data, suc);
  },
  homeGetDate:function (suc) {//首页
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Index&met=index&typ=json&ua=wap&sub_site_id=0', '', suc);
  },
  homeNews:function (suc) {//首页快报
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Uart&met=index_uartlist&typ=json&ua=wap&sub_site_id=0', '', suc);
  },
  seckillGoods:function (suc) {//首页秒杀商品数据
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Miaosha&met=getmiaoshalist&typ=json&ua=wap&sub_site_id=0&k=&u=', '', suc);
  },
  groupsGoods:function (index,suc) {//首页秒杀商品数据
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=PinTuan&met=index&typ=json&ua=wap&sub_site_id=0&cat_id='+index+'&k=&u=', '', suc);
  },
  productDetail:function (id,id2,suc) {//普通商品详情
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=goods&typ=json&goods_id='+id+'&k=&u=&cid=&lbs_geo=&ua=wap&miaoshaid=0&lbs_geo_wechat=&miaoshaid='+id2, '', suc);
  },
  brandlist:function (suc) {//品牌专区
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Brand&met=act_brandlists&typ=json','', suc);
  },
  productList:function (suc) {//商品主列表
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Cat&met=wap_cat&typ=json&cat_parent_id=0', '', suc);
  },
  productListDetail:function (id,suc) {//商品主列表详情
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Cat&met=wap_tree&typ=json&cat_parent_id='+id, '', suc);
  },
  productGoodsDetail:function (id,page,suc) {//商品列表点击显示搜索详情
      commentJs.doPost('http://paycenter.g-town.com.cn//index.php?ctl=Goods_Goods&met=goodslist&typ=json&ua=wap&sub_site_id=0&cat_id='+id+'&qazdfg=1522814419&pagesize=10&curpage='+page+'&firstRow=0&cat_id='+id, '', suc);
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

