<template>
    <el-drawer
        v-model="drawer"
        title="编辑"
        :modal="false"
        :size="450"
        modal-class="low-code-drawer-shade"
        class="low-code-drawer"
        :before-close="handleClose"
    >
        <div>
            <div class="drawer-header-box">
                <!-- tab栏 -->
                <div class="drawer-header-tit">
                    <el-tabs v-model="activeName" class="demo-tabs">
                        <el-tab-pane label="业务列表" name="1"></el-tab-pane>
                        <el-tab-pane label="模板列表" name="2"></el-tab-pane>
                    </el-tabs>
                </div>
                <!-- 业务列表 -->
                <div v-show="activeName === '1'">
                    <!-- 图层模块 -->
                    <div class="drawer-header-layer">
                        <div class="layer-tit">
                            <span class="tit">图层模块</span>
                            <img src="@/assets/drawer/add-icon.png" class="add-icon" alt="" @click="addLayer">
                        </div>
                        <div class="drawer-header-cnt">
                            <div
                                class="cnt-item"
                                :class="item.activeShow ? 'cnt-item-active' : ''"
                                v-for="item in state.blocks"
                                :key="item.id"
                                @click="layerClick(item)"
                            >
                                <div class="item-left">
                                    <el-icon v-show="item.lookShow" class="item-eye" @click.stop="handelLookShow(item)"><View /></el-icon>
                                    <el-icon v-show="!item.lookShow" class="item-eye" @click.stop="handelLookShow(item)"><Hide /></el-icon>
                                    <span v-show="!item.editShow" @click="handelEdit(item)">{{ item.title }}</span>
                                    <el-input @blur="titleInputBlur(item)" v-show="item.editShow" v-model="item.title" style="width: 240px" placeholder="请输入" />
                                </div>
                                <div class="item-right">
                                    <el-icon class="item-look" v-show="!item.dragShow" @click.stop="handelDragShow(item)"><Lock /></el-icon>
                                    <el-icon class="item-look" v-show="item.dragShow" @click.stop="handelDragShow(item)"><Unlock /></el-icon>
                                    <el-icon class="item-del" @click.stop="delBlock(item)"><Delete /></el-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 组件绑定 -->
                    <div class="layer-modules-box">
                        <div class="layer-tit">
                            <span class="tit">组件绑定</span>
                            <img src="@/assets/drawer/selete-icon.png" class="selete-icon" alt="">
                        </div>
                        <div class="modules-cnt">
                            <div class="module-item" @click="modulesShow = !modulesShow">{{moduleTitle ? moduleTitle : '请选择组件绑定'}}</div>
                        </div>
                    </div>
                    <!-- 位置尺寸 -->
                    <div class="pos-box" v-show="isDeepSeek">
                        <div class="layer-tit">
                            <span class="tit">位置尺寸</span>
                            <img src="@/assets/drawer/selete-icon.png" class="selete-icon" alt="">
                        </div>
                        <div class="pos-cnt">
                            <el-row>
                                <el-col class="pos-col" :span="8">
                                    <span>X：</span>
                                    <!-- <el-input v-model="input" style="width: 90px" placeholder="请输入" /> -->
                                    <el-input-number
                                        v-model="styleForm.left"
                                        style="width: 90px"
                                        :min="0"
                                        :max="1920"
                                        @change="(val) => handleChange('left', val)"
                                        controls-position="right"
                                    />
                                </el-col>
                                <el-col class="pos-col" :span="8">
                                    <span>Y：</span>
                                    <el-input-number
                                        v-model="styleForm.top"
                                        style="width: 90px"
                                        :min="0"
                                        :max="1920"
                                        @change="(val) => handleChange('top', val)"
                                        controls-position="right"
                                    />
                                </el-col>
                                <el-col class="pos-col" :span="8">
                                    <span>Z：</span>
                                    <el-input-number
                                        v-model="styleForm.zIndex"
                                        style="width: 90px"
                                        :min="-100"
                                        :max="80"
                                        @change="(val) => handleChange('zIndex', val)"
                                        controls-position="right"
                                    />
                                </el-col>
                            </el-row>
                            <el-row class="pos-row">
                                <el-col class="pos-col" :span="12">
                                    <span>宽度：</span>
                                    <el-input-number
                                        v-model="styleForm.width"
                                        style="width: 130px"
                                        :min="0"
                                        :max="1920"
                                        @change="(val) => handleChange('width', val)"
                                        controls-position="right"
                                    />
                                </el-col>
                                <el-col class="pos-col" :span="12">
                                    <span>高度：</span>
                                    <el-input-number
                                        v-model="styleForm.height"
                                        style="width: 130px"
                                        :min="0"
                                        :max="1920"
                                        @change="(val) => handleChange('height', val)"
                                        controls-position="right"
                                    />
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- 内容编辑 -->
                    <div class="layer-modules-box" v-if="cntEditBox">
                        <div class="layer-tit">
                            <span class="tit">内容编辑</span>
                            <img src="@/assets/drawer/selete-icon.png" class="selete-icon" alt="">
                        </div>
                        <div class="modules-cnt">
                            <div class="module-item" v-if="textBox" @click="openTextDialog">富文本编辑器</div>
                            <!-- <div class="module-item" v-if="imgBox" @click="openTextDialog">上传图片</div> -->
                        </div>
                    </div>
                </div>
                <!-- 模板列表 -->
                <div v-show="activeName === '2'" class="module-list-box">
                    <!-- 列表 -->
                    <div class="module-list" v-if="moduleIndex === 1">
                        <div class="item" v-for="item in 10" :key="item">
                            <div class="item-header">折线图</div>
                            <div class="item-content">
                                <div class="item-img">
                                    <img src="" alt="">
                                </div>
                                <div class="item-cnt-label">
                                    <div class="to-edit" @click="handelNew(2)">前往编辑</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 模板实例 -->
                    <div class="module-list module-new" v-if="moduleIndex === 2">
                        <div class="item-header">
                            <el-icon class="back-icon" @click="handelNew(1)"><ArrowLeftBold /></el-icon>
                            折线图
                        </div>
                        <div class="item" v-for="item in 10" :key="item">
                            <div class="item-content">
                                <div class="item-img">
                                    <img src="" alt="">
                                </div>
                                <div class="item-cnt-label">
                                    <div class="to-edit" @click="handelNew(3)">业务实例</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 实例详情 -->
                    <div class="new-detail" v-if="moduleIndex === 3">
                        <div class="detail-box">
                            <div class="box-hd">
                                <el-icon class="back-icon" @click="handelNew(2)"><ArrowLeftBold /></el-icon>
                                实例一：智慧农业-棚内温度
                            </div>
                            <div class="box-cnt">
                                <img src="" alt="">
                            </div>
                        </div>
                        <div class="new-list">
                            <div class="list-hd">
                                <span class="list-hd-tit">组件绑定</span>
                                <img class="add-icon" @click="addNew" src="@/assets/drawer/add-icon.png" alt="">
                            </div>
                            <div class="list-cnt">
                                <div class="item">
                                    <div class="item-tit">实例一：智慧农业-棚内温度</div>
                                    <div class="item-operate">
                                        <span class="edit">编辑</span>
                                        <span class="del">删除</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 新增编辑 -->
                    <AddNew v-if="moduleIndex === 4" @handelNew="handelNew" />
                </div>
            </div>
        </div>
        <Teleport to=".low-code-drawer">
            <!-- <transition name="modules"> -->
                <div class="modules-ul-box" v-show="modulesShow">
                    <div class="modules-search">
                        <el-input v-model="moduleInput" style="width: 100%" :suffix-icon="Search" placeholder="请输入" />
                    </div>
                    <div class="modules-ul">
                        <div class="modules-item" @click="moduleChange(item)" v-for="item in modulesArr" :key="item.key">
                            <div class="item-tit">{{item.title}}</div>
                            <div class="item-img" v-if="item.imgUrl">
                                <img :src="item.imgUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </transition> -->
        </Teleport>
    </el-drawer>
    <!-- 富文本编辑弹框 -->
    <el-dialog
        v-model="textVisible"
        title="富文本编辑"
        width="500"
    >
        <div v-if="visibleType === 'text'">
            <el-input
                v-model="textValue"
                style="width: 100%"
                :autosize="{ minRows: 4, maxRows: 8 }"
                type="textarea"
                placeholder="请输入"
            />
        </div>
        <div v-if="visibleType === 'img'">
            <el-upload
                v-model:file-list="fileImgList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>
        </div>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="textVisible = false">关闭</el-button>
            <el-button type="primary" @click="verify">
            确认
            </el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { View, Delete, Search, Hide, Lock, Unlock, ArrowLeftBold, Plus } from '@element-plus/icons-vue';
