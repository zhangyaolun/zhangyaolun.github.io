import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/home/index'),
                name: 'Home',
                meta: {title: '欢迎'}
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
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    }
]

const createRouter = () => new Router({
    mode: 'hash',
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

export const resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
