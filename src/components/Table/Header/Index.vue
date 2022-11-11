<template>
  <el-row :gutter="10" justify="end" class="table-header">
    <el-col :span="6">
      <el-input placeholder="输入查询内容..." />
    </el-col>
    <el-col :span="4">
      <el-button type="primary">搜索</el-button>
      <el-button type="warning">重置</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.table-header {
  @apply w-full h-50px flex items-center;
}
</style>
