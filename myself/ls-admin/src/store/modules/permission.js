import { constantRoutes } from '@/router'
import { MenuToPathMap } from '@/router/router-backend.js'
import Cookies from "js-cookie"

/**
 *  格式化每个系统的二级路径
 *
 * */
export function formatSecondRoutes (routers, sysroute, sysModel) {
  sysroute.forEach(route => {
    let menu = {
      sysCode: sysModel,
      path: '/backend',
      modelCode: route.modelCode,
      alwaysShow: true,
      component: () => import('@/layout'),
      meta: { title: route.modelName }
    }
    if (route.children) {
      menu.children = []
      formatThirdRoutes(menu.children, route.children)
    }
    routers.push(menu)
  })
}
/**
 *  格式化每个系统的三级路径
 *
 * */
export function formatThirdRoutes (thirdRouters, routes) {
  routes.forEach(route => {
    if (MenuToPathMap[route.menuAddr] && MenuToPathMap[route.menuAddr].routes) {
      const allroutes = MenuToPathMap[route.menuAddr].routes
      allroutes.forEach(ele => {
        let menu = {
          path: ele.path,
          component: ele.component,
          hidden: ele.hidden,
          name: route.menuName,
          meta: { title: route.menuName, removeTagsView: ele.meta ? ele.meta.removeTagsView ? ele.meta.removeTagsView : false : false}
        }
        if (ele.hidden) {
          menu.name = ele.title
          menu.meta = { title: ele.title, activeMenu: ele.activeMenu, removeTagsView: ele.meta ? ele.meta.removeTagsView ? ele.meta.removeTagsView : false : false}
        }
        thirdRouters.push(menu)
      })
    }
  })
}
/**
 * Filter asynchronous routing tables by recursion
 * sysModels 储存所有的系统
 * routers 存储所有的动态路由
 * @param routes asyncRoutes
 * @param roles
 */
export function mapAsyncRoutes (sysModels, routers, data) {
  data.forEach(sysroute => {
    // 处理二级、三级
    formatSecondRoutes(routers, sysroute.children, sysroute.modelCode)
    // 存储一级
    sysModels.push({
      modelCode: sysroute.modelCode,
      modelName: sysroute.modelName
    })
  })
}

const state = {
  routes: [],
  addRoutes: [],
  sysModels: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  CLEAR_ROUTES: (state) => {
    state.addRoutes = []
    state.routes = []
  },
  SET_SYSMODELS: (state, sysModels) => {
    state.sysModels = sysModels
  },
  CLEAR_SYSMODELS: (state) => {
    state.sysModels = []
  }
}

const actions = {
  generateRoutes({ commit }, asyncRoutesMap) {
    return new Promise(resolve => {
      // routers 存储所有的动态路径
      // sysModels 存储所有的系统模块
      let routers = []
      let sysModels = []
      // if (Cookies.get('jumpToken')) {
      //   asyncRoutesMap = asyncRoutesMap.filter((v)=>{
      //     return v.modelCode == 'coupon_sys'
      //   })
      // }
      mapAsyncRoutes(sysModels, routers, asyncRoutesMap)

      commit('SET_ROUTES', routers)
      commit('SET_SYSMODELS', sysModels)
      resolve(routers)
    })
  },
  clearRoutes({ commit }) {
    commit('CLEAR_ROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
