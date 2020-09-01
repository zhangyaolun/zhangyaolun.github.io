const state = {
    loading: true,
    name: '23233'
}

const mutations = {
    SET_NAME: (state, data) => {
        state.name = data
    },
    SET_LOADING_DATA: (state, data) => {
        state.loading = data
    },
}

const actions = {
    setName({commit}, data) {
        commit('SET_NAME', data)
    },
    setLoading({commit}, data) {
        commit('SET_LOADING_DATA', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