import AddNew from './components/AddNew.vue';
import { modulesArr } from '@/modules.js';
import { useState } from './useState.js';

const borderShow = defineModel('borderShow', {
    type: Boolean,
    default: false
})

const state = defineModel('state', {
    type: Object,
    default: () => {}
})

let blockItem = ref(state.value.blocks.find(item => item.activeShow))

const drawer = defineModel('drawer', {
    type: Boolean,
    default: false
})

const activeName = ref('1');

// 组件绑定二级弹框
const modulesShow = ref(false);
const moduleInput = ref(undefined);


const { styleForm, cntEditBox,textBox, imgBox, isDeepSeek, moduleTitle } = useState(state);

// 关闭操作弹框
const handleClose = () => {
    drawer.value = false;
    borderShow.value = false;
}

const addLayer = () => {
    state.value.blocks.push({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 1,
        title: "新增模块" + (state.value.blocks.length + 1),
        editShow: false, // 是否题目编辑状态
        activeShow: false, // 是否选中
        dragShow: false, // 是否可拖拽
        lookShow: true, // 模块是否可见
        // props: {
        //     textValue: '', // 富文本模块字段
        // },
        props: null,
        id: new Date().getTime(),
        key: ""
    })
}

// 点击图层
const layerClick = (item) => {
    // 先清除所有选中，再赋值选中的项
    clearActiveShow('activeShow');
    item.activeShow = true;
    blockItem.value = item;
}

