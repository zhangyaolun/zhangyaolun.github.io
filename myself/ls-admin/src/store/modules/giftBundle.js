let giftTemplateQueryData = sessionStorage.getItem('giftTemplateQueryData')
let giftOrderQueryData = sessionStorage.getItem('giftOrderQueryData')
const state = {
  giftTemplateQueryData: giftTemplateQueryData ? JSON.parse(giftTemplateQueryData) : '', // 特惠券包模版查询
  giftOrderQueryData: giftOrderQueryData ? JSON.parse(giftOrderQueryData) : '' // 特惠券包订单查询
}

const mutations = {
  SET_GIFTTEMPLATEQUERY_DATA: (state, data) => {
    state.giftTemplateQueryData = data
    sessionStorage.setItem('giftTemplateQueryData', JSON.stringify(data))
  },
  SET_GIFTORDERQUERY_DATA: (state, data) => {

    state.giftOrderQueryData = data
    sessionStorage.setItem('giftOrderQueryData', JSON.stringify(data))
  }
}

const actions = {
  setGiftTemplateQueryData ({ commit }, data) {
    commit('SET_GIFTTEMPLATEQUERY_DATA', data)
  },
  removeGiftTemplateQueryData ({ commit }) {
    commit('SET_GIFTTEMPLATEQUERY_DATA', '')
    sessionStorage.removeItem('giftTemplateQueryData')
  },
  setGiftOrderQueryData ({ commit }, data) {
    commit('SET_GIFTORDERQUERY_DATA', data)
  },
  removeGiftOrderQueryData ({ commit }) {
    commit('SET_GIFTORDERQUERY_DATA', '')
    sessionStorage.removeItem('giftOrderQueryData')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
