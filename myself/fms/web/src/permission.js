import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({showSpinner: false})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.path === '/login') {
        next()
        NProgress.done(to)
    } else {
        if (store.getters.ruleMenu.length !== 0) {
            next()
        } else {
            try {
                const asyncRoutesMap = await store.dispatch('user/getMenus')
                const accessRoutes = await store.dispatch('permission/generateRoutes', asyncRoutesMap)

                console.log(accessRoutes)
                if (accessRoutes.length == 0) return false
                router.addRoutes(accessRoutes)
                NProgress.done()
                next({...to, replace: true})

            } catch (error) {
                await store.dispatch('user/logout')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
