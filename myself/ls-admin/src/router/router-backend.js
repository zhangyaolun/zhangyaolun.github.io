// menu map path
export const MenuToPathMap = {
  // 优惠券
  'promotion_system-coupon': {
    routes: [
      {
        component: () => import('@/views/promotion/coupon/index'),
        path: '/promotion/coupon/index'
      }
    ]
  },
  // 优惠码
  'promotion_system-lawson_voucher_code': {
    routes: [
      {
        component: () => import('@/views/promotion/voucher-code/lawson-voucher-code/index'),
        path: '/promotion/code/lawson_voucher_code/index'
      }
    ]
  },
  'promotion_system-third_voucher_code': {
    routes: [
      {
        component: () => import('@/views/promotion/voucher-code/third-voucher-code/index'),
        path: '/promotion/code/third_voucher_code/index'
      }
    ]
  },
  // 抽奖
  'promotion_system-prize': {
    routes: [
      {
        component: () => import('@/views/promotion/prize/index'),
        path: '/promotion/prize/index'
      }
    ]
  },
  // 活动
  'promotion_system-centralization_activity': {
    routes: [
      {
        path: '/promotion/activity/centralization_activity/index',
        component: () => import('@/views/promotion/activity/centralization/list/index')
      },
      {
        path: '/promotion/activity/centralization_activity/create',
        component: () => import('@/views/promotion/activity/centralization/create/index')
      },
      {
        path: '/promotion/activity/centralization_activity/detail',
        component: () => import('@/views/promotion/activity/centralization/detail/index')
      }
    ]
  },

  'promotion_system-check_ins_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/check-ins/index'),
        path: '/promotion/activity/check_ins/index'
      }
    ]
  },
  'promotion_system-distribution_after_purchase_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/distribution-after-purchase/index'),
        path: '/promotion/activity/distribution_after_purchase_activity/index'
      }
    ]
  },
  'promotion_system-egg_twisting_draw_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/egg-twisting-draw/index'),
        path: '/promotion/activity/egg_twisting_draw_activity/index'
      }
    ]
  },
  'promotion_system-friend_invitation_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/friend-invitation/index'),
        path: '/promotion/activity/friend_invitation_activity/index'
      }
    ]
  },
  'promotion_system-membership_tasks_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/membership-tasks/index'),
        path: '/promotion/activity/membership_tasks_activity/index'
      }
    ]
  },
  'promotion_system-random_seizure_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/random-seizure/index'),
        path: '/promotion/activity/random_seizure_activity/index'
      }
    ]
  },
  'promotion_system-registration_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/registration/index'),
        path: '/promotion/activity/registration_activity/index'
      }
    ]
  },
  // promotion_system_activity-2
  'promotion_system-ticket_activity': {
    routes: [
      {
        component: () => import('@/views/promotion/activity/ticket/index'),
        path: '/promotion/activity/ticket_activity/index'
      }
    ]
  },
  'member-sys_system_user': {
    routes: [
      {
        component: () => import('@/views/member/user/index'),
        path: 'member/user/index',
        hidden: false
      }
    ]
  },
  'member-sys_system_menu': {
    routes: [
      {
        component: () => import('@/views/member/menu/index'),
        path: 'member/menu/index',
        hidden: false
      }
    ]
  },
  'member-sys_system_model': {
    routes: [
      {
        component: () => import('@/views/member/model/index'),
        path: 'member/model/index',
        hidden: false
      }
    ]
  },
  'member-sys_system_role': {
    routes: [
      {
        component: () => import('@/views/member/role/index'),
        path: 'member/role/index',
        hidden: false
      }
    ]
  },
  'member-sys_system_param': {
    routes: [
      {
        component: () => import('@/views/member/param/index'),
        path: 'member/param/index',
        hidden: false
      }
    ]
  },
  'pos-sys_stored-value-card_card': {
    routes: [
      {
        component: () => import('@/views/POS/card/index.vue'),
        path: 'pos/card/index',
        hidden: false
      }
    ]
  },
  'online-sys_order_gift-bundle': {
    routes: [
      {
        component: () => import('@/views/order/gift-bundle/bundle-list/index'),
        path: 'on-line/gift/bundle/index',
        hidden: false
      },
      {
        component: () => import('@/views/order/gift-bundle/bundle-create/index.vue'),
        path: 'on-line/gift/bundle/create',
        hidden: true,
        title: '创建优惠券包',
        activeMenu: '/backend/on-line/gift/bundle/index',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/gift-bundle/bundle-edit/index.vue'),
        path: 'on-line/gift/bundle/edit/:id',
        hidden: true,
        title: '编辑优惠券包',
        activeMenu: '/backend/on-line/gift/bundle/index',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/gift-bundle/bundle-detail/index.vue'),
        path: 'on-line/gift/bundle/detail/:id',
        hidden: true,
        title: '优惠券包详情',
        activeMenu: '/backend/on-line/gift/bundle/index'
      }
    ]
  },
  'online-sys_order_gift-order': {
    routes: [
      {
        component: () => import('@/views/order/bundle-order/bundle-order-list/index.vue'),
        path: 'on-line/gift/order/index',
        hidden: false
      },
      {
        component: () => import('@/views/order/bundle-order/bundle-order-detail/index.vue'),
        path: 'on-line/gift/order/detail/:id',
        hidden: true,
        title: '优惠券订单列表',
        activeMenu: '/backend/on-line/gift/order/index'
      }
    ]
  },
  'online-sys_order_reserve-purchase': {
    routes: [
      {
        component: () => import('@/views/order/reserve-purchase/reserve-purchase-list/index.vue'),
        path: 'on-line/reserve-purchase/index',
        hidden: false
      },
      {
        component: () => import('@/views/order/reserve-purchase/reserve-purchase-detail/index.vue'),
        path: 'on-line/reserve-purchase/detail/:id',
        hidden: true,
        title: '优惠券订单详情',
        activeMenu: '/backend/on-line/reserve-purchase/index'
      }
    ]
  },
  'online-sys_pay-courtesy': { // 支付有礼
    routes: [
      {
        component: () => import('@/views/market/pay-courtesy/pay-courtesy-template/template-list/index.vue'),
        path: 'payCourtesyTemplate/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/pay-courtesy/pay-courtesy-template/template-create/index'),
        path: 'payCourtesyTemplate/templatecreate',
        hidden: true,
        title: '新建发券活动',
        activeMenu: '/backend/payCourtesyTemplate/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/pay-courtesy/pay-courtesy-template/template-mod/index'),
        path: 'payCourtesyTemplate/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑发券活动',
        activeMenu: '/backend/payCourtesyTemplate/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/pay-courtesy/pay-courtesy-template/template-detail/index'),
        path: 'payCourtesyTemplate/templatedetail/:id(\\d+)',
        hidden: true,
        title: '发券活动详情',
        activeMenu: '/backend/payCourtesyTemplate/templatelist'
      }
    ]
  },
  'online-sys_order_assemble-template': {
    routes: [
      {
        component: () => import('@/views/order/assemble/assemble-template/template-list/index'),
        path: 'assemble/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/order/assemble/assemble-template/template-create/index'),
        path: 'assemble/templatecreate',
        hidden: true,
        title: '创建拼团模版',
        activeMenu: '/backend/assemble/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/assemble/assemble-template/template-detail/index'),
        path: 'assemble/templatedetail/:id(\\d+)',
        hidden: true,
        title: '拼团模版详情',
        activeMenu: '/backend/assemble/templatelist'
      },
      {
        component: () => import('@/views/order/assemble/assemble-template/template-mod/index'),
        path: 'assemble/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑拼团模版',
        activeMenu: '/backend/assemble/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'online-sys_order_assemble-order': {
    routes: [
      {
        component: () => import('@/views/order/assemble/assemble-order/order-list/index'),
        path: 'assemble/orderlist',
        hidden: false
      },
      {
        component: () => import('@/views/order/assemble/assemble-order/order-detail/index'),
        path: 'assemble/orderdetail/:id(\\d+)',
        hidden: true,
        title: '拼团订单详情',
        activeMenu: '/backend/assemble/orderlist'
      }
    ]
  },
  'online-sys_order_appointment_goods-template': {
    routes: [
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-template/template-list/index'),
        path: 'appointmentGoods/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-template/template-create/index'),
        path: 'appointmentGoods/templatecreate',
        hidden: true,
        title: '新建预购商品模版',
        activeMenu: '/backend/appointmentGoods/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-template/template-detail/index'),
        path: 'appointmentGoods/templatedetail/:id(\\d+)',
        hidden: true,
        title: '预购商品详情',
        activeMenu: '/backend/appointmentGoods/templatelist'
      },
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-template/template-mod/index'),
        path: 'appointmentGoods/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑预购商品模版',
        activeMenu: '/backend/appointmentGoods/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-template/searchShopList/index'),
        path: 'appointmentGoods/searchShopList/:id(\\d+)',
        hidden: true,
        title: '预购商品适用门店',
        activeMenu: '/backend/appointmentGoods/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'online-sys_order_appointment_goods-order': {
    routes: [
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-order/order-list/index'),
        path: 'appointmentGoods/orderlist',
        hidden: false
      },
      {
        component: () => import('@/views/order/appointment-goods/appointment-goods-order/order-detail/index'),
        path: 'appointmentGoods/orderdetail/:id(\\d+)',
        hidden: true,
        title: '预购订单详情',
        activeMenu: '/backend/appointmentGoods/orderlist'
      }
    ]
  },
  'online-sys_order_commodity-template': {
    routes: [
      {
        component: () => import('@/views/order/commodity/commodity-template/template-list/index'),
        path: 'commodity/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/order/commodity/commodity-template/template-create/index'),
        path: 'commodity/templatecreate',
        hidden: true,
        title: '新建商品模版',
        activeMenu: '/backend/commodity/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/order/commodity/commodity-template/template-detail/index'),
        path: 'commodity/templatedetail/:id(\\d+)',
        hidden: true,
        title: '商品详情',
        activeMenu: '/backend/commodity/templatelist'
      },
      {
        component: () => import('@/views/order/commodity/commodity-template/template-mod/index'),
        path: 'commodity/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑商品模版',
        activeMenu: '/backend/commodity/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'online-sys_order_commodity-order': {
    routes: [
      {
        component: () => import('@/views/order/commodity/commodity-order/order-list/index'),
        path: 'commodity/orderlist',
        hidden: false
      },
      {
        component: () => import('@/views/order/commodity/commodity-order/order-detail/index'),
        path: 'commodity/orderdetail/:id(\\d+)',
        hidden: true,
        title: '商品订单详情',
        activeMenu: '/backend/commodity/orderlist'
      }
    ]
  },
  'market-sys_coupon': {
    routes: [
      {
        component: () => import('@/views/coupon/coupon-list/index'),
        path: 'coupon/list/index',
        hidden: false
      },
      {
        component: () => import('@/views/coupon/coupon-create/index'),
        path: 'coupon/create',
        hidden: true,
        title: '创建优惠券',
        activeMenu: '/backend/coupon/list/index',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/coupon/coupon-detail/index'),
        path: 'coupon/detail/:id(\\d+)',
        hidden: true,
        title: '优惠券详情',
        activeMenu: '/backend/coupon/list/index'
      },
      {
        component: () => import('@/views/coupon/coupon-mod/index'),
        path: 'coupon/mod/:id(\\d+)',
        hidden: true,
        title: '编辑优惠券',
        activeMenu: '/backend/coupon/list/index',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/coupon/coupon-copy/index'),
        path: 'coupon/copy/:id(\\d+)',
        hidden: true,
        title: '创建优惠券 ',
        activeMenu: '/backend/coupon/list/index',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/coupon/template-component/coupon-confirmation/index'),
        path: 'coupon/confirmation',
        hidden: true,
        title: '优惠券确认',
        activeMenu: '/backend/coupon/list/index',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_coupon-search': { // 优惠券查询（单独）
    routes: [
      {
        component: () => import('@/views/coupon/coupon-search/coupon-list/index'),
        path: 'couponSearch/couponlist',
        hidden: false
      }
    ]
  },
  'market-sys_coupon-export': { // 优惠券查询导出
    routes: [
      {
        component: () => import('@/views/coupon/coupon-search/coupon-export/index'),
        path: 'couponSearch/couponExport',
        hidden: false
      }
    ]
  },
  'market-sys_wechat-template': {
    routes: [
      {
        component: () => import('@/views/WechatTemplate/WechatTemplateList'),
        path: 'wechat-template-msg/list',
        hidden: false
      },
      {
        component: () => import('@/views/WechatTemplate/WechatTemplateCreate'),
        path: 'wechat-template-msg/create',
        hidden: true,
        activeMenu: '/backend/wechat-template-msg/list',
        title: '创建模版消息'
      }
    ]
  },
  'market-sys_payasmember': {
    routes: [
      {
        component: () => import('@/views/reportForm/pay-as-member/pay-as-member-list/index'),
        path: 'payAsMember/payAsMemberList',
        hidden: false,
        title: '支付即会员交易记录检索'
      }
    ]
  },
  'market-sys_merchant_coupon-template': {
    routes: [
      {
        component: () => import('@/views/market/merchant-coupon/merchant-coupon-template/template-list/index'),
        path: 'merchantCoupon/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/merchant-coupon/merchant-coupon-template/template-create/index'),
        path: 'merchantCoupon/templatecreate',
        hidden: true,
        title: '新建商家券模版',
        activeMenu: '/backend/merchantCoupon/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/merchant-coupon/merchant-coupon-template/template-detail/index'),
        path: 'merchantCoupon/templatedetail/:id(\\d+)',
        hidden: true,
        title: '商家券模版详情',
        activeMenu: '/backend/merchantCoupon/templatelist'
      },
      {
        component: () => import('@/views/market/merchant-coupon/merchant-coupon-template/template-mod/index'),
        path: 'merchantCoupon/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑商家券模版',
        activeMenu: '/backend/merchantCoupon/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/merchant-coupon/merchant-coupon-upload/upload-list/index'),
        path: 'merchantCoupon/uploadList/:id(\\d+)',
        hidden: true,
        title: '上传商家券',
        activeMenu: '/backend/merchantCoupon/templatelist'
      }
    ]
  },
  'market-sys_channel_send_coupon-merchant-manage': { // 商户管理
    routes: [
      {
        component: () => import('@/views/market/channel-send-coupon/merchant-manage/index'),
        path: 'channelSendCoupon/merchantManage',
        hidden: false
      }
    ]
  },
  'market-sys_channel_send_coupon-coupon-template': { // 领券活动管理
    routes: [
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template/template-list/index'),
        path: 'channelSendCoupon/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template/template-create/index'),
        path: 'channelSendCoupon/templatecreate',
        hidden: true,
        title: '新建领券活动',
        activeMenu: '/backend/channelSendCoupon/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template/template-detail/index'),
        path: 'channelSendCoupon/templatedetail/:id(\\d+)',
        hidden: true,
        title: '领券活动详情',
        activeMenu: '/backend/channelSendCoupon/templatelist'
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template/template-mod/index'),
        path: 'channelSendCoupon/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑领券活动',
        activeMenu: '/backend/channelSendCoupon/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template/receive-list/index'),
        path: 'channelSendCoupon/templateReceivelist/:key',
        hidden: true,
        title: '查看优惠券领取',
        activeMenu: '/backend/channelSendCoupon/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_channel_send_coupon-coupon-template-onlyQuery': { // 领券活动管理仅查询
    routes: [
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template-onlyQuery/template-list/index'),
        path: 'channelSendCoupon/templateOnlyQuerylist',
        hidden: false
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template-onlyQuery/template-detail/index'),
        path: 'channelSendCoupon/templateOnlyQueryDetail/:id(\\d+)',
        hidden: true,
        title: '领券活动详情 ',
        activeMenu: '/backend/channelSendCoupon/templateOnlyQuerylist'
      },
      {
        component: () => import('@/views/market/channel-send-coupon/coupon-template-onlyQuery/receive-list/index'),
        path: 'channelSendCoupon/templateOnlyQueryReceivelist/:key',
        hidden: true,
        title: '查看优惠券领取 ',
        activeMenu: '/backend/channelSendCoupon/templateOnlyQuerylist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_special-activity-template': { // 外部投放活动
    routes: [
      {
        component: () => import('@/views/market/special-activity/special-activity-template/template-list/index'),
        path: 'specialActivity/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/special-activity/special-activity-template/template-create/index'),
        path: 'specialActivity/templatecreate',
        hidden: true,
        title: '新建外部投放活动',
        activeMenu: '/backend/specialActivity/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/special-activity/special-activity-template/template-detail/index'),
        path: 'specialActivity/templatedetail/:id(\\d+)',
        hidden: true,
        title: '外部投放活动详情',
        activeMenu: '/backend/specialActivity/templatelist'
      },
      {
        component: () => import('@/views/market/special-activity/special-activity-template/template-mod/index'),
        path: 'specialActivity/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑外部投放活动',
        activeMenu: '/backend/specialActivity/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_roperationLog-coupon': { // 查询领券活动的操作日志
    routes: [
      {
        component: () => import('@/views/market/special-activity/special-activity-log/log-list/index'),
        path: 'specialActivity/loglist',
        hidden: false
      },
      {
        component: () => import('@/views/market/special-activity/special-activity-log/log-detail/index'),
        path: 'specialActivity/logdetail/:id(\\d+)',
        hidden: true,
        title: '操作日志详情',
        activeMenu: '/backend/specialActivity/loglist'
      }
    ]
  },
  'market-sys_pltadmin-banner': { // 广告管理
    routes: [
      {
        component: () => import('@/views/market/pltadmin-banner/banner-template/template-list/index'),
        path: 'pltadminBanner/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/pltadmin-banner/banner-template/template-create/index'),
        path: 'pltadminBanner/templatecreate',
        hidden: true,
        title: '新建广告模版',
        activeMenu: '/backend/pltadminBanner/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/pltadmin-banner/banner-template/template-mod/index'),
        path: 'pltadminBanner/templatemod/:id(\\d+)',
        hidden: true,
        title: '编辑广告模版',
        activeMenu: '/backend/pltadminBanner/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_scene-market-template': { // 场景营销管理
    routes: [
      {
        component: () => import('@/views/market/scene-market/scene-template/template-list/index'),
        path: 'sceneMarket/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/scene-market/scene-template/template-create/timingCreate'),
        path: 'sceneMarket/timingCreate',
        hidden: true,
        title: '新建定时营销',
        activeMenu: '/backend/sceneMarket/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/scene-market/scene-template/template-create/secneCreate'),
        path: 'sceneMarket/secneCreate',
        hidden: true,
        title: '新建客群营销',
        activeMenu: '/backend/sceneMarket/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/scene-market/scene-template/template-detail/index'),
        path: 'sceneMarket/templatedetail/:id(\\d+)',
        hidden: true,
        title: '营销详情',
        activeMenu: '/backend/sceneMarket/templatelist'
      },
      {
        component: () => import('@/views/market/scene-market/scene-template/template-mod/timingMod'),
        path: 'sceneMarket/timingMod/:id(\\d+)',
        hidden: true,
        title: '编辑定时营销',
        activeMenu: '/backend/sceneMarket/templatelist',
        meta: {
          removeTagsView: true
        }
      },
      {
        component: () => import('@/views/market/scene-market/scene-template/template-mod/secneMod'),
        path: 'sceneMarket/secneMod/:id(\\d+)',
        hidden: true,
        title: '编辑客群营销',
        activeMenu: '/backend/sceneMarket/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_scene-market-activity-tracking': { // 活动追踪
    routes: [
      {
        component: () => import('@/views/market/scene-market/activity-tracking/template-list'),
        path: 'activityTracking/templatelist',
        hidden: false
      },
      {
        component: () => import('@/views/market/scene-market/user-statistics/template-list'),
        path: 'userStatistics/templatelist',
        hidden: true,
        title: '用户统计',
        activeMenu: '/backend/activityTracking/templatelist',
        meta: {
          removeTagsView: true
        }
      }
    ]
  },
  'market-sys_scene-market-black-list': { // 黑名单管理
    routes: [
      {
        component: () => import('@/views/market/scene-market/black-list/template-list'),
        path: 'blackList/templatelist',
        hidden: false
      }
    ]
  },
  'market-sys_scene-market-group-setting': { // 客群设定
    routes: [
      {
        component: () => import('@/views/market/scene-market/group-setting/template-list'),
        path: 'groupSetting/templatelist',
        hidden: false
      }
    ]
  },
  'market-sys_scene-market-statistical-label': { // 统计标签
    routes: [
      {
        component: () => import('@/views/market/scene-market/statistical-label/template-list'),
        path: 'statisticalLabel/templatelist',
        hidden: false
      }
    ]
  },
  'market-sys_dimensional-barcode': { // 二维码管理
    routes: [
      {
        component: () => import('@/views/market/dimensional-barcode/template/template-create'),
        path: 'dimensionalBarcode/templateCreate',
        hidden: false
      }
    ]
  },
}
