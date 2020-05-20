const state = {
  defaultSys: '',
  allSystems: []
}

const mutations = {
  SET_DEFAULT_SYS: (state, sys) => {
    state.defaultSys = sys
  },
  GET_ALL_SYSTEMS: (state, sys) => {
    if (state.allSystems.includes(sys)) return
    state.allSystems.push(sys)
  }
}

const actions = {
  setDefaultSys ({ commit }, sys) {
    commit('SET_DEFAULT_SYS', sys)
  },
  getAllSystems ({ commit }, sys) {
    commit('allSystems', sys)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
