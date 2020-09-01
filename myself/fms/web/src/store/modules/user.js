import {getItem, setItem,} from '@/utils/auth'
import userApi from '@/api/group/userApi'
import {result} from '@/utils/menus'

const state = {
    token: getItem('TOKEN'),
    name: getItem('NAME')
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    }
}

const actions = {
    login({commit}, data) {
        const {userName, password} = data
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '23')
            commit('SET_NAME', 'admin')
            setItem('TOKEN', '23')
            setItem('NAME', 'admin')
            resolve()
            // userApi.login({
            //   username: userName.trim(),
            //   password: password
            // }).then(res => {
            //   let {result} = res
            //   commit('SET_TOKEN', result.id)
            //   commit('SET_NAME', result.userName)
            //   setItem('TOKEN',result.id)
            //   setItem('NAME',result.userName)
            //   resolve()
            // }).catch(error => {
            //   reject(error)
            // })
        })
    },
    update({commit}, userInfo) {
        const {oldPassword, password} = userInfo
        return new Promise((resolve, reject) => {
            // commit('SET_TOKEN', '111111')
            // commit('SET_NAME', 'admin1')
            resolve()
            // userApi.login({
            //   userName: userName.trim(),
            //   password: password
            // }).then(res => {
            //   commit('SET_TOKEN', res.data.token)
            //   commit('SET_NAME', res.data.userName)
            //   resolve()
            // }).catch(error => {
            //   reject(error)
            // })
        })
    },
    logout({commit}) {
        return new Promise((resolve, reject) => {
            userApi.logout().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                sessionStorage.clear()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getMenus({commit}) {
        return new Promise((resolve, reject) => {
            resolve([...result])
            // userApi.getMenus().then((res) => {
            //   resolve([...res.result])
            // }).catch(error => {
            //   reject(error)
            // })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
