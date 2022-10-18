<template>
  <div class="header-parent">
    <div class="left">
      <!--折叠-->
      <Collapse />
    </div>
    <div class="right">
      <!--全屏-->
      <full-screen class="components-space" />
      <!--个人中心-->
      <Center />
    </div>
  </div>
</template>

<script setup lang="ts">
import Collapse from './components/Collapse.vue'
import FullScreen from './components/FullScreen.vue'
import Center from './components/Center.vue'
</script>

<style scoped lang="scss"></style>
