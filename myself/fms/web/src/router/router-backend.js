export const MenuToPathMap = {
    /************************************   商品配置   *******************************************/
    'brandGoods_brand_list': { // 品牌管理
        routes: [
            {
                component: () => import(/* webpackChunkName: "brandGoods_configure" */  '@/views/brandGoods/brand/templateList/index'),
                path: '/brandList',
                hidden: false
            },
            // {
            //   component: () => import('@/views/assemble/index2'),
            //   path: 'assemble/templatecreate',
            //   hidden: true,
            //   title: '添加品牌',
            //   activeMenu: '/backend/assemble/templatelist',
            //   meta: {
            //     removeTagsView: true
            //   }
            // }
        ]
    },
    'brandGoods_goods_list': { // 商品管理
        routes: [
            {
                component: () => import(/* webpackChunkName: "brandGoods_configure" */ '@/views/brandGoods/goods/templateList/index'),
                path: '/goodsList',
                hidden: false
            }
        ]
    },
    'brandGoods_channel_list': { // 渠道商品匹配
        routes: [
            {
                component: () => import(/* webpackChunkName: "brandGoods_configure" */ '@/views/brandGoods/channel/templateList/index'),
                path: '/channelGoodsList',
                hidden: false
            }
        ]
    },
    /************************************   订单管理   *******************************************/
    'order_channel': { // 渠道订单管理
        routes: [
            {
                component: () => import(/* webpackChunkName: "order_configure" */ '@/views/order/orderChannel/templateList/index'),
                path: '/orderChannel',
                hidden: false
            },
        ]
    },
    'order_daySales_list': { // 日销量订单汇总
        routes: [
            {
                component: () => import(/* webpackChunkName: "order_configure" */ '@/views/order/orderDaySalesList/templateList/index'),
                path: '/orderDaySalesList',
                hidden: false
            }
        ]
    },
    'order_fail_list': { // 失败订单列表
        routes: [
            {
                component: () => import(/* webpackChunkName: "order_configure" */ '@/views/order/orderFailList/templateList/index'),
                path: '/orderFailList',
                hidden: false
            }
        ]
    },
    /************************************   卡密配置   *******************************************/
    'card_list': { // 卡券管理
        routes: [
            {
                component: () => import(/* webpackChunkName: "card_configure" */ '@/views/cardConfigure/cardList/templateList/index'),
                path: '/cardList',
                hidden: false
            },
        ]
    },
    'card_record_list': { // 卡券生成记录
        routes: [
            {
                component: () => import(/* webpackChunkName: "card_configure" */ '@/views/cardConfigure/cardRecordList/templateList/index'),
                path: '/cardRecordList',
                hidden: false
            }
        ]
    },
    /************************************   渠道配置   *******************************************/
    'channel_list': { // 渠道管理
        routes: [
            {
                component: () => import(/* webpackChunkName: "channel_configure" */ '@/views/channelConfigure/channelList/templateList/index'),
                path: '/channelList',
                hidden: false
            },
        ]
    }
}
