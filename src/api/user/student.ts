import axios from '../../utils/request'

const studentApi = `${import.meta.env.VITE_GLOB_BASIC_API}/student`

// 获取学生列表
export const getStudentList = () => {
  return axios({
    method: 'GET',
    url: `${studentApi}/list`
  })
}

// 获取某个学生
export const getOneStudent = (studentID: number) => {
  return axios({
    method: 'GET',
    url: `${studentApi}/${studentID}`
  })
}

// 添加一个学生
export const addOneStudent = (data: any) => {
  return axios({
    method: 'POST',
    url: `${studentApi}/add`,
    data
  })
}

// 批量添加学生
export const batchAddStudents = (data: Array<any>) => {
  return axios({
    method: 'POST',
    url: `${studentApi}/batch/add`,
    data
  })
}

// 删除一个学生
export const deleteOneStudent = (studentID: number) => {
  return axios({
    method: 'DELETE',
    url: `${studentApi}/del/${studentID}`
  })
}

// 批量删除学生
export const batchDeleteStudent = (data: Array<number>) => {
  return axios({
    method: 'DELETE',
    url: `${studentApi}/batch/del`,
    data
  })
}

// 更新学生
export const updateStudent = (data: any) => {
  return axios({
    method: 'PUT',
    url: `${studentApi}/update`,
    data
  })
}

// 批量更新学生
export const batchUpdateStudents = (data: Array<any>) => {
  return axios({
    method: 'PUT',
    url: `${studentApi}/batch/update`,
    data
  })
}
