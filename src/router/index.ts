import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import NProgress from '../plugins/nProgress'
import { getToken } from '../utils/auth'
import { useUserStore } from '../store/modules/user'
import pinia from '../store'

const userStore = useUserStore(pinia)

const router = createRouter({
  history: createWebHistory(),
  routes
})

const REQUEST_WITHE_LIST: string[] = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else if (
      userStore.getRoles.length === 0 ||
      userStore.getMenus.length === 0
    ) {
      await userStore.getUserInfo()
      next()
    } else {
      next()
    }
  } else if (REQUEST_WITHE_LIST.indexOf(to.path) !== -1) {
    next()
  } else {
    // 跳转期待页面
    next(`/login?redirect=${to.fullPath}`)
  }
  NProgress.done()
})

router.afterEach(() => {})

export default router
