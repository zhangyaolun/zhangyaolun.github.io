//import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/ostore'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
/*import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getStore,setStore} from './config/mUtils'



Vue.use(ElementUI);
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	strict: process.env.NODE_ENV !== 'production'
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

