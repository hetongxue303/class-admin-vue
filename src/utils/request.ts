import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'
import { getToken, removeToken } from './auth'
import { MessageBox } from '@element-plus/icons-vue'
import { useUserStore } from '../store/modules/user'
import router from '../router'

// 是否显示重新登录
export const isReLogin = { show: false }

axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  timeoutErrorMessage: '请求超时',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // 让每个请求携带自定义token
    if (getToken() && config.headers) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error: any) => {
    ElNotification.error('未知错误')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status === 401 || response.data.code === 401) {
      if (!isReLogin.show) {
        isReLogin.show = true
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            isReLogin.show = false
            const userStore = useUserStore()
            userStore.userLogout()
            router.replace('/login')
          })
          .catch(() => (isReLogin.show = false))
      }
    }
    return response
  },
  async (error: any) => {
    return Promise.reject(error)
  }
)

export default axios
