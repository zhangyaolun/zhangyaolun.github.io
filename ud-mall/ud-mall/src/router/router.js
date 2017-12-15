import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const productList = r => require.ensure([], () => r(require('../page/product/product-list')), 'product-list')
const productShop = r => require.ensure([], () => r(require('../page/shop/shopCar')), 'shopCar')
const settlement = r => require.ensure([], () => r(require('../page/shop/shopPlac')), 'shopPlac')
const shopPar = r => require.ensure([], () => r(require('../page/shop/shopPar')), 'shopPar')
const shopMap = r => require.ensure([], () => r(require('../page/map/shopMap')), 'shopMap')
const shopMapNew = r => require.ensure([], () => r(require('../page/map/shopMapNew')), 'shopMapNew')
const shopSuccess = r => require.ensure([], () => r(require('../page/shop/shopSuccess')), 'shopSuccess')
const login = r => require.ensure([], () => r(require('../page/user/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/user/register')), 'register')
const forget = r => require.ensure([], () => r(require('../page/user/forget')), 'forget')
const productDetail = r => require.ensure([], () => r(require('../page/product/product-detail')), 'product-detail')
const mall = r => require.ensure([], () => r(require('../page/mall/mall')), 'mall')
const mallProductList = r => require.ensure([], () => r(require('../page/mall/mall-product-list')), 'mallProductList')
const userCenter = r => require.ensure([], () => r(require('../page/user/user-center')), 'userCenter')
const userCollection = r => require.ensure([], () => r(require('../page/user/user-collection')), 'userCollection')
const myOrder = r => require.ensure([], () => r(require('../page/order/my-order')), 'myOrder')
const addComment = r => require.ensure([], () => r(require('../page/order/add-comment')), 'addComment')
const orderDetail = r => require.ensure([], () => r(require('../page/order/order-detail')), 'orderDetail')
const logistics = r => require.ensure([], () => r(require('../page/order/logistics')), 'logistics')
const personal = r => require.ensure([], () => r(require('../page/user/personal')), 'personal')
const passMail = r => require.ensure([], () => r(require('../page/user/pass-mail')), 'passMail')
const shopPopup = r => require.ensure([], () => r(require('../page/map/popup')), 'shopPopup')
const myWallet = r => require.ensure([], () => r(require('../page/user/myWallet')), 'myWallet')
const welfare = r => require.ensure([], () => r(require('../page/user/welfare')), 'welfare')
const schoolGroup = r => require.ensure([], () => r(require('../page/user/school-group')), 'schoolGroup')
const passMailGroup = r => require.ensure([], () => r(require('../page/user/passMail-group')), 'passMailGroup')
const inputSeach = r => require.ensure([], () => r(require('../page/mall/input-seach')), 'inputSeach')

  export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            component: home,
        },
        {
            path: '/mall',
            component: mall,
        },
        {
            path: '/product-list',
            component: productList,
        },
        {
            path: '/product-detail',
            component: productDetail,
         },
        {
            path: '/mall-product-list',
            component: mallProductList,
        },
        {
            path: '/shopCar',
            meta: {
              requireAuth: true,
            },
            component: productShop,
        },
        {
            path: '/userCenter',
            component: userCenter,
        },
        {
          path: '/shopPlac',
          component: settlement,
        },
        {
          path: '/shopMap',
          component: shopMap,
        },
        {
          path: '/shopPar',
          component: shopPar,
        },
        {
          path: '/shopMapNew',
          component: shopMapNew,
        } ,
        {
          path: '/shopSuccess',
          component: shopSuccess,
        },
        {
          path:'/user-collection',
          meta: {
            requireAuth: true,
          },
          component:userCollection,
        },
        {
          path:'/my-order',
          meta: {
            requireAuth: true,
          },
          component:myOrder,
        },
        {
          path: '/login',
          component: login,
        }
        ,
        {
          path: '/register',
          component: register,
        }
        ,
        {
          path: '/forget',
          component: forget,
        }
        ,
        {
          path: '/add-comment',
          component: addComment,
        }
        ,
        {
          path: '/order-detail',
          component: orderDetail,
        }
        ,
        {
          path: '/logistics',
          component: logistics,
        }
        ,
        {
          path: '/personal',
          meta: {
            requireAuth: true,
          },
          component: personal,
          /*children:[
            {
              path:'/personal/passMailGroup',
              component:passMailGroup,
            }
          ]*/
        }
        ,
        {
          path: '/passMail',
          component: passMail,
        }
        ,
        {
          path: '/shopPopup',
          component: shopPopup,
        }
        ,
        {
          path: '/myWallet',
          meta: {
            requireAuth: true,
          },
          component: myWallet,
        }
        ,
        {
          path: '/welfare',
          component: welfare,
        },
        {
          path: '/schoolGroup',
          component: schoolGroup,
        },
        {
          path: '/inputSeach',
          component: inputSeach,
        },
    ]
}]
