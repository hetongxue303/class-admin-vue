import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { getToken, removeToken } from './auth'
import { Message, MessageBox } from '@element-plus/icons-vue'
import { useUserStore } from '../store/modules/user'
import router from '../router'

// 是否显示重新登录
export const isReLogin = { show: false }

axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 10 * 1000,
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
  async (error: any) => {
    await Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response
  },
  async (error: any) => {
    const { response } = await error
    switch (response.status || response.data.code) {
      case 401:
        if (!isReLogin.show) {
          isReLogin.show = true
          ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(async () => {
              isReLogin.show = false
              const userStore = useUserStore()
              userStore.userLogout()
              window.location.replace('/login')
            })
            .catch(() => {
              isReLogin.show = false
            })
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      case 415:
        ElMessage.error({ message: '请求头错误', duration: 5 * 1000 })
        return Promise.reject(new Error(response.data.message))
      case 500:
        ElMessage.error({ message: response.data.message, duration: 5 * 1000 })
        return Promise.reject(new Error(response.data.message))
      default:
        ElNotification.error(response.data.message)
        return Promise.reject(error)
    }
  }
)

export default axios
