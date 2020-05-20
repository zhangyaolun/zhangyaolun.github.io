
const state = {
  jumpPage: {},
  marketForm: {
    type: 0,
    title: '',
    jumpUrl: '',
    startTime: '',
    endTime: '',
    imageUrl: '',
    mediaKey: '',
    desc: ''
  },
  loading: true
}

const mutations = {
  SET_JUMPPAGE_DATA: (state, data) => {
    state.jumpPage = Object.assign({}, JSON.parse(data))
  },
  SET_LOADING_DATA: (state, data) => {
    state.loading = data
  },
  REST_MARKETFORM_DATA: (state, data) => {
    Object.keys(state.marketForm).forEach(infoKey => {
      if (infoKey === 'type') {
        state.marketForm[infoKey] = 0
      } else if (infoKey === 'jumpUrl') {
        state.marketForm[infoKey] = Object.keys(state.jumpPage).length > 0 ? state.jumpPage[Object.keys(state.jumpPage)[0]] : ''
      } else {
        state.marketForm[infoKey] = ''
      }
    })
  }
}

const actions = {
  setJumpPage ({ commit }, data) {
    commit('SET_JUMPPAGE_DATA', data)
  },
  setLoadingData ({ commit }, data) {
    commit('SET_LOADING_DATA', data)
  },
  restMarketFormData ({ commit }, data) {
    commit('REST_MARKETFORM_DATA', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
