import { regionBlockCode } from '@/filters/index'

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  regionBlockCode: state => state.user.regionBlockCode,
  regionBlockCodeName: state => regionBlockCode(state.user.regionBlockCode),
  // 允许的所有的路由
  permission_routes: state => state.permission.routes,
  // 后端返回的路由
  addRoutes: state => state.permission.addRoutes,
  sysModels: state => state.permission.sysModels,

  defaultSys: state => state.system.defaultSys,
  allSystems: state => state.system.allSystems,
  // 优惠券数据
  couponData: state => state.coupon.couponData,
  couponSeachData: state => state.coupon.seachData,
  // 优惠券查询(单独页面)
  couponQueryData: state => state.couponSearch.queryData,
  // 拼团模版,拼团订单
  assembleLoading: state => state.assemble.loading,
  assembleSeachData: state => state.assemble.seachData,
  orderAssembleData: state => state.assemble.orderAssembleData,
  // 特惠券包模版,特惠券包订单
  giftTemplateQueryData: state => state.giftBundle.giftTemplateQueryData,
  giftOrderQueryData: state => state.giftBundle.giftOrderQueryData,
  // 预约购买订单查询
  reservePurchaseQueryData: state => state.reservePurchase.reservePurchaseQueryData,
  // 商家券模版
  merchantCouponInfo: state => {
    let _merchantCouponInfo = sessionStorage.getItem('merchantCouponInfo')
    return _merchantCouponInfo ? JSON.parse(_merchantCouponInfo) : state.merchantCoupon.info
  },
  merchantCouponLoading: state => state.merchantCoupon.loading,
  querymerchantCouponQueryData: state => state.merchantCoupon.querymerchantCouponQueryData,
  // 支付有礼活动
  payCourtesyInfo: state => {
    let _payCourtesyInfo = sessionStorage.getItem('payCourtesyInfo')
    return _payCourtesyInfo ? JSON.parse(_payCourtesyInfo) : state.payCourtesy.info
  },
  payCourtesyLoading: state => state.payCourtesy.loading,
  payCourtesyQueryData: state => state.payCourtesy.payCourtesyQueryData,
  // 渠道领券商户管理
  channelSendCouponMerchantQueryData: state => state.channelSendCoupon.channelSendCouponMerchantQueryData,
  channelSendCouponTemplateQueryData: state => state.channelSendCouponTemplate.channelSendCouponTemplateQueryData,
  channelSendCouponTemplateOnlyQueryData: state => state.channelSendCouponTemplate.channelSendCouponTemplateOnlyQueryData,
  channelSendCouponTemplateLoading: state => state.channelSendCouponTemplate.loading,
  channelSendCouponTemplateInfo: state => {
    let _channelSendCouponTemplateInfo = sessionStorage.getItem('channelSendCouponTemplateInfo')
    return _channelSendCouponTemplateInfo ? JSON.parse(_channelSendCouponTemplateInfo) : state.channelSendCouponTemplate.info
  },
  /* 预约购买 */
  appointmentGoodsLoading: state => state.appointmentGoods.loading,
  // 预购商品模版
  appointmentGoodsInfo: state => state.appointmentGoods.info,
  appointmentGoodsTemplateQueryData: state => state.appointmentGoods.appointmentGoodsTemplateQueryData,
  // 预购订单查询
  appointmentGoodsOrderQueryData: state => state.appointmentGoods.appointmentGoodsOrderQueryData,
  // 外部投放活动
  specialActivityLoading: state => state.specialActivity.loading,
  specialActivityInfo: state => state.specialActivity.info,
  specialActivityTemplateQueryData: state => state.specialActivity.specialActivityTemplateQueryData,
  // 广告管理
  pltadminBannerLoading: state => state.pltadminBanner.loading,
  pltadminBannerInfo: state => state.pltadminBanner.info,
  pltadminBannerDisplayTypeList: state => state.pltadminBanner.displayTypeList,
  pltadminBannerTemplateQueryData: state => state.pltadminBanner.pltadminBannerTemplateQueryData,
  // 模版消息
  wechatTemplateLoading: state => state.wechatTemplate.loading,
  wechatTemplateForm: state => state.wechatTemplate.form,
  wechatTemplateMarketForm: state => state.wechatTemplate.marketForm,
  // 客群营销管理
  sceneMarketInfo: state => state.sceneMarket.info,
  sceneMarketLoading: state => state.sceneMarket.loading,
  sceneMarketQueryData: state => state.sceneMarket.sceneMarketQueryData,
  sceneMarketCustomerList: state => state.sceneMarket.customerList,
  // 客群营销管理
  commodityInfo: state => state.commodity.info,
  commodityLoading: state => state.commodity.loading,
  commodityQueryData: state => state.commodity.sceneMarketQueryData,
  commodityOrderQueryData: state => state.commodity.commodityOrderQueryData
}
export default getters
