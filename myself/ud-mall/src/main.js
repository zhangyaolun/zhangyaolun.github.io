//import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import {getStore,setStore} from './config/mUtils'


if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
Vue.use(Mint);
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	strict: process.env.NODE_ENV !== 'production'
})
router.beforeEach((to, from, next) => {
  if(to.path != '/login'){
    setStore('path',to.path);
  }
  if (to.meta.requireAuth) {
    if(getStore('login-phone')) {
      next();
    }else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})


function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}
new Vue({
	router,
	store
}).$mount('#app')

