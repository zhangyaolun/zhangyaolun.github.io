let couponDatas = sessionStorage.getItem('couponData')
let couponSeachDatas = sessionStorage.getItem('couponSeachData')
const state = {
  couponData: couponDatas ? JSON.parse(couponDatas) : '',
  seachData: couponSeachDatas ? JSON.parse(couponSeachDatas) : '',
}

const mutations = {
  SET_COUPON_DATA: (state, data) => {
    state.couponData = data
    sessionStorage.setItem('couponData', JSON.stringify(data))
  },
  SET_SEACH_DATA: (state, data) => {
    state.seachData = data
    sessionStorage.setItem('couponSeachData', JSON.stringify(data))
  }
}

const actions = {
  setCouponData ({ commit }, data) {
    commit('SET_COUPON_DATA', data)
  },
  setSeachData ({ commit }, data) {
    commit('SET_SEACH_DATA', data)
  },
  removeCouponData ({ commit }) {
    commit('SET_COUPON_DATA', '')
    sessionStorage.removeItem('couponData')
  },
  removeSeachData ({ commit }) {
    commit('SET_SEACH_DATA', '')
    sessionStorage.removeItem('couponSeachData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