// 切换拖拽组件
const handelDragShow = (item) => {
    if(item.dragShow){
        item.dragShow = !item.dragShow;
    }else{
        clearActiveShow('dragShow');
        item.dragShow = true;
    }
}

const handelLookShow = (item) => {
    item.lookShow = !item.lookShow
}


// 清除所有选中
const clearActiveShow = (value) => {
    state.value.blocks.forEach(item => item[value] = false);
}

// 删除某个图层模块
const delBlock = (block) => {
    const index = state.value.blocks.findIndex(item => item.id === block.id);
    if (index !== -1) {
        state.value.blocks.splice(index, 1);
    }
}

// 改变尺寸
const handleChange = (label, val) => {
    state.value.blocks.forEach(item => {
        if(item.activeShow === true){
            item[label] = val;
        }
    });
}

const handelEdit = (item) => {
    clearActiveShow('editShow');
    item.editShow = true;
}

const titleInputBlur = (item) => {
    item.editShow = !item.editShow
    // 与服务器同步数据信息
}

// 组件绑定
const moduleChange = (item) => {
    let block = state.value.blocks.find(item => item.activeShow);
    const index = state.value.blocks.findIndex(item => item.activeShow);
    block = {
        ...block,
        key: item.key,
        width: item.width,
        height: item.height,
        moduleTitle: item.title
    }
    state.value.blocks.splice(index, 1, block);
    // 关闭组件绑定弹框
    modulesShow.value = false;
}


// 富文本编辑
const textVisible = ref(false);
let visibleType = null;
const textValue = ref(undefined);

// 上传图片
const fileImgList = ref([]);
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  
}

const openTextDialog = () => {
    textVisible.value = true;
    let block = state.value.blocks.find(item => item.activeShow);
    if(block.key === 'moduleText'){
        visibleType = 'text'
    }else if(block.key === 'moduleImg') {
        visibleType = 'img'
    }else if(block.key === 'moduleVideo') {
        visibleType = 'video'
    }
    textValue.value = block?.props?.textValue
}
const verify = () => {
    state.value.blocks.forEach(item => {
        if(item.activeShow){
            if(visibleType === 'text'){
                item.props.textValue = textValue.value;
            }else if(visibleType === 'img') {
                
            }else if(visibleType === 'video') {
                
            }
        }
    });
    textVisible.value = false;
}

// 模板列表
const moduleIndex = ref(1);

const handelNew = (index) => {
    moduleIndex.value = index;
}

const addNew = () => {
    moduleIndex.value = 4;
}
</script>


