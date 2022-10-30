import axios from '../../utils/request'

const baseAPI = `${import.meta.env.VITE_GLOB_BASIC_API}`

// 学生/教师信息
export const getUserList = (key: string) => {
  return axios({
    method: 'GET',
    url: `${baseAPI}/user/getUserList/${key}`
  })
}
