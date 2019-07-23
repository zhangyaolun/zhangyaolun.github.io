import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization

import * as filters from './filters' // global filters

/*弹出框确定或取消*/
Vue.prototype.msgAlert = function (title,erroMsg){
	let _title = title || '确定此操作?';
	return new Promise((resolve, reject) => {
		this.$confirm(_title,'提示',{
	  		showCancelButton:false,
	  		confirmButtonText:'确定',
	  		customClass:erroMsg?erroMsg:''
	  	}).then( data => {
		    resolve(data); 
		}).catch( data => {
		  	reject(data); 
		});
	});
}
/*弹出框删除确定或取消*/
Vue.prototype.delAlert = function (){
	return new Promise((resolve, reject) => {
		this.$confirm('此操作将删除这些数据, 是否继续?', '提示',{
	  	  confirmButtonText: '确定',
          cancelButtonText: '取消'
	  	}).then( data => {
		    resolve(data); 
		}).catch( data => {
		  	reject(data); 
		});
	});
}

/*弹出框数据返回结果处理*/
Vue.prototype.resAlert = function (title,type){
	return new Promise((resolve, reject) => {
		type == 'warning'?this.$message({message: title,type: 'warning'}):this.$notify({title: '成功',message: title,type: 'success',duration: 1500});
		resolve();
	});
}


Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

import './icons' // icon
import './permission' // permission control
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
