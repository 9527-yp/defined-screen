<template>
    <div class="header">
            <div class="header-left">
                <el-icon class="header-icon" size="20" @click="changeCollapseIcon">
                    <Fold v-if="!globalStore.isCollapse" style="width:20px; height:20px;"/>
                    <Expand v-if="globalStore.isCollapse" style="width:20px; height:20px;"/>
                </el-icon>
                <div class="header-bread">
                    <!-- <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in breadcrumbList" :key="item.path">
                            <div class="el-breadcrumb__inner is-link" @click="handleBreadcrumb(item,index)">
                                <el-icon class="breadcrumb-icon">
                                    <component :is="item.meta.icon"></component>
                                </el-icon>
                                <span class="breadcrumb-title">{{ item.meta.title }}</span>
                            </div>
                        </el-breadcrumb-item>
                    </el-breadcrumb> -->
                </div>
            </div>
            <div class="header-right">
                <el-image class="user-image" :src="avatar">
                    <template #error>
                    <el-image class="w-34px h-34px rounded-full select-none user-avatar" :src="errorAvatar"></el-image>
                    </template>
                </el-image>
                <el-dropdown class="dropdown" :hide-on-click="false" @command="handleCommand">
                    <div class="koi-dropdown">
                        <div class="line-clamp-1">王将(管理员)</div>
                        <el-icon><arrow-down /></el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="koiMine">个人中心</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from "vue-router";

import useGlobalStore from "@/stores/modules/global.js";

const globalStore = useGlobalStore()
const route = useRoute()
const router = useRouter()

// 用户头像
const avatar = ref(
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fae90b4c7-98b6-4a47-b1b3-9ee8bc71acf6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692146441&t=6fca60f3a0d323869b81d8fb53b5dd1b"
);
const errorAvatar = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";

const changeCollapseIcon = () => {
    // 定义图标切换变量(true-折叠，false-展开)
    globalStore.isCollapse = globalStore.setCollapse(globalStore.isCollapse);
}

// 面包屑数据
// const breadcrumbList = computed(() => {
//   let breadcrumbData = authStore.getBreadcrumbList[route.matched[route.matched.length - 1].path] ?? [];
//   // 不需要首页面包屑可删除以下判断
//   if (breadcrumbData[0].path !== '/home/index') {
//     breadcrumbData = [{ path: '/home/index', meta: { icon: "HomeFilled", title: "首页" } }, ...breadcrumbData];
//   }
//   return breadcrumbData;
// });

// 退出登录
const handleLayout = () => {
  window.localStorage.removeItem('token');
  // 退出登录。必须使用replace把页面缓存刷掉。
  window.location.replace('/login');
};

// 面包屑跳转
const handleBreadcrumb = (item, index) => {
    // if (index !== breadcrumbList.value.length - 1) router.push(item.path);
}
// 下拉折叠（退出登录）
const handleCommand = (command) => {
  switch (command) {
    case "koiMine":
    //   router.push("/system/personage");
      break;
    case "logout":
      handleLayout();
      break;
  }
};
</script>

<style lang="scss" scoped>
.header{
    display:flex;
    align-items: center;
    justify-content: space-between;
    height:100%;
    .header-left{
        display:flex;
        align-items: center;
        height:100%;
        .header-icon{
            cursor: pointer;
            &:hover{
                color: #fa7e23;
            }
        }
        .header-bread{
            margin-left:20px;
            display:flex;
            align-items: center;
        }
    }
    .header-right{
        height:100%;
        display:flex;
        align-items: center;
        .user-image{
            width:34px;
            height:34px;
            border-radius:50%;
        }
        .dropdown{
            margin-left:10px;
        }
        .koi-dropdown {
            color: #fa7e23;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            display: flex;
            align-items: center;
            .line-clamp-1 {
                margin-right:6px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                line-clamp: 1;
            }
        }
    }
}
.el-breadcrumb {
    white-space: nowrap;
    display:flex;
    align-items: center;
    .el-breadcrumb__item {
      position: relative;
      display:flex;
      align-items: center;
      .breadcrumb-title {
        font-weight: 600;
      }
      .item-no-icon {
        transform: translateY(-3px);
      }
      .el-breadcrumb__inner {
        display: flex;
        align-items: center;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: #fa7e23;
          }
        }
        .breadcrumb-icon {
          margin-top: 1px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 2px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        transform: translateY(-1px);
      }
    }
}
</style>