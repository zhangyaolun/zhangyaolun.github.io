const state = {
	loading: true, // 弹出加载框
}

const mutations = {
	SET_LOADING: (state, data) => {
		state.loading = data
	}
}

const actions = {
	setLoading({commit}, data) {
		commit('SET_LOADING', data)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
