import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { usePermissionStore } from '../store/modules/permission'
import { useUserStore } from '../store/modules/user'
import pinia from '../store'
import NProgress from '../plugins/nProgress'
import { getToken } from '../utils/auth'
import { ElMessage } from 'element-plus' // 本地数据

// 初始化路由
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 权限配置
const userStore = useUserStore(pinia)
const permissionStore = usePermissionStore(pinia)
const REQUEST_WITHE_LIST: string[] = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else if (
      permissionStore.getMenus.length === 0 ||
      permissionStore.getRouters.length === 0 ||
      userStore.getRoles === ''
    ) {
      await userStore
        .getUserInfo()
        .then(() => {
          // TODO 生成动态路由
          next({ ...to, replace: true })
        })
        .catch((error) => {
          userStore.systemLogout()
          ElMessage.error(error)
          next('/login')
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
