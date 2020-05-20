import Vue from 'vue'
import App from './App'

/* store 状态管理 */
import store from './store'

/* colorui */
import cuCustom from 'colorui/components/cu-custom.vue'

/* 请求接口api */
import api from './api'
Vue.use(api)

/* 在main.js中注册全局组件 */
import loading from './components/loading/loading.vue'
Vue.component('loading',loading)

//挂在到原型链上 方便在每个页面中 使用 this.$loading()  去显示加载中
Vue.prototype.$loading = (data = true) => store.dispatch("common/setLoading", data)



/* 阻止启动生产消息 */
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
