import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user:{}
}

const mutation = {
  isLogin (state,user) {
    state.user = user
  }
}


export default new Vuex.Store({
  state,
  mutation
})
