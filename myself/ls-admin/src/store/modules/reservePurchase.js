let reservePurchaseQueryData = sessionStorage.getItem('reservePurchaseQueryData')
const state = {
  reservePurchaseQueryData: reservePurchaseQueryData ? JSON.parse(reservePurchaseQueryData) : '' // 预约购买订单查询
}

const mutations = {
  SET_RESERVEPURCHASE_DATA: (state, data) => {
    state.reservePurchaseQueryData = data
    sessionStorage.setItem('reservePurchaseQueryData', JSON.stringify(data))
  }
}

const actions = {
  setReservePurchaseQueryData ({ commit }, data) {
    commit('SET_RESERVEPURCHASE_DATA', data)
  },
  removeReservePurchaseQueryData ({ commit }) {
    commit('SET_RESERVEPURCHASE_DATA', '')
    sessionStorage.removeItem('reservePurchaseQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
