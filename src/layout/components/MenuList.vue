<template>
    <!-- 有下级，用el-sub-menu，无下级用el-menu-item -->
    <template v-for="item in menuList" :key="item.path">
        <!-- 非叶子节点 v-show：true(显示)false(隐藏)，v-if反之。 -->
        <el-sub-menu v-if="item.children?.length" :index="item.path">
            <template #title>
                <el-icon><component :is="item.meta.icon"></component></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <MenuList :menuList="item.children" />
        </el-sub-menu>
        <!-- 叶子节点[功能节点] -->
        <el-menu-item v-else :index="item.path" @click="handMenuRouter(item.path)">
            <el-icon><component :is="item.meta.icon"></component></el-icon>
            <span>{{ item.meta.title }}</span>
        </el-menu-item>
    </template>
</template>

<script setup>
// 获取父组件传递过来的数据
defineProps(["menuList"]);

import MenuList from '@/layout/components/MenuList.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

// 菜单点击跳转
const handMenuRouter = (value) => {
    router.push(value)
}
</script>

<style lang="scss" scoped>
.el-menu{
    border-right:none;
}
/** el-menu鼠标悬停和点击代码 */
// 父节点
.el-menu-item {
  height: 40px !important;
  margin-bottom: 3px;
  font-weight: 500;
  // color: #000000;

  /* 设置用户禁止选中 */
  user-select: none;
  border-left: 6px solid transparent;
  border-radius: 6px;

  // @apply dark:c-#E5E3FA;
  color: var(--el-menu-text-color);
  i {
    transform: translate(-8px); // 图标偏移
  }
  span {
    transform: translate(-8px); // 文字偏移
  }

  // 设置鼠标悬停时el-menu-item的样式
  &:hover {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    border-left: 6px solid #fa7e23;

    // & 含义 .el-menu-item
    border-radius: 6px;

    // 实现鼠标悬停时icon变色
    i {
      // color: var(--el-color-primary);
      color: #fa7e23;
    }
  }

  // 设置选中el-menu-item时的样式
  &.is-active {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
}
:deep(.el-sub-menu__title) {
  height: 40px;
  padding-right: 0; // 去除collapse缩小多余的边框
  margin-bottom: 3px;
  font-weight: 500;

  /* 设置用户禁止选中 */
  user-select: none;
  border-left: 6px solid transparent;
  border-radius: 6px;

  // @apply dark:c-#E5E3FA;
//   color: #fa7e23;
  i {
    transform: translate(-8px); // 图标偏移
  }
  span {
    transform: translate(-8px); // 文字偏移
  }
  &:hover {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
  &:active {
    // color: var(--el-color-primary);
    color: #fa7e23;
    // background: var(--el-color-primary-light-8);
    background: #fee5d3;
    // border-left: $aside-menu-border-left solid var(--el-color-primary);
    border-left: 6px solid #fa7e23;
  }
}

</style>
<style lang="scss">
.el-sub-menu.is-active > .el-sub-menu__title {
  // color: var(--el-color-primary) !important;
  color: #fa7e23 !important;
}

/* icon图标也跟着变 */
.el-sub-menu.is-active > .el-sub-menu__title i {
  // color: var(--el-color-primary) !important;
  color: #fa7e23 !important;
}
</style>