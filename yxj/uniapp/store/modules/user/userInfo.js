import userApi from '@/api/group/user/userServer'

const state = {
	userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : null
}

const mutations = {
  SET_USERINFO: (state, data) => {
    state.userInfo = Object.assign({},data)
	uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
  }
}

const actions = {
  login ({commit}, userInfo) {
      const { userName, password } = userInfo
      return new Promise((resolve, reject) => {
        userApi.login({ mobile: userName || '15238382469', smsCode: password || '999999', source: '6' }).then(res => {
          commit('SET_USERINFO', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}