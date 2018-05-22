//import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/index'
/*import {routerMode} from './config/env'*/
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
	strict: process.env.NODE_ENV !== 'production',
	mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return {
              x: 0,
              y: 0
          }
      }
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

