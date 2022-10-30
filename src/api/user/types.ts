export interface ILoginEntity {
  username: string
  password: string
  code: string
  rememberMe: boolean
}

export interface IMeta {
  title: string
  icon: string
  keepAlive: boolean
  requireAuth: boolean
}

export interface IRouterVo {
  name: string
  path: string
  component: string
  meta: IMeta
  children?: Array<IRouterVo>
}

export interface IQueryInfo {
  name?: string
  page?: number
  size?: number
}

export interface IStudent {
  nickName?: string
  realName?: string
  email?: string
  phone?: string
  gender?: number
  avatar?: string
  status?: boolean
  delFlag?: boolean
  loginIp?: string
  loginDate?: string
  remark?: string
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
}
