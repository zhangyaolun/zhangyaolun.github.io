let assembleData = sessionStorage.getItem('assembleData')
let orderAssembleData = sessionStorage.getItem('orderAssembleData')
const state = {
  seachData: assembleData ? JSON.parse(assembleData) : '', // 拼团模版搜索条件存储
  orderAssembleData: orderAssembleData ? JSON.parse(orderAssembleData) : '', // 拼团订单搜索条件存储
  loading: true
}

const mutations = {
  SET_SEACH_DATA: (state, data) => {
    state.seachData = data
    sessionStorage.setItem('assembleData', JSON.stringify(data))
  },
  SET_ORDER_ASSEMBLE_DATA: (state, data) => {
    state.orderAssembleData = data
    sessionStorage.setItem('orderAssembleData', JSON.stringify(data))
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
}

const actions = {
  setAssembleData ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_SEACH_DATA', data)
      resolve()
    })
  },
  removeAssembleData ({ commit }) {
    return new Promise(resolve => {
      state.seachData = ''
      sessionStorage.removeItem('assembleData')
    })
  },
  setorderAssembleData ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_ORDER_ASSEMBLE_DATA', data)
      resolve()
    })
  },
  removeorderAssembleData ({ commit }) {
    return new Promise(resolve => {
      state.orderAssembleData = ''
      sessionStorage.removeItem('orderAssembleData')
    })
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
