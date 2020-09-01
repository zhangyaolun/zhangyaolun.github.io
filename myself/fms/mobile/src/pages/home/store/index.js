import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import persistPlugin from 'vuex-persist-plugin'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  moduleName.indexOf('/') !== -1 ? moduleName = moduleName.split('/')[1] : ''
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    persistPlugin({
      modules: ['app']
    })
  ]
})

export default store
