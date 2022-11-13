import { RouteRecordRaw } from 'vue-router'
import { IMenuItem } from '../layout/types'

export type UserStores = {
  Authorization: string
  username: string
  avatar: string
  roles: string
  permissions: string[]
}

export type PermissionStore = {
  menus: Array<IMenuItem>
  routers: Array<RouteRecordRaw>
}

export type LayoutStore = {
  collapse: boolean
}

export type SettingStore = {}
