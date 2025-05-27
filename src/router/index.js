import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import Layout from "@/layout/index.vue";

export const menuRouter = [
  {
    path: '/home/index', // [唯一]
    component: () => import("@/views/Home/index.vue"),
    meta: {
      title: "数据来源管理", // 标题
      icon: "HomeFilled", // 图标
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: "", // 是否外链[有值则是外链]
      isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
      isFull: "1", // 是否缓存全屏[0是，1否]
      isAffix: "0" // 是否缓存固定路由[0是，1否]
    }
  },
  {
    path: '/home/equipmentDetail', // [唯一]
    component: () => import("@/views/Home/equipmentDetail.vue"),
    meta: {
      title: "设备详情", // 标题
      icon: "UserFilled", // 图标
      isHide: "0", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: "", // 是否外链[有值则是外链]
      isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
      isFull: "1", // 是否缓存全屏[0是，1否]
      isAffix: "1" // 是否缓存固定路由[0是，1否]
    }
  },
  {
    path: '/system', // [唯一]
    redirect: '/system/user',
    meta: {
      title: "系统管理", // 标题
      icon: "Tools", // 图标
      isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
      isLink: "", // 是否外链[有值则是外链]
      isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
      isFull: "1", // 是否缓存全屏[0是，1否]
      isAffix: "1" // 是否缓存固定路由[0是，1否]
    },
    children: [
      {
          path: '/system/user', // [唯一]
          component: () => import("@/views/system/user/index.vue"),
          meta: {
            title: "成员管理", // 标题
            icon: "UserFilled", // 图标
            isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
            isLink: "", // 是否外链[有值则是外链]
            isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
            isFull: "1", // 是否缓存全屏[0是，1否]
            isAffix: "1" // 是否缓存固定路由[0是，1否]
          }
      },
      {
          path: '/system/role', // [唯一]
          component: () => import("@/views/system/role/index.vue"),
          meta: {
            title: "角色管理", // 标题
            icon: "CameraFilled", // 图标
            isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
            isLink: "", // 是否外链[有值则是外链]
            isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
            isFull: "1", // 是否缓存全屏[0是，1否]
            isAffix: "1" // 是否缓存固定路由[0是，1否]
          }
      },
      {
          path: '/system/authority', // [唯一]
          component: () => import("@/views/system/authority/index.vue"),
          meta: {
            title: "权限管理", // 标题
            icon: "Menu", // 图标
            isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
            isLink: "", // 是否外链[有值则是外链]
            isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
            isFull: "1", // 是否缓存全屏[0是，1否]
            isAffix: "1" // 是否缓存固定路由[0是，1否]
          }
      },
      {
        path: '/system/form', // [唯一]
        component: () => import("@/views/system/form/index.vue"),
        meta: {
          title: "表单管理", // 标题
          icon: "Connection", // 图标
          isHide: "1", // 代表路由在菜单中是否隐藏，是否隐藏[0隐藏，1显示]
          isLink: "", // 是否外链[有值则是外链]
          isKeepAlive: "0", // 是否缓存路由数据[0是，1否]
          isFull: "1", // 是否缓存全屏[0是，1否]
          isAffix: "1" // 是否缓存固定路由[0是，1否]
        }
      },
    ]
  }
]

const routes = [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/home/index',
        children: [
          ...menuRouter
        ]
    },
    {
        path: '/screen',
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "可视化大屏",
            icon: "Share",
            isHide: "0",
            isLink: "",
            isKeepAlive: "0",
            isFull: "1",
            isAffix: "0"
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router