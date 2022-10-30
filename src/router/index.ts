import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from '../plugins/nProgress'
import { getToken } from '../utils/auth'
import { useUserStore } from '../store/modules/user'
import pinia from '../store'
import Layout from '@layout/Index.vue'
import routes from './routes' // 本地数据

const userStore = useUserStore(pinia)

// const routes: Array<RouteRecordRaw> = [
//   {
//     name: 'login',
//     path: '/login',
//     meta: {
//       title: '用户登录',
//       isShow: false,
//       requireAuth: false
//     },
//     component: () => import('@views/Login.vue')
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     meta: {
//       isShow: false
//     },
//     children: [
//       {
//         name: 'dashboard',
//         path: '/dashboard',
//         component: () => import('@views/dashboard/Index.vue'),
//         meta: {
//           title: '首页',
//           icon: null,
//           roles: ['any'],
//           isShow: true,
//           requireAuth: true
//         }
//       }
//     ]
//   }
// ]

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
      userStore.getRouters.length === 0 ||
      userStore.getMenus.length === 0 ||
      userStore.getRoles === ''
    ) {
      await userStore.getUserInfo()
      next()
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
  NProgress.done()
})

router.afterEach(() => {})

export default router
