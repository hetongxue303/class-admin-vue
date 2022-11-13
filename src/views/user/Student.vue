<template>
  <div class="table-content">
    <el-row :gutter="10" justify="end" class="table-header">
      <el-col :span="6">
        <el-input v-model="Page.query" placeholder="输入查询内容..." />
      </el-col>
      <el-col :span="4">
        <el-button type="primary">搜索</el-button>
        <el-button type="warning">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" justify="end" class="table-operation">
      <el-col :span="8" :pull="13">
        <el-button type="primary" :icon="Plus" @click="handleAdd"
          >新增</el-button
        >
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
    <el-table
      :data="tableData"
      empty-text="暂无数据"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column type="selection" width="30" />
      <el-table-column label="ID" prop="userId" width="50" align="center" />
      <el-table-column label="学号" prop="userNo" width="110" align="center" />
      <el-table-column label="性别" prop="gender" align="center">
      </el-table-column>
      <el-table-column label="学院" prop="cid" align="center" />
      <el-table-column label="专业" prop="mid" align="center" />
      <el-table-column label="姓名" prop="realName" align="center" />
      <el-table-column label="邮箱" prop="email" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      v-model:currentPage="Page.currentPage"
      v-model:page-size="Page.pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      :small="true"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { getStudentListPage } from '../../api/user/student'
import { onMounted, reactive, ref } from 'vue'
import { IUser } from '../../api/user/types'
import { ElTable } from 'element-plus'
import { IPage } from '../../api/types'
import { Plus, Delete, Edit, Bottom } from '@element-plus/icons-vue'

const handleSizeChange = () => {
  console.log(Page.pageSize)
}
const handleCurrentChange = () => {
  console.log(Page.currentPage)
}
const Page: IPage = {
  query: '',
  currentPage: 1,
  pageSize: 10
}

const tableData = reactive<Array<IUser>>([])
const getData = async () => {
  const { data } = await getStudentListPage(Page)
  console.log(JSON.parse(JSON.stringify(data.data)))
  // data.data.forEach((item: IUser) => tableData.push(item))
}
// 处理新增
const handleAdd = () => {}
// 处理编辑
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
// 处理删除
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}

onMounted(() => getData())
</script>

<style scoped lang="scss">
.table-content {
  @apply w-full h-full;
  .table-header {
    @apply w-full h-50px flex items-center;
  }
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
}
</style>
