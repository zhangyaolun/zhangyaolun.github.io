import router from './router'
import store from './store'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken, setName, setRegionBlockCode } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { jumpToken, removeAllTagsView } from "./utils/interception"

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  jumpToken(to)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.addRoutes.length !== 0) {
        removeAllTagsView(from, to)
        next()
      } else {
        try {
          const asyncRoutesMap = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', asyncRoutesMap)
          if (accessRoutes.length == 0) return false
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })

        } catch (error) {

          await store.dispatch('user/resetToken')

          Message.error(error || 'Has Error')

          next(`/login?redirect=${to.path}`)

          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
