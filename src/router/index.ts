import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  useRoute
} from 'vue-router'
import routes from './routes'
import NProgress from '../plugins/nProgress'
import { getToken } from '../utils/auth'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const REQUEST_WITHE_LIST: string[] = ['/login', '/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    next()
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