<style lang="scss" scoped>
/** 盒子样式 */
.drawer-header-box{
    .drawer-header-tit{
        width: 100%;
    }
    // 图层模块
    .drawer-header-layer{
        margin-bottom: 24px;
        .layer-tit{
            width: 100%;
            height: 33px;
            display: flex;
            padding: 0 21px 0 12px;
            align-items: center;
            justify-content: space-between;
            background: #CCCCCC;
            .tit{
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
            }
            .add-icon{
                width: 12px;
                height: 12px;
                cursor: pointer;
            }
        }
        .drawer-header-cnt{
            width: 100%;
            height: 180px;
            background: rgba(42, 130, 228, .15);
            overflow-y: auto;
            &::-webkit-scrollbar-corner{
                width: 0;
            }
            &::-webkit-scrollbar{
                width: 5px;
                background: transparent;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                height:5px;
                background-color: #d8d5d5;
            }
            .cnt-item{
                width: 100%;
                height: 36px;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                &:hover{
                    background: #bdd5f0;
                }
                .item-left{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .item-eye{
                        margin-right: 10px;
                        margin-top: 3px;
                        cursor: pointer;
                    }
                }
                .item-right{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .item-look{
                        cursor: pointer;
                        margin-right: 5px;
                    }
                    .item-del{
                        cursor: pointer;
                        &:hover{
                            color: red;
                        }
                    }
                }
            }
            .cnt-item-active{
                background: #bdd5f0;
            }
        }
    }
    .layer-modules-box{
        width: 100%;
        .layer-tit{
            width: 100%;
            height: 33px;
            display: flex;
            padding: 0 19px 0 12px;
            align-items: center;
            justify-content: space-between;
            background: #CCCCCC;
            .tit{
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
            }
            .selete-icon{
                width: 14px;
                height: 9px;
                cursor: pointer;
            }
        }
        .modules-cnt{
            width: 100%;
            padding: 16px 15px 0;
            background: #FFFFFF;
            box-shadow: 2px 3px 6px 0px rgba(0,0,0,0.3);
            border: 1px solid #CCCCCC;
            margin-bottom: 24px;
            .module-item{
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-family: Source Han Sans CN;
                font-weight: 400;
                font-size: 16px;
                color: #000000;
                background: rgba(229, 240, 252, .5);
                margin-bottom: 10px;
                cursor: pointer;
            }
        }
    }
    // 位置尺寸
    .pos-box{
        width: 100%;
        margin-bottom: 24px;
        .layer-tit{
            width: 100%;
            height: 33px;
            display: flex;
            padding: 0 19px 0 12px;
            align-items: center;
            justify-content: space-between;
            background: #CCCCCC;
            .tit{
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
            }
            .selete-icon{
                width: 14px;
                height: 9px;
                cursor: pointer;
            }
        }
        .pos-cnt{
            width: 100%;
            padding: 13px 15px 13px 11px;
            background: #FFFFFF;
            box-shadow: 2px 3px 6px 0px rgba(0,0,0,0.3);
            border: 1px solid #CCCCCC;
            .pos-col{
                display: flex;
                height: 25px;
                align-items: center;
            }
            .pos-row{
                margin-top: 12px;
            }
        }
    }
}
/** 组件绑定样式 */
.low-code-drawer{
    position: relative;
    .modules-ul-box{
        position: absolute;
        top: 0;
        bottom: 0;
        left: -360px;
        background: #fff;
        border-right: 1px solid #000;
        width: 360px;
        padding: 24px;
        z-index: 1;
        .modules-search{
            width: 100%;
            height: 38px;
            margin-bottom: 24px;
        }
        .modules-ul{
            width: 322px;
            height: calc(100% - 62px);
            overflow-y: auto;
            &::-webkit-scrollbar-corner{
                width: 0;
            }
            &::-webkit-scrollbar{
                width: 5px;
                background: transparent;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 3px;
                height:5px;
                background-color: #ccc;
            }
            .modules-item{
                width: 312px;
                height: 180px;
                background: rgba(13, 44, 65, 1);
                margin-bottom: 12px;
                padding: 8px 7px;
                .item-tit{
                    font-family: Source Han Sans CN;
                    font-size: 14px;
                    color: #fff;
                }
                .item-img{
                    width: 100%;
                    height: 145px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
/** 模板列表 */
.module-list-box{
    width: 100%;
    height: 100%;
    .module-list{
        width: calc(100% + 10px);
        height: calc(100vh - 140px);
        overflow-y: auto;
        .item{
            width: calc(100% - 10px);
            margin-bottom: 23px;
            .item-header{
                width: 100%;
                height: 33px;
                padding-left: 11px;
                line-height: 33px;
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
                background: rgba(204, 204, 204, .5);
            }
            .item-content{
                width: 100%;
                height: 180px;
                border: 1px solid rgba(96, 96, 96, .15);
                border-top: 0;
                padding: 10px 12px;
                display: flex;
                .item-img{
                    width: 310px;
                    height: 100%;
                    flex-shrink: 0; /* 防止缩小 */
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .item-cnt-label{
                    flex-grow: 1; /* 撑满剩余空间 */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    .to-edit{
                        width: 30px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .module-new{
        .item{
            margin-bottom: 12px;
            .item-content{
                border-top: 1px solid rgba(96, 96, 96, .15);
            }
        }
        .item-header{
            width: calc(100% - 10px);
            height: 33px;
            padding-left: 11px;
            display: flex;
            align-items: center;
            font-family: Source Han Sans CN;
            font-size: 16px;
            color: #000000;
            background: rgba(204, 204, 204, .5);
            .back-icon{
                cursor: pointer;
                font-size: 20px;
            }
        }
        
    }
    .new-detail{
        .detail-box{
            width: 100%;
            margin-bottom: 23px;
            .box-hd{
                width: 100%;
                height: 33px;
                padding-left: 11px;
                display: flex;
                align-items: center;
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
                background: rgba(204, 204, 204, .5);
                .back-icon{
                    cursor: pointer;
                    font-size: 20px;
                }
            }
            .box-cnt{
                width: 100%;
                height: 181px;
                background: #FFFFFF;
                border: 1px solid rgba(96, 96, 96, .15);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .new-list{
            .list-hd{
                width: 100%;
                height: 33px;
                padding: 11px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(204, 204, 204, .5);
                .list-hd-tit{
                    font-family: Source Han Sans CN;
                    font-size: 16px;
                    color: #000000;
                }
                .add-icon{
                    width: 12px;
                    height: 12px;
                    cursor: pointer;
                }
            }
            .list-cnt{
                width: 100%;
                padding: 15px 10px 0;
                box-shadow: 2px 3px 6px 0px rgba(0,0,0,0.3);
                border: 1px solid #CCCCCC;
                .item{
                    width: 100%;
                    height: 30px;
                    padding-left: 18px;
                    padding-right: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: rgba(229, 240, 252, .5);
                    margin-bottom: 15px;
                    .item-tit{
                        font-family: Source Han Sans CN;
                        font-size: 16px;
                        color: #000000;
                    }
                    .item-operate{
                        height: 100%;
                        line-height: 30px;
                        font-family: Source Han Sans CN;
                        font-size: 16px;
                        .edit{
                            color: #1296DB;
                            cursor: pointer;
                        }
                        .del{
                            margin-left: 12px;
                            color: #FF0000;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>

<style scoped>
.pos-col :deep(.el-input__wrapper) {
    height: 25px;
    border-radius: 4px;
}
.pos-col :deep(.el-input-number__increase) {
    height: 12.5px !important;
    line-height: 12.5px !important;
}
.pos-col :deep(.el-input-number__decrease) {
    height: 12.5px !important;
    line-height: 12.5px !important;
}
.home :deep(.el-drawer){
    overflow: visible !important;
}
.modules-search  :deep(.el-input__wrapper) {
    height: 38px;
    border-radius: 8px;
}
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
        z-index: -1;
    }
    to {
        transform: translateX(0%);
        opacity: 1;
        z-index: 1;
    }
}
 
@keyframes slideOut {
    from {
        transform: translateX(0%);
        opacity: 1;
        z-index: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
        z-index: -1;
    }
}
 
.modules-enter-active {
  animation: slideIn 0.5s ease-out forwards;
}
 
.modules-leave-active {
  animation: slideOut 0.5s ease-out forwards;
}
:deep(.el-input__inner:focus) {
    outline: none;
}
</style>