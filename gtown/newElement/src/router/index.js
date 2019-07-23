import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [{
    path: '',
    component: Layout,
    redirect: 'channellist',
    name: '渠道管理',
    meta: { title: '渠道管理', icon: 'list', noCache: true },
    children: [{
      path: 'channellist',
      component: () => import('@/views/dashboard/index'),
      name: '渠道订单管理',
      meta: { title: '渠道订单管理' }
    },{
      path: 'adminchannel',
      component: () => import('@/views/adminChannel/index'),
      name: '管理渠道',
      meta: { title: '管理渠道' }
    }]
  },{
    path: '/shopClass',
    component: Layout,
    redirect: 'shopClass',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'excel', noCache: true },
    children: [{
      path: 'shopClass',
      component: () => import('@/views/shop/shopClass'),
      name: '分类管理',
      meta: { title: '分类管理' }
    }]
  },{
    path: '/orderSale',
    component: Layout,
    redirect: 'orderSale',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'excel', noCache: true },
    children: [{
      path: 'orderSale',
      component: () => import('@/views/order/orderSale'),
      name: '销售订单查询',
      meta: { title: '销售订单查询' }
    },{
      path: 'orderSaleSub',
      component: () => import('@/views/order/orderSaleSub'),
      name: '销售子订单查询',
      meta: { title: '销售子订单查询' }
    },{
      path: 'orderRate',
      component: () => import('@/views/order/orderRate'),
      name: '费率异常订单',
      meta: { title: '费率异常订单' }
    },{
      path: 'orderAddress',
      component: () => import('@/views/order/orderAddress'),
      name: '收货地址异常订单',
      meta: { title: '收货地址异常订单' }
    },{
      path: 'orderShopstock',
      component: () => import('@/views/order/orderShopstock'),
      name: '缺货地址异常订单',
      meta: { title: '缺货地址异常订单' }
    },{
      path: 'orderShopnum',
      component: () => import('@/views/order/orderShopnum'),
      name: '商品编号对应异常',
      meta: { title: '商品编号对应异常' }
    }]
  },{
    path: '/menusIstation',
    component: Layout,
    redirect: 'menusIstation',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'component', noCache: true },
    children: [{
      path: 'menusIstation',
      component: () => import('@/views/adminIstation/menus'),
      name: '菜单管理',
      meta: { title: '菜单管理' }
    },{
      path: 'userIstation',
      component: () => import('@/views/adminIstation/user'),
      name: '账号管理',
      meta: { title: '账号管理' }
    },{
      path: 'roleIstation',
      component: () => import('@/views/adminIstation/role'),
      name: '角色管理',
      meta: { title: '角色管理' }
    },{
      path: 'configIstation',
      component: () => import('@/views/adminIstation/parameter'),
      name: '参数配置',
      meta: { title: '参数配置' }
    },{
      path: 'ruleIstation',
      component: () => import('@/views/adminIstation/rule'),
      name: '规则配置',
      meta: { title: '规则配置' }
    },{
      path: 'templateIstation',
      component: () => import('@/views/adminIstation/execl'),
      name: 'EXECL模版下载',
      meta: { title: 'EXECL模版下载' }
    }]
  }]