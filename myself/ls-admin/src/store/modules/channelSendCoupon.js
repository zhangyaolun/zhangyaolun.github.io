const channelSendCouponMerchantQueryData = sessionStorage.getItem('channelSendCouponMerchantQueryData')
const state = {
  channelSendCouponMerchantQueryData: channelSendCouponMerchantQueryData ? JSON.parse(channelSendCouponMerchantQueryData) : ''
}

const mutations = {
  SET_MERCHANTQUERY_DATA: (state, data) => {
    state.channelSendCouponMerchantQueryData = data
    sessionStorage.setItem('channelSendCouponMerchantQueryData', JSON.stringify(data))
  }
}

const actions = {
  setMerchantQueryData ({ commit }, data) {
    commit('SET_MERCHANTQUERY_DATA', data)
  },
  removeChannelSendCouponMerchantQueryData ({ commit }) {
    commit('SET_MERCHANTQUERY_DATA', '')
    sessionStorage.removeItem('channelSendCouponMerchantQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
