import { defineStore } from 'pinia'
import { getToken, removeToken } from '../../utils/auth'
import { IUserStore } from '../types'
import { getUserInfo } from '../../api/user'

export const useUserStore = defineStore('user', {
  state: (): IUserStore => {
    return {
      Authorization: getToken() || '',
      collapse: false,
      role: '',
      menus: [],
      routers: []
    }
  },
  getters: {
    // 获取折叠状态
    getCollapse: (state) => state.collapse,
    // 获取角色信息
    getRoles: (state) => state.role,
    // 获取菜单信息
    getMenus: (state) => state.menus,
    // 获取路由信息
    getRouters: (state) => state.routers
  },
  actions: {
    // 设置折叠面板状态
    setCollapse(status: boolean) {
      this.collapse = status
    },
    // 设置菜单信息
    setMenus(menus: any) {
      this.menus = menus
    },
    // 设置路由信息
    setRouters(routers: any) {
      this.routers = routers
    },
    setRole(name: string) {
      this.role = name
    },
    // 用户注销
    userLogout() {
      removeToken()
      this.$reset()
    },
    // 获取用户信息
    async getUserInfo() {
      const { data } = await getUserInfo()
      const userinfo = data.data
      this.setRole(userinfo.role)
      this.setMenus(userinfo.menus)
      this.setRouters(userinfo.routers)
    }
  },
  persist: {
    key: 'USER'
  }
})
