<template>
  <el-table :data="tableData" border style="width: 100%">
    <template #empty>
      <el-empty :image-size="100" description="没有数据哦"></el-empty>
    </template>
    <el-table-column prop="realName" label="姓名" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="phone" label="电话" width="180" />
    <el-table-column prop="status" label="状态" width="180" />
  </el-table>
</template>

<script setup lang="ts">
import { getUserList } from '../../api/user/student'
import { onMounted, reactive } from 'vue'
import { IStudent } from '../../api/user/types'

let tableData = reactive<Array<IStudent>>([])

const getTeachers = async () => {
  const { data } = await getUserList('teacher')
  tableData = data.data
  console.log(tableData)
}

onMounted(() => {
  getTeachers()
})
</script>

<style scoped lang="scss"></style>
