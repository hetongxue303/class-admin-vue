<template>
  <!--全屏组件-->
  <div class="full-screen" @click="toggleFullScreen">
    <el-icon :size="20">
      <component is="FullScreen" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style scoped lang="scss"></style>
