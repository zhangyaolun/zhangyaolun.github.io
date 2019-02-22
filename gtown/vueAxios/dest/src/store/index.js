import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA/index'


Vue.use(Vuex)

const moduleB = {
  state: { count:2 },
  mutations: {  },
  actions: {  }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
export default store;

// import {
//   RECORD_USERINFO,
//   GET_USERINFO
// } from './mutation-types.js'
