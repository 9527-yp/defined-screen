<template>
    <!-- <v-scale-screen width="1920" height="1080"> -->
        <div class="home">
            <!-- <div class="unity-box">
                <iframe ref="iframeRef" width="100%" height="100%" scrolling="no" src="/CustomSchoolWEBGL/index.html" frameborder="0"></iframe>
            </div> -->
            <!-- <el-button style="float: right;" @click="editBtn">编辑</el-button> -->
            <!-- 选中的边框 -->
            <div class="border-item" v-if="borderShow" :style="borderStyle"></div>
            <!-- 拖拽边框 -->
            <div class="drag-box" v-drag="state" v-show="dragShow" :style="dragStyle">
                <span class="piont-drag">
                    <i class="piont-drag-icon"></i>
                </span>
                <span class="drag-rb" v-zoom="state">
                    <i class="piont-drag-zoom"></i>
                </span>
            </div>
            
            <template v-for="item in state.blocks" :key="item.id">
                <component
                    :is="getComponent(item.key)"
                    v-if="getComponent(item.key)"
                    :block="item"
                    v-model:state="state"
                    @openDeepSeek="openDeepSeek"
                />
            </template>
            
            <!-- 项目顶部标题 -->
            <STXYTitle @settingClick="editBtn" />

            <!-- 编辑模态框 -->
            <HomeDrawer v-model:drawer="drawer" v-model:state="state" v-model:borderShow="borderShow" />
            <!-- deepseek问答弹框 -->
            <DeepSeek v-model:AIVisible="AIVisible" />
        </div>
    <!-- </v-scale-screen> -->
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VScaleScreen from 'v-scale-screen';
import HomeDrawer from '@/components/dialog/HomeDrawer.vue';
import DeepSeek from '@/components/dialog/DeepSeek.vue';
import Module1 from '@/components/module/module1.vue';
import Module2 from '@/components/module/module2.vue';
import ModuleText from '@/components/module/moduleText.vue';
import ModuleImg from '@/components/module/moduleImg.vue';
import ModuleVideo from '@/components/module/moduleVideo.vue';
import ModuleDeepSeek from '@/components/module/moduleDeepSeek.vue';

import STXYTitle from '@/components/module/STXYTitle.vue';
import STXYProjectIntroduce from '@/components/module/STXYProjectIntroduce.vue';
import STXYYearCarbonQuota from '@/components/module/STXYYearCarbonQuota.vue';
import STXYSystemCarbonAnalyse from '@/components/module/STXYSystemCarbonAnalyse.vue';
import STXYCarbonAnalyse from '@/components/module/STXYCarbonAnalyse.vue';
import STXYArchitecCarbon from '@/components/module/STXYArchitecCarbon.vue';
import STXYCarbonForecast from '@/components/module/STXYCarbonForecast.vue';

import { drag } from '@/utils/drag.js';
import { zoom } from '@/utils/Zoom.js';
import { View, Delete, Search, Hide } from '@element-plus/icons-vue'
import data from '../data.json';

defineOptions({
  directives: {
    drag,
    zoom
  }
});

const iframeRef = ref(null);
onMounted(() => {
    window.addEventListener('message', handleMessage, false);
    window.addEventListener('click', pointClick, { capture: true });
})

onUnmounted(() => {
  window.removeEventListener('click', pointClick, { capture: true });
});

const handleMessage = (event) => {
    // 检查消息类型
    if (event?.data.type === 'input') {
    console.log('Unity:111111111111', event?.data.data);
    // 在此处理按钮名称
    }
}

const pointClick = (event) => {
    console.log(event, '我点击了模板数据')
    if(event && event?.path.length > 0){
        iframeRef.value.contentWindow.sendUnityEvent("GameManager","SendMessageToFrontend",'1')
    }
}


const state = ref(data);

