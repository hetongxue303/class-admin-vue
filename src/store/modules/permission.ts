import { defineStore } from 'pinia'
import { PermissionStore } from '../../type/store'

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionStore => {
    return {
      menus: [],
      routers: []
    }
  },
  getters: {
    getMenus: (state) => state.menus,
    getRouters: (state) => state.routers
  },
  actions: {
    setMenus(menus: any) {
      this.menus = menus
    },
    setRouters(routers: any) {
      this.routers = routers
    },
    logout() {}
  },
  persist: {
    key: 'PERMISSION'
  }
})
