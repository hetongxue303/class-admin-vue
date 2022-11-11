<template>
  <el-row :gutter="10" justify="end" class="table-operation">
    <el-col :span="8" :pull="13">
      <el-button type="primary" :icon="Plus">新增</el-button>
      <el-button type="success" :icon="Edit">编辑</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
      <el-button type="warning" :icon="Bottom">导出</el-button>
    </el-col>
    <el-col :span="3" class="iconBox">
      <el-button>
        <el-icon>
          <component is="Search" />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <component is="Refresh" />
        </el-icon>
      </el-button>
      <el-button>
        <el-icon>
          <component is="Grid" />
        </el-icon>
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.table-operation {
  @apply w-full h-50px flex items-center;
  .iconBox {
    :deep(.el-button) {
      height: 30px;
      width: 30px;
      margin: 0;
      border-radius: 0;
    }
  }
}
</style>
