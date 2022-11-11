<template>
  <el-pagination
    v-model:currentPage="cPage"
    v-model:page-size="cPageSize"
    :page-sizes="pageSizes"
    :small="small"
    :disabled="disabled"
    :background="background"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { computed, PropType, watch } from 'vue'

const cPage = computed({
  get: () => {
    return props.currentPage
  },
  set: (value) => {
    emit('update', value)
  }
})
const cPageSize = computed({
  get: () => {
    return props.pageSize
  },
  set: (value) => {
    emit('update', value)
  }
})

const emit = defineEmits<{
  (e: 'update', value: number): void
}>()

const props = defineProps({
  total: {
    type: Number as PropType<number>,
    required: true,
    default: 0
  },
  currentPage: {
    type: Number as PropType<number>,
    required: true,
    default: 1
  },
  pageSize: {
    type: Number as PropType<number>,
    required: false,
    default: 10
  },
  small: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  layout: {
    type: String as PropType<string>,
    required: false,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    required: false,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  background: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: true
  }
})
const handleSizeChange = () => {}
const handleCurrentChange = () => {}
</script>

<style scoped lang="scss"></style>
