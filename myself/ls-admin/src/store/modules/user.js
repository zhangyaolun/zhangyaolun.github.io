import { getToken, setToken, removeToken, setName, getName, removeName, getRegionBlockCode, setRegionBlockCode } from '@/utils/auth'
import userApi from '@/api/group/user'
import { resetRouter } from '@/router'
import Cookies from "js-cookie"

const state = {
  token: getToken(),
  name: getName(),
  regionBlockCode: getRegionBlockCode()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_REGION_BLOCK_CODE: (state, regionBlockCode) => {
    state.regionBlockCode = regionBlockCode
  }
}

const actions = {
  login ({commit}, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      userApi.login({
        userName: userName.trim(),
        password: password
      }).then(res => {
        commit('SET_TOKEN', res.data.token)
        commit('SET_NAME', res.data.userName)
        var regionBlockCode = res.data.regionBlockCode
        if(regionBlockCode == null || regionBlockCode == '' || regionBlockCode == 'undefined'){
          regionBlockCode = 'default'
        }
        commit('SET_REGION_BLOCK_CODE',regionBlockCode)
        setRegionBlockCode(regionBlockCode)
        setName(res.data.userName)
        setToken(res.data.token)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setHref ({commit}, userInfo) {
    const { token, userName,regionBlockCode } = userInfo
    commit('SET_TOKEN', token)
    commit('SET_NAME', userName)
    commit('SET_REGION_BLOCK_CODE', regionBlockCode)
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      userApi.getUserNav().then(res => {
        let data = []
        if (res) {
          data = res.data
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      userApi.logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        removeToken()
        removeName()
        resetRouter()
        sessionStorage.clear()
        localStorage.clear()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_NAME', '')
      commit('SET_TOKEN', '')
      removeToken()
      removeName()
      resolve()
      //Cookies.remove('jumpToken')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
