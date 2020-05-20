import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "group-foo" */'@/views/home/index'),
        name: 'Home',
        meta: { title: '欢迎' }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "group-foo" */'@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "group-foo" */'@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "group-foo" */'@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "group-foo" */'@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
