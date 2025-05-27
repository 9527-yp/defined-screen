<template>
    <el-menu class="el-menu-vertical-demo"
    :default-active="activeMenu"
    :collapse="globalStore.isCollapse"
    :collapse-transition="false"
    :uniqueOpened="true"
    :router="false"
    :class="menuAnimate">
      <MenuList :menuList="menuList" />
    </el-menu>
</template>

<script setup>
import MenuList from './MenuList.vue'
import {ref, computed} from 'vue'
import { useRoute } from "vue-router";
import useGlobalStore from "@/stores/modules/global.js";
import { menuRouter } from '@/router/index.js';

const route = useRoute()
const globalStore = useGlobalStore()

const menuList = computed(() => {
    let menuArr = MenuFun(menuRouter);
    const scrrenItem = {
        path: '/screen',
        meta: {
            title: "可视化大屏",
            icon: "Share",
        }
    }
    menuArr.splice(1,0,scrrenItem)
    return menuArr
})
const activeMenu = computed(() => route.path);

const menuAnimate = ref('animate__animated animate__fadeInLeft')

const MenuFun = (routerArr) => {
    const extractedArr = []
    routerArr.forEach((item, index) => {
        if(item.meta.isHide !== '0'){
            const newItem = {
                path: item.path,
                meta: {
                    title: item.meta.title,
                    icon: item.meta.icon
                }
            }
            if (item.children && item.children.length > 0) {
                newItem.children = MenuFun(item.children); // 先处理 children，再推入
            }
            extractedArr.push(newItem); // 推入处理后的项
        }
    });
    return extractedArr;
}
</script>

<style lang="scss" scoped>
.el-menu{
    border-right:none;
}
</style>
<style lang="scss">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: 70px !important;
}
</style>