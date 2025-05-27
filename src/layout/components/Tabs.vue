<template>
    <div class="header-tabs">
        <el-tabs
          v-model="activeTab"
          type="card"
          class="demo-tabs"
          @tab-click="clickToggleTab"
          @tab-remove="removeTab"
        >
            <el-tab-pane
            v-for="item in tabList"
            :key="item.path"
            :label="item.title"
            :name="item.path"
            :closable="item.closeIcon"
            >
                <!-- 加载图标 -->
                <template #label>
                    <div class="tabs-icon">
                    <el-icon class="m-r-2px" v-show="item.icon">
                        <component v-if="item.icon" :is="item.icon"></component>
                    </el-icon>
                    <div>
                        {{ item.title }}
                    </div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
      </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {useRoute, useRouter } from 'vue-router'

import useTabsStore from '@/stores/modules/tabs.js'

// 获取当前路由
const route = useRoute();
// 路由跳转
const router = useRouter();

const tabsStore = useTabsStore()


// 页面创建后，立即初始化选项卡 AND 拖拽函数
onMounted(() => {
  addTab(); // 添加选项卡[进入根页面，立即添加首页]
  setActiveTab(); // 设置激活选项卡[进入根页面，立即激活首页]
})

// 获取选项卡数据
const tabList = computed(() => {
  return tabsStore.getTabs
})

//激活选项卡
const activeTab = ref(route.fullPath)
const setActiveTab = () => {
  activeTab.value = route.fullPath
}

// 添加选项卡
const addTab = () => {
  // 解构路由数据
  const { meta, fullPath } = route;
  // 构造选项卡数据
  const tab = {
    icon: meta.icon,
    title: meta.title,
    path: fullPath,
    name: route.name,
    closeIcon: route.meta.isAffix == "1", // true则显示关闭图标
    isKeepAlive: route.meta.isKeepAlive
  };
  if (fullPath == '/home/index') {
    // 如果是首页的话，就固定不可关闭。
    tab.closeIcon = false;
  }
  // 添加到选项卡仓库里面
  tabsStore.addTab(tab);

}

// 监听当前路由，路由path发生变化添加选项卡数据
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull === "0" || route.meta.isHide === '0') return;
    // 2、激活选中的选项卡
    setActiveTab();
    // 3、添加选项卡
    addTab();
  }
);
// 点击选项卡
const clickToggleTab = (tab) => {
  const { props } = tab;
  // 将切换的选项卡进行添加路由操作
  router.push({ path: props.name});
}

// 删除选项卡
const removeTab = (fullPath) => {
  tabsStore.removeTab(fullPath,fullPath == route.fullPath,'null')
}

</script>

<style lang="scss" scoped>
.header-tabs{
    width:100%;
    height:42px;
    display:flex;
    align-items: center;
    background:#fff;
    border-bottom:1px solid #e4e2e2;
}
.tabs-icon {
    display:flex;
    align-items: center;
    justify-content: center;
}
/** tabs选项卡的css开始 */
.demo-tabs {
  @apply dark:border-#313233;
  // 色弱模式
  background-color: var(--el-bg-color);
}
:deep(.el-tabs__item:first-child) {
  margin-left: 16px;
}
:deep(.el-tabs__item:nth-child(n)) {
  // 选中/未选中边框
  border: 1px solid #e0e0e6 !important;
}
:deep(.el-tabs__item:not(:active)) {
  // 设置未选中的边框
  border: 1px solid #e0e0e6;
}
:deep(.el-tabs__item) {
  height: 28px;
  margin-top: 1px;
  margin-left: 6px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border: 1px solid #e0e0e6;
  border-radius: 4px;
  .is-top {
    border-bottom: none !important;
  }

  // 设置鼠标悬停时的样式
  &:hover {
    background: #fee5d3;
    color: #fa7e23;
    border: none;
  }

  // 设置鼠标选中的样式[可用来定制不同配色的主题]
  &.is-active {
    color: #fa7e23;
    background: #fee5d3;

    // 边框选中颜色
    border: 1px solid #fa7e23 !important;
  }
}
:deep(.el-tabs__header) {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 0;
  border-bottom: none !important;
//   border-top: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
//   border-bottom: 1px solid var(--el-color-info-light-7); // 选项卡边框实线
}
:deep(.el-tabs__nav.is-top) {
  height: 32px; // 高度越高，可以调整tab卡距离底部的高度
  border: none; //  去除左侧tabs边框
  border-radius: 4px;
}

// 覆盖多余边框
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__nav-prev) {
  // 标签页多了左侧图标
  line-height: 35px;
}
:deep(.el-tabs__nav-next) {
  // 标签页多了右侧图标
  line-height: 35px;
}
.el-tabs--card {
  height: 40px !important;
}

/** tabs选项卡的css结束 */
</style>