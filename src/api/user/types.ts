export interface loginEntity {
    username: string
    password: string
    code: string
    rememberMe: boolean
}

export interface meta {
    title: string
    icon: string
    keepAlive: boolean
    requireAuth: boolean
}

export interface loginVo {
    name: string
    path: string
    component: string
    meta: meta
    children?: Array<loginVo>
}

export interface queryInfo {
    name?: string
    page?: number
    size?: number
}