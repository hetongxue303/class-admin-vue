import { ITabs } from '../components/tabs/types'
import { RouteRecordRaw } from 'vue-router'
import { IMenuItem } from '../layout/types'

/**
 * UserStore
 */
export interface IUserStore {
  Authorization: string // token信息
  collapse: boolean // 折叠面板
  role: string // 角色信息
  routers: Array<RouteRecordRaw>
  menus: Array<IMenuItem>
}

/**
 * TabsStore
 */
export interface ITabsStore {
  tabs: ITabs[]
  activeName: string
  currentName: string
}
