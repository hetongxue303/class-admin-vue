<template>
  <el-menu
    router
    unique-opened
    collapse-transition
    :default-active="activeValue"
    :collapse="isCollapse"
    mode="vertical"
    text-color="#fff"
    active-text-color="#ffd04b"
    background-color="#545c64"
  >
    <Logo :collapse="isCollapse" />
    <menu-item :data="data" />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { menus } from '../data/menus'

import MenuItem from './components/MenuItem.vue'
import Logo from './components/Logo.vue'

const route = useRoute()

const data = menus

defineProps({
  isCollapse: { type: Boolean, required: true, default: false }
})

const activeValue = computed((): string => {
  return route.path
})
</script>

<style scoped lang="scss">
.el-menu {
  width: 64px;
  height: 100vh;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
