import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const destail = r => require.ensure([], () => r(require('../page/destail/destail')), 'destail')
const seach = r => require.ensure([], () => r(require('../page/comment/indexseach')), 'seach')
const pay = r => require.ensure([], () => r(require('../page/shopPay/pay')), 'pay')

  export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home',
            meta: {
		            keepAlive: false, 
		            isBack:false,
		        }
        },
        //首页
        {
            path: '/home',
            name: 'home',
            component: home,
            meta: {
		            keepAlive: true,
		            isBack:false,
		        }
        },
        //详情
        {
            path: '/destail',
            name: 'destail',
            component: destail,
            meta: {
		            keepAlive: false, 
		            isBack:false,
		        }
        },
        //搜索
        {
            path: '/seach',
            name: 'seach',
            component: seach,
            meta: {
		            keepAlive: true, 
		            isBack:false,
		        }
        },
        //支付
        {
            path: '/pay',
            name: 'pay',
            component: pay,
            meta: {
		            keepAlive: true, 
		            isBack:false,
		        }
        }
    ]
}]
