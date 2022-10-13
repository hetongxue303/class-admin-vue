<template>
  <el-container>
    <el-aside>
      <side-bar :is-collapse="userStore.getCollapse"/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <!-- tabs.ts -->
<!--      <Tabs/>-->
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from './sidebar/Index.vue'
import Header from './header/Index.vue'
import Footer from './footer/Index.vue'
import Tabs from '../components/tabs/Index.vue'

import {useUserStore} from '../store/modules/user'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
:deep(.el-container) {
  height: 100vh;
  width: 100vw;
  background-color: white;
}

:deep(.el-aside) {
  height: 100vh;
  width: auto;
}

:deep(.el-header) {
  padding: 0;
  margin: 0;
  width: auto;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

:deep(.el-main) {
  height: 100%;
  width: 100%;
}

:deep(.el-footer) {
  height: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>