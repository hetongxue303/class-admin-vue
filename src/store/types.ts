import { ITabs } from '../components/tabs/types'

/**
 * UserStore
 */
export interface IUserStore {
  Authorization: string // token信息
  collapse: boolean // 折叠面板
}

/**
 * TabsStore
 */
export interface ITabsStore {
  tabs: ITabs[]
  activeName: string
  currentName: string
}
