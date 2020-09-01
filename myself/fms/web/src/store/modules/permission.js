import {MenuToPathMap} from '@/router/router-backend.js'

let menuData = (route, thirdRouters) => {
    let allroutes = MenuToPathMap[route.action].routes
    allroutes.forEach(ele => {
        let menu = {
            id: route.id,
            path: ele.path,
            component: ele.component,
            hidden: ele.hidden,
            name: route.name,
            meta: {
                title: route.name,
                removeTagsView: ele.meta && ele.meta.removeTagsView ? true : false
            }
        }
        if (ele.hidden) {
            menu.name = ele.title
            menu.meta = {
                title: ele.title,
                activeMenu: ele.activeMenu,
                removeTagsView: ele.meta && ele.meta.removeTagsView ? true : false
            }
        }
        thirdRouters.push(menu)
    })
}

export function formatThirdRoutes(thirdRouters, routes) {
    routes.forEach(route => {
        if (MenuToPathMap[route.action] && MenuToPathMap[route.action].routes) {
            menuData(route, thirdRouters)
        }
    })
}

/**
 * allRoutes 储存所有的系统
 * ruleMenu 存储所有的动态路由
 */
const mapAsyncRoutes = (routesMap, allRoutes) => {
    routesMap.forEach(item => {
        let menu = {
            id: item.id,
            path: '/backend',
            alwaysShow: true,
            component: () => import('@/layout'),
            meta: {title: item.name, icon: item.icon || ''},
            children: []
        }
        if (item.children && item.children.length > 0) {
            formatSecondRoutes(item.children, menu)
        } else {
            if (MenuToPathMap[item.action] && MenuToPathMap[item.action].routes) {
                menuData(item, menu.children)
            }
        }
        allRoutes.push({
            ...item,
            ...menu
        })
    })
}

/**
 *  格式化每个系统的二级路径
 *
 * */
export function formatSecondRoutes(data, menu) {
    data.forEach(item => {
        if (item.children && item.children.length > 0) {
            let obj = {
                id: item.id,
                path: '/backend',
                alwaysShow: true,
                component: () => import('@/layout'),
                meta: {title: item.name}
            }
            obj.children = []
            formatThirdRoutes(obj.children, item.children)
            menu.children.push(obj)
        } else {
            if (MenuToPathMap[item.action] && MenuToPathMap[item.action].routes) {
                menuData(item, menu.children)
            }
        }
    })
}


const state = {
    ruleMenu: []
}

const mutations = {
    SET_ALLROUTES: (state, routes) => {
        state.ruleMenu = routes
    },
    CLEAR_ROUTES: (state) => {
        state.ruleMenu = []
    }
}

const actions = {
    generateRoutes({commit}, asyncRoutesMap) {
        return new Promise(resolve => {
            let ruleMenu = []
            mapAsyncRoutes(asyncRoutesMap, ruleMenu)
            commit('SET_ALLROUTES', ruleMenu)
            resolve(ruleMenu)
        })
    },
    clearRoutes({commit}) {
        commit('CLEAR_ROUTES')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
