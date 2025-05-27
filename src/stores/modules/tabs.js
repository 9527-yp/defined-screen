import { defineStore } from "pinia";
import router from '@/router'

const tabsStore = defineStore('tabs',{
    state : () => {
        return {
            tabList: [] // 选项卡
        }
    },
    // 开启数据持久化
    persist: {
        // enabled: true, // true 表示开启持久化保存
        key: "tabs", // 默认会以 store 的 id 作为 key
        storage: localStorage
    },
    actions: {
        // 添加选项卡数据
        async addTab(tab) {
            // 判断该选项卡是否已添加
            const isTab = this.tabList.some((item) => {
                return item.path === tab.path
            })
            if(isTab){
                return ;
            }else {
                this.tabList.push(tab);
            }
        },
        async removeTab(tabPath, isCurrent = true, selectedPath){
            // 如果关闭的是首页，直接返回，不进行操作
            if(tabPath == '/home/index'){
                return ;
            }
            // 删除选项卡路由缓存
            const oldTabList = this.tabList;
            // 将这个需要删除的选项卡过滤掉，重新赋值给选项卡数组。
            this.tabList = this.tabList.filter(item => item.path !== tabPath);
            if(isCurrent){
                // 如果关闭的不是选项卡被选中的，则依旧选择被选中的选项卡。
                const matchingPathObject = this.tabList.find((item) => item.path == selectedPath);
                if (matchingPathObject) {
                    router.push(matchingPathObject?.path || '/home/index');
                    return;
                }
                // 关闭的是当前页
                oldTabList.forEach((item,index) => {
                    if(item.path !== tabPath) {
                        return 
                    }
                    // 找到下一个选项卡或上一个选项卡。通过计算索引值可以得到下一个选项卡的位置，即 this.tabList[index + 1]；如果不存在下一个选项卡，则返回上一个选项卡的位置，即 this.tabList[index - 1]
                    const nextTab = oldTabList[index + 1] || oldTabList[index - 1]
                    if(nextTab){
                        // 如果找到了下一个或上一个选项卡，则使用路由导航方法[假设是 router.push]将页面跳转到该选项卡对应的路径。
                        router.push(nextTab.path);
                    }
                })
            }
        },
        // 用来清空Tabs缓存
        async setTab(tabList) {
            this.tabList = tabList;
        },
        },
    // 计算属性，和vuex是使用一样，getters里面不是方法，是计算返回的结果值
    getters: {
        getTabs(state) {
            return state.tabList
        }
    }
})

// 对外暴露方法
export default tabsStore;