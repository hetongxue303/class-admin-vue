import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '../store/modules/user'
import pinia from '../store'
import NProgress from '../plugins/nProgress'
import { getToken } from '../utils/auth'
import { isReLogin } from '../utils/request' // 本地数据

// 初始化路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 权限配置
const userStore = useUserStore(pinia)
const REQUEST_WITHE_LIST: string[] = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else if (
      userStore.getRouters.length === 0 ||
      userStore.getMenus.length === 0 ||
      userStore.getRole === ''
    ) {
      await userStore
        .getUserInfo()
        .then(() => {
          isReLogin.show = false
          // TODO 生成动态路由
          next({ ...to, replace: true })
        })
        .catch(() => {
          userStore.userLogout()
          next('/')
        })
    } else {
      next()
    }
  } else if (REQUEST_WITHE_LIST.indexOf(to.path) !== -1) {
    next()
  } else {
    next(
      to.fullPath === '/dashboard' ? '/login' : `/login?redirect=${to.fullPath}`
    )
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
