import { ITabs } from "../components/tabs/types";

/**
 * UserStore
 */
export interface IUserStore {
  Authorization: string; // token信息
  collapse: boolean; // 折叠面板
  roles: Array<string>; // 角色列表
}

/**
 * TabsStore
 */
export interface ITabsStore {
  tabs: ITabs[];
  activeName: string;
  currentName: string;
}
