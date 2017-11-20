import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {//状态原始设置
  user:{},
   count:1
}

const mutations = {//可修改
  isLogin (state,user) {
    state.user = user
  },
  add(state){
	    state.count+=1;
	},
	reduce(state){
	    state.count-=1;
	}
}
const getters = {//计算过滤操作
    count:function(state){
        return state.count +=100;
    }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
