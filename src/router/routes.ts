import { RouteRecordRaw } from 'vue-router'
import Layout from '@layout/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '用户登录',
      isShow: false,
      requireAuth: false
    },
    component: () => import('@views/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      isShow: false
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('@views/dashboard/Index.vue'),
        meta: {
          title: '首页',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      isShow: false
    },
    children: [
      {
        name: 'student',
        path: '/user/student',
        component: () => import('@views/user/Student.vue'),
        meta: {
          title: '学生管理',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      },
      {
        name: 'teacher',
        path: '/user/teacher',
        component: () => import('@views/user/Teacher.vue'),
        meta: {
          title: '教师管理',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/college',
    component: Layout,
    meta: {
      isShow: false
    },
    children: [
      {
        name: 'major',
        path: '/college/major',
        component: () => import('@views/college/Major.vue'),
        meta: {
          title: '专业管理',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      },
      {
        name: 'academy',
        path: '/college/academy',
        component: () => import('@views/college/Academy.vue'),
        meta: {
          title: '学院管理',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/edu',
    component: Layout,
    meta: {
      isShow: false
    },
    children: [
      {
        name: 'edit',
        path: '/edu/course',
        component: () => import('@views/edu/Course.vue'),
        meta: {
          title: '课程管理',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      isShow: false
    },
    children: [
      {
        name: 'updatePw',
        path: '/system/updatePw',
        component: () => import('@views/system/UpdatePw.vue'),
        meta: {
          title: '修改密码',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      },
      {
        name: 'about',
        path: '/system/about',
        component: () => import('@views/system/About.vue'),
        meta: {
          title: '关于系统',
          icon: null,
          roles: ['any'],
          isShow: true,
          requireAuth: true
        }
      }
    ]
  }
]

export default routes
