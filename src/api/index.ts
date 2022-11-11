import * as qs from 'qs'
import axios from '../utils/request'
import { ILoginEntity } from './types'

const baseAPI = `${import.meta.env.VITE_GLOB_BASIC_API}`

// 获取验证码
export const getCaptcha = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/auth/captchaImage`
  })
}

// 登录处理
export const login = (data: ILoginEntity) => {
  return axios({
    method: 'POST',
    url: `${baseAPI}/auth/login`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 注销处理
export const logout = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/auth/logout`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/user/getUserInfo`
  })
}
