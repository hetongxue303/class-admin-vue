<template>
  <!--折叠组件-->
  <div class="collapse-content" @click="userStore.setCollapse(!isCollapse)">
    <el-icon :size="28">
      <component is="expand" v-if="isCollapse" />
      <component is="fold" v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../../store/modules/user'

const userStore = useUserStore()

const isCollapse = computed(() => {
  return userStore.getCollapse
})
</script>

<style scoped lang="scss"></style>
