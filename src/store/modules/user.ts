import {defineStore} from 'pinia'
import {getToken, removeToken} from '../../utils/auth'
import {IUserStore} from '../types'

export const useUserStore = defineStore('user', {
    state: (): IUserStore => {
        return {
            Authorization: getToken() || '',
            collapse: false,
            roles: []
        }
    },
    getters: {
        getCollapse: (state) => state.collapse,
        getRoles: (state) => state.roles
    },
    actions: {
        // 设置折叠面板状态
        setCollapse(status: boolean) {
            this.collapse = status
        },
        // 用户注销
        logout() {
            removeToken()
            this.$reset()
        }
    },
    persist:{
        key:'USER'
    }
})