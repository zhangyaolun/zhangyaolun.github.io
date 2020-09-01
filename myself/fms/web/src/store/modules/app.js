const state = {
    sidebar: {
        opened: sessionStorage.getItem('sidebarStatus') ? !!+sessionStorage.getItem('sidebarStatus') : true,
        withoutAnimation: false
    },
    device: 'desktop',
    size: sessionStorage.getItem('size') || 'medium',
    loading: true
}

const mutations = {
    TOGGLE_SIDEBAR: (state, data) => {
        if (data && data.opened !== '') {
            state.sidebar.opened = data.opened
        } else {
            state.sidebar.opened = !state.sidebar.opened
        }

        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            sessionStorage.setItem('sidebarStatus', 1)
        } else {
            sessionStorage.setItem('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        sessionStorage.setItem('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_LOADING_DATA: (state, data) => {
        state.loading = data
    },
}

const actions = {
    toggleSideBar({commit}, data) {
        commit('TOGGLE_SIDEBAR', data)
    },
    closeSideBar({commit}, {withoutAnimation}) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device)
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
