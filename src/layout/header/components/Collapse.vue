<template>
  <!--折叠组件-->
  <div class="collapse-content" @click="appStore.setCollapse(!isCollapse)">
    <el-icon :size="28">
      <component is="expand" v-if="isCollapse" />
      <component is="fold" v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../../../store/modules/app'

const appStore = useAppStore()

const isCollapse = computed(() => {
  return appStore.getCollapse
})
</script>

<style scoped lang="scss"></style>
