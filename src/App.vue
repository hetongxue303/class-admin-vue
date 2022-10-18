<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setBrowserTitle } from './utils/common'

const route = useRoute()
const router = useRouter()

watch(
  () => route.path,
  () => setBrowserTitle(router),
  { deep: true, immediate: true },
)
</script>

<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style scoped></style>
