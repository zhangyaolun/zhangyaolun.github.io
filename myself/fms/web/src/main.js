import Vue from 'vue'

import 'normalize.css/normalize.css'
import './permission'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'

import * as filters from './filters'
import api from './api'
import pageLoading from './components/loading/index'

import './icons'

Vue.config.productionTip = false

Vue.use(api)

Vue.use(pageLoading)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
