import userGroup from './group/user.js'
import adminUserGroup from './group/admin-user.js'
import adminUserRoleGroup from './group/admin-user-role.js'
import adminRoleGroup from './group/admin-role.js'
import adminRoleMenuGroup from './group/admin-role-menu.js'
import adminMenuGroup from './group/admin-menu.js'
import adminModelGroup from './group/admin-model.js'
import adminParamGroup from './group/admin-param.js'
import orderGiftBundleGroup from './group/order-gift-bundle.js'
import orderBundleOrderGroup from './group/order-bundle-order.js'
import orderReservePurchaseGroup from './group/order-reserve-purchase.js'
import posCardGroup from './group/pos-card.js'
import promotionCoupon from './group/promotion-coupon.js'
import promotionCouponSearch from './group/promotion-couponSearch.js'
import assembleTemplate from "./group/assemble-template"
import assembleOrder from "./group/assemble-order"
import promotionTemplateMsgGroup from './group/promotion-templateMsg.js'
import payAsMember from './group/pay-as-member'
import merchantCouponTemplate from './group/merchant-coupon-template'
import payCourtesy from './group/payCourtesy'
import channelSendCouponMerchant from './group/channel-send-coupon-merchant'
import channelSendCouponTemplate from './group/channel-send-coupon-template'
import specialActivity from './group/special-activity'
import appointmentGoodsTemplate from './group/appointment-goods-template'
import appointmentGoodsOrder from './group/appointment-goods-order'
import pltadminBanner from './group/pltadmin-banner'
import sceneMarket from './group/scene-market'
import dimensionalBarcode from './group/dimensional-barcode'
import groupSetting from './group/group-setting'
import commodityTemplate from './group/commodity-template'
import commodityOrder from './group/commodity-order'

export default {
  install (Vue) {
    Vue.prototype.$api = this
  },
  user: userGroup,
  adminUser: adminUserGroup,
  adminUserRole: adminUserRoleGroup,
  adminRole: adminRoleGroup,
  adminRoleMenu: adminRoleMenuGroup,
  adminMenu: adminMenuGroup,
  adminModel: adminModelGroup,
  adminParam: adminParamGroup,
  orderGiftBundle: orderGiftBundleGroup,
  orderBundleOrder: orderBundleOrderGroup,
  orderReservePurchase: orderReservePurchaseGroup,
  posCard: posCardGroup,
  promotionCoupon: promotionCoupon,
  promotionCouponSearch: promotionCouponSearch,
  assemble: assembleTemplate,
  assembleOrder: assembleOrder,
  promotionTemplateMsg: promotionTemplateMsgGroup,
  payAsMember: payAsMember,
  merchantCouponTemplate: merchantCouponTemplate,
  payCourtesy: payCourtesy,
  channelSendCouponMerchant: channelSendCouponMerchant,
  channelSendCouponTemplate: channelSendCouponTemplate,
  specialActivity: specialActivity,
  appointmentGoodsTemplate: appointmentGoodsTemplate,
  appointmentGoodsOrder: appointmentGoodsOrder,
  pltadminBanner: pltadminBanner,
  sceneMarket: sceneMarket,
  dimensionalBarcode: dimensionalBarcode,
  groupSetting: groupSetting,
  commodityTemplate: commodityTemplate,
  commodityOrder: commodityOrder,
}
