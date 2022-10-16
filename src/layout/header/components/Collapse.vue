<template>
  <!--折叠组件-->
  <div class="collapse-content" @click="userStore.setCollapse(!isCollapse)">
    <el-icon :size="28">
      <component v-if="isCollapse" is="expand" />
      <component v-else is="fold" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../store/modules/user";
import { computed } from "vue";

const userStore = useUserStore();

const isCollapse = computed(() => {
  return userStore.getCollapse;
});
</script>

<style scoped lang="scss"></style>