// 根据类型返回对应组件
const getComponent = (type) => {
  const componentMap = {
    'module1': Module1,
    'module2': Module2,
    'moduleText': ModuleText,
    'moduleImg': ModuleImg,
    'moduleVideo': ModuleVideo,
    'moduleDeepSeek': ModuleDeepSeek,
    'STXYProjectIntroduce': STXYProjectIntroduce,
    'STXYYearCarbonQuota': STXYYearCarbonQuota,
    'STXYSystemCarbonAnalyse': STXYSystemCarbonAnalyse,
    'STXYCarbonAnalyse': STXYCarbonAnalyse,
    'STXYArchitecCarbon': STXYArchitecCarbon,
    'STXYCarbonForecast': STXYCarbonForecast,
    // 添加更多类型映射
  };
  return componentMap[type];
};

// 宽高边框
const borderShow = ref(false);
// 边框样式
const borderStyle = computed(() => {
    let style = {};
    state.value.blocks.forEach(item => {
        if(item.activeShow && item.key !== 'moduleDeepSeek'){
            style = {
                width: item.width + 'px',
                height: item.height + 'px',
                left: item.left + 'px',
                top: item.top + 'px',
                // zIndex: item.zIndex
            }
        }
    });
    return style;
});

// 拖拽组件
// 是否需要显示拖拽组件
const dragShow = computed(() => state.value.blocks.some(item => item.dragShow))
const dragStyle = computed(() => {
    let style = {};
    state.value.blocks.forEach(item => {
        if(item.dragShow && item.key !== 'moduleDeepSeek'){
            style = {
                width: item.width + 'px',
                height: item.height + 'px',
                left: item.left + 'px',
                top:  item.top + 'px',
            }
        }
    });
    return style;
})

// 编辑操作
const drawer = ref(false);
const editBtn = () => {
    // 给unity 发送数据
    // iframeRef.value.contentWindow.sendUnityEvent("Canvas","SetText",'我是web传入的值')
    drawer.value = true;
    borderShow.value = true; // 打开编辑框，显示模块可编辑边框
}


const AIVisible = ref(false);
const openDeepSeek = () => {
    AIVisible.value = true;
}
</script>

<style lang="scss" scoped>
.unity-box{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}
.home{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    // background: url('@/assets/home/zhny-bag.png');
    background: url('@/assets/home/LZY-bag.png');
    // background-size: cover;
    // background-position: center;
    // background-repeat: no-repeat;
    .border-item{
        position: fixed;
        border: 1px solid red;
        z-index: 99;
        -webkit-backdrop-filter: brightness(100%) !important;
        backdrop-filter: brightness(100%) !important;
    }
    .grid-list{
        position: fixed;
        display: flex;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        pointer-events: none;
        z-index: 99;
        .ConfigCenter-Grid{
            width: calc(100% / 24);
            height: calc(100% / 24);
            box-sizing: border-box;
            border-right: 1px dashed #9999995e;
            border-bottom: 1px dashed #9999995e;
        }
    }
    .drag-box{
        position: fixed;
        position: relative;
        z-index: 99;
        .piont-drag{
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 99;
            .piont-drag-icon{
                cursor: pointer;
                color: #ea2424;
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome;
                font-size: inherit;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                &::before{
                    content: "\f047";
                }
            }
        }
        .drag-rb{
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 9;
            height: 10px;
            width: 10px;
            i{
                position: absolute;
                top: 0;
                left: 0;
                height: 10px;
                width: 10px;
                background-color: #FF5722;
                cursor: nw-resize;
                -webkit-clip-path: polygon(0 100%, 100% 0, 100% 100%);
            }
        }
    }
}
.setting-box{
    position: absolute;
    top: 33px;
    right: 90px;
    width: 18px;
    height: 18px;
    background: url('@/assets/home/setting.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
}
.exit-box{
    position: absolute;
    top: 33px;
    right: 48px;
    width: 18px;
    height: 18px;
    background: url('@/assets/home/exit.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
}
.home :deep(.AI-header){
    text-align: center !important;
}
.home :deep(.AI-header .el-dialog__title){
    color: #fff;
}
</style>

<style scoped>
.home :deep(.el-drawer){
    overflow: visible !important;
}
.home :deep(.el-drawer__header) {
    margin-bottom: 0px;
}
:deep(.el-dialog) {
    background: rgba(2, 37, 41, .6);
}
</style>