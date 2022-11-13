import { defineStore } from 'pinia'
import { UserStores } from '../../type/store'
import { getToken, removeToken } from '../../utils/auth'
import { getUserInfo } from '../../api'
import { usePermissionStore } from './permission'
import pinia from '../index'

const permissionStore = usePermissionStore(pinia)

export const useUserStore = defineStore('layout', {
  state: (): UserStores => {
    return {
      Authorization: getToken() || '',
      avatar: '',
      roles: '',
      permissions: [],
      username: ''
    }
  },
  getters: {
    getAuthorization: (state) => state.Authorization,
    getRoles: (state) => state.roles,
    getUsername: (state) => state.username,
    getPermissions: (state) => state.permissions,
    getAvatar: (state) => state.avatar
  },
  actions: {
    setAuthorization(Authorization: string) {
      this.Authorization = Authorization
    },
    setRoles(roles: string) {
      this.roles = roles
    },
    setUsername(username: string) {
      this.username = username
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    async getUserInfo() {
      const { data } = await getUserInfo()
      if (data.data.role) {
        this.setRoles(data.data.role)
        this.setPermissions(['123', '456'])
        permissionStore.setMenus(data.data.menus)
        permissionStore.setRouters(data.data.routers)
      }
    },
    systemLogout() {
      this.setAuthorization('')
      this.setAvatar('')
      this.setUsername('')
      this.setRoles('')
      this.setPermissions([])
      removeToken()
    },
    simpleLogout() {
      this.setAuthorization('')
      removeToken()
    }
  },
  persist: {
    key: 'USER'
  }
})
