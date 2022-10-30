import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import nProgress from 'nprogress'
import { ElNotification } from 'element-plus'
import { getToken, removeToken } from './auth'

const router = useRouter()

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
    nProgress.start()
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
    nProgress.done()
    return response
  },
  async (error: any) => {
    const { response } = error
    if (response.status === 401 || response.data.code === 401) {
      ElNotification.warning(
        response.data.message.length > 0
          ? response.data.message
          : '您未登录，请先登录'
      )
      removeToken()
      await router.replace('/login')
    }
    return Promise.reject(error)
  }
)

export default axios
