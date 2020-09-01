import Vue from 'vue'

import 'normalize.css/normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import { sync } from 'vuex-router-sync'

sync(store, router, { moduleName: 'RouteModule' } )

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#home')
