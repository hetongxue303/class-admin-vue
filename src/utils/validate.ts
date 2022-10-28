/**
 * 自定义用户名验证
 * @param rule 规则
 * @param username 用户名
 * @param callback 回调函数
 */
export const validatorUsername = (
  rule: any,
  username: string,
  callback: Function
) => {
  if (!username) {
    return callback()
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(username)) {
    return callback(new Error('用户名验证不正确'))
  }
  return callback()
}

/**
 * 自定义密码验证
 * @param rule 规则
 * @param password 密码
 * @param callback 回调函数
 */
export const validatorPassword = (
  rule: any,
  password: string,
  callback: Function
) => {
  if (!password) {
    return callback()
  }
  if (!/^[a-zA-Z0-9_]{6,32}$/.test(password)) {
    return callback(new Error('密码验证不正确'))
  }
  return callback()
}
