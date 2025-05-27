<template>
  <el-container class="common-layout">
    <el-aside class="layout-aside transition-all"
    :style="{width: !globalStore.isCollapse ? globalStore.menuWidth + 'px' : '70px'}">
      <Logo />
      <Menu />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <Tabs />
      <el-main class="layout-main">
        <router-view v-slot="{ Component, route}">
          <keep-alive :max="16" :include="[]">
            <component :is="Component" :key="route.fullPath" v-if="isRouterShow" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import Logo from './components/Logo.vue';
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';
import Tabs from './components/Tabs.vue';

import useGlobalStore from "@/stores/modules/global.js";

const globalStore = useGlobalStore()

const isRouterShow = ref(true);

</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.layout-aside {
  width: 220px;
  z-index: 10;
  padding-right: 2px;
  padding-left: 2px;
  background-color: #fff;
  border-right: none;
  box-shadow: 2px 0 12px rgba(29, 35, 41, 0.0509803922);
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.layout-header{
    height:56px;
    background:#fff;
    border-bottom:1px solid #e4e2e2;
}
.layout-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 6px;
  overflow-x: hidden;
  background-color: rgb(246 249 254)
}
</style>