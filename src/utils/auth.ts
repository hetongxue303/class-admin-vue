import { useCookies } from '@vueuse/integrations/useCookies'
import { Const_Cookie } from '../constant/cookie'

const cookies = useCookies()
/**
 * 获取token
 */
export const getToken = (): string => {
  return cookies.get(Const_Cookie.AUTHORIZATION_KEY)
}
/**
 * 清除token
 */
export const removeToken = () => {
  cookies.remove(Const_Cookie.AUTHORIZATION_KEY)
}
/**
 * 设置token
 * @param token
 */
export const setToken = (token: string) => {
  cookies.set(Const_Cookie.AUTHORIZATION_KEY, token)
}
