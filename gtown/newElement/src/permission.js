import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if(to.path === '/login'){
  	next();
  	NProgress.done();
  	return;
  }
  if(getToken('Admin-Token')){
  	if(store.getters.addRouters.length == 0){
	  	store.dispatch('GenerateRoutes').then(() => { 
		    router.addRoutes(store.getters.addRouters) 
		    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
		  })
	  }else{
	  	next();
	  }
  }else{
  	next('/login') // 否则全部重定向到登录页
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
