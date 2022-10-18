import { IMenuItem } from '../types'

export const menus: Array<IMenuItem> = [
  {
    name: '首页',
    icon: 'document',
    path: '/dashboard',
  },
  {
    name: '用户管理',
    icon: 'document',
    path: '/user',
    children: [
      {
        name: '学生管理',
        icon: 'user',
        path: '/user/student',
      },
    ],
  },
  {
    name: '院系管理',
    icon: 'document',
    path: '/college',
    children: [
      {
        name: '专业管理',
        icon: 'user',
        path: '/college/major',
      },
      {
        name: '学院管理',
        icon: 'user',
        path: '/college/academy',
      },
    ],
  },
  {
    name: '课程管理',
    icon: 'document',
    path: '/class',
    children: [
      {
        name: '编辑课程',
        icon: 'user',
        path: '/class/edit',
      },
      {
        name: '设置排课',
        icon: 'user',
        path: '/class/setting',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'document',
    path: '/system',
    children: [
      {
        name: '修改密码',
        icon: 'user',
        path: '/system/updatePw',
      },
      {
        name: '关于系统',
        icon: 'user',
        path: '/system/about',
      },
    ],
  },
]
