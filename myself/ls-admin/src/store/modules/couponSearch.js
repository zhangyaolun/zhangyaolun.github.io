let couponQueryData = sessionStorage.getItem('couponQueryData')
const state = {
  queryData: couponQueryData ? JSON.parse(couponQueryData) : ''
}

const mutations = {
  SET_QUERY_DATA: (state, data) => {
    state.queryData = data
    sessionStorage.setItem('couponQueryData', JSON.stringify(data))
  }
}

const actions = {
  setQueryData ({ commit }, data) {
    commit('SET_QUERY_DATA', data)
  },
  removeQueryData ({ commit }) {
    commit('SET_QUERY_DATA', '')
    sessionStorage.removeItem('couponQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
