import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getToken,
  getTokenTime,
  removeToken,
  removeTokenTime,
  setToken,
  setTokenTime
} from './auth'
import { refreshToken } from '../api'
import { session } from './storage'

let isRefresh = false

axios.create({
  baseURL: import.meta.env.VITE_GLOB_BASE_URL,
  timeout: 15 * 1000,
  withCredentials: true,
  timeoutErrorMessage: '请求超时',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (getToken() && config.headers) {
      // 判断token是否快要过期
      const currentTime = new Date().getTime()
      const expireTime = getTokenTime()
      if (expireTime > 0) {
        const min = (expireTime - currentTime) / 1000 / 60
        if (min < 10) {
          if (!isRefresh) {
            isRefresh = true
            refreshToken()
              .then((res) => {
                if (res.status === 200 || res.data.code === 200) {
                  setToken(res.data.data.token)
                  setTokenTime(res.data.data.expireTime)
                }
              })
              .catch((error) => {
                ElMessage.error({ message: error.message, duration: 5 * 1000 })
              })
              .finally(() => {
                isRefresh = false
              })
          }
        }
      }
      // 每个请求头都带上token
      config.headers.Authorization = getToken()
    }
    return config
  },
  async (error: any) => {
    session.clear()
    removeToken()
    removeTokenTime()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response
  },
  async (error: any) => {
    // const { response } = await error
    // if (response.status === 401 || response.data.code === 401) {
    //   ElMessageBox.confirm("'用户登录信息过期，请重新登录！", '系统提示', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     session.clear()
    //     removeToken()
    //     removeTokenTime()
    //     location.reload()
    //   })
    // }
    ElMessage.error({ message: `request:${error.message}`, duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

export default axios
