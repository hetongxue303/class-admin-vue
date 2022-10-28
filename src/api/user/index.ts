import * as qs from 'qs'
import axios from '../../utils/request'
import { loginEntity } from './types'

const baseAPI = `${import.meta.env.VITE_GLOB_BASIC_API}/auth`

// 获取验证码
export const getCaptcha = () => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/captchaImage`
  })
}

// 登录处理
export const login = (data: loginEntity) => {
  return axios({
    method: 'POST',
    url: `${baseAPI}/login`,
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
    url: `${baseAPI}/logout`
  })
}

// 获取用户信息
export const getUserList = (data: any) => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/test`,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
