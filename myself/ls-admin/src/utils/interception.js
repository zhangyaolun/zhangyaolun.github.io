import store from "../store"
import { setToken, setName, setRegionBlockCode } from '@/utils/auth'

export function jumpToken (to) {
  const jumpToken = to.query.token || ''
  const name = to.query.name || ''
  const regionBlockCode = to.query.regionBlockCode || ''
  if (jumpToken) {
    let url = window.location.href
    setToken(jumpToken)
    setName(name)
    store.dispatch('user/setHref', { token: jumpToken, userName: name, regionBlockCode: regionBlockCode })
    setRegionBlockCode(regionBlockCode)
    sessionStorage.setItem('jumpToken', jumpToken)
    window.location.href = url.indexOf('?') > 0 ? url.split('?')[0] : url
  }
}
// 清楚查询/模版缓存
export function removeAllSearchData (view) {
  if (!view) return

  /* 营销管理 */
  // 优惠券
  if (view.path === '/backend/coupon/list/index') { store.dispatch('coupon/removeSeachData') }
  // 优惠券查询（单页）
  if (view.path === '/backend/couponSearch/couponlist') { store.dispatch('couponSearch/removeQueryData') }
  // 商家券模版
  if (view.path === '/backend/merchantCoupon/templatelist') { store.dispatch('merchantCoupon/removeQuerymerchantCouponQueryData') }
  // 商户管理
  if (view.path === '/backend/channelSendCoupon/merchantManage') { store.dispatch('channelSendCoupon/removeChannelSendCouponMerchantQueryData') }
  // 领券活动管理
  if (view.path === '/backend/channelSendCoupon/templatelist') { store.dispatch('channelSendCouponTemplate/removeChannelSendCouponTemplateQueryData') }
  // 外部投放活动
  if (view.path === '/backend/specialActivity/templatelist') { store.dispatch('specialActivity/removeSpecialActivityTemplateQueryData') }
  // 广告管理（模版）
  if (view.path === '/backend/pltadminBanner/templatelist') { store.dispatch('pltadminBanner/removePltadminBannerTemplateQueryData') }
  // 客群营销
  if (view.path === '/backend/sceneMarket/templatelist') { store.dispatch('sceneMarket/removeSceneMarketQueryData') }

  /* 订单管理 */
  // 拼团模版
  if (view.path === '/backend/assemble/templatelist') { store.dispatch('assemble/removeAssembleData') }
  // 拼团订单
  if (view.path === '/backend/assemble/orderlist') { store.dispatch('assemble/removeorderAssembleData') }
  // 预约购买订单
  if (view.path === '/backend/on-line/reserve-purchase/index') { store.dispatch('reservePurchase/removeReservePurchaseQueryData') }
  // 特惠券包模版
  if (view.path === '/backend/on-line/gift/bundle/index') { store.dispatch('giftBundle/removeGiftTemplateQueryData') }
  // 特惠券包订单
  if (view.path === '/backend/on-line/gift/order/index') { store.dispatch('giftBundle/removeGiftOrderQueryData') }
  // 支付有礼活动管理
  if (view.path === '/backend/payCourtesyTemplate/templatelist') { store.dispatch('payCourtesy/removePayCourtesyQueryData') }
  // 预购商品管理(模版)
  if (view.path === '/backend/appointmentGoods/templatelist') { store.dispatch('appointmentGoods/removeAppointmentGoodsTemplateQueryData') }
  // 预购商品订单管理
  if (view.path === '/backend/appointmentGoods/orderlist') { store.dispatch('appointmentGoods/removeAppointmentGoodsOrderQueryData') }
  // 商品管理(模版)
  if (view.path === '/backend/commodity/templatelist') { store.dispatch('commodity/removeCommodityTemplateQueryData') }
  // 商品订单管理
  if (view.path === '/backend/commodity/orderlist') { store.dispatch('commodity/removeCommodityOrderQueryData') }

}

// 清除tagsView
export function removeAllTagsView (from, to) {
  if (from.meta.removeTagsView) {
    store.dispatch('tagsView/delVisitedView', { path: from.path })
  }
}
