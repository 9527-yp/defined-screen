<template>
    <div class="form-page">
        <!-- 表格数据 -->
        <div class="content" v-if="cntIndex === 1">
            <div>
                <el-button type="primary" plain>添加</el-button>
                <el-button type="primary" plain>修改</el-button>
                <el-button type="danger" plain>删除</el-button>
                <el-button type="primary" plain @click="settingForm">设置</el-button>
            </div>
            <div class="table-row">
                <el-table :data="tableData" border :header-cell-style="{'text-align': 'center','background': '#ccc'}" style="width: 100%">
                    <el-table-column 
                        v-for="(item, index) in columnArr"
                        :key="item.key"
                        :prop="item.key"
                        :label="item.name"
                        :width="index !== columnArr.length-1 ? '200' : ''"
                        align="center"
                    />
                </el-table>
            </div>
        </div>
        <!-- 设置表头 -->
        <div class="setting" v-if="cntIndex === 2">
            <div class="header-top">
                <div class="steps">
                    <template v-for="(item, index) in stepsList" :key="index">
                        <div class="steps-item" :class="stepsIndex >= index ? 'steps-item-active' : ''" @click="handelSteps(index)">
                            <div v-show="index >= stepsIndex" class="steps-item-icon">{{index+1}}</div>
                            <div v-show="index < stepsIndex" class="steps-item-icon-Completed"></div>
                            <div class="steps-item-title">{{item}}</div>
                        </div>
                        <div class="steps-line" v-if="index !== stepsList.length-1"></div>
                    </template>
                </div>
                <div class="CustomHeader-toolbar">
                    <el-button plain size="small">导出</el-button>
                    <el-button plain size="small">导入</el-button>
                    <el-button type="primary" size="small">保存</el-button>
                    <el-icon class="close-icon"><Close /></el-icon>
                </div>
            </div>
            <div class="content">
                <div class="content-left">
                    <div class="cnt-l-c">
                        <div class="cnt-l-info">
                            <div class="module-info">
                                <div>自定义列</div>
                                <div class="column-box">
                                    <div 
                                      class="column-item"
                                      :class="item.type === 'col' ? 'column-col' : 'column-row'"
                                      v-for="item in formModuleList"
                                      :key="item.title"
                                      @click="formModuleItem(item)"
                                    >
                                        <i class="fa-icon"></i>
                                        {{item.title}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-center">
                    <div class="c-header">
                        <div class="nav nav-active">页面设计</div>
                        <div class="nav">页面设置</div>
                    </div>
                    <div class="form-box">
                        <div class="form-item" :class="item.id === formActive ? 'item-active' : ''" v-for="item in formList" :key="item.id" @click="formClick(item)">
                            <div class="label-text">
                                <i class="collect-icon" v-show="starIndex === item.id"></i>
                                {{ item.title }}
                                </div>
                            <div class="input-box">
                                <div class="input">请输入</div>
                            </div>
                            <i class="star-icon" v-show="item.id === formActive" @click.stop="handelStar(item)"></i>
                            <i class="del-icon" v-show="item.id === formActive"></i>
                        </div>
                    </div>
                </div>
                <div class="content-right">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const cntIndex = ref(2);
const tableData = [
  {
    htmc: '2016-05-03',
    htbh: 'Tom',
    htlx: 'No. 189, Grove St, Los Angeles',
  },
  {
    htmc: '2016-05-02',
    htbh: 'Tom',
    htlx: 'No. 189, Grove St, Los Angeles',
  },
  {
    htmc: '2016-05-04',
    htbh: 'Tom',
    htlx: 'No. 189, Grove St, Los Angeles',
  },
  {
    htmc: '2016-05-01',
    htbh: 'Tom',
    htlx: 'No. 189, Grove St, Los Angeles',
  },
]

const columnArr = ref([
    {
        name: '合同名称',
        key: 'htmc'
    },
    {
        name: '合同编号',
        key: 'htbh'
    },
    {
        name: '合同类型',
        key: 'htlx'
    },
])

const settingForm = () => {
    cntIndex.value = 2;
}

// 头部数据操作
const stepsList = ['配置字段/表单设计', '表格设计', '版本设计', '权限设置', '流程设置', '打印模板设置'];
const stepsIndex = ref(0);
const handelSteps = (index) => {
    stepsIndex.value = index;
}

// 内容左侧数据操作
const formModuleList = [
    {
        title: '文本',
        type: 'col',
        key: 'inputText'
    },
    {
        title: '数字',
        type: 'col',
        key: 'inputNumber'
    },
    {
        title: '金额',
        type: 'col',
        key: 'inputCNY'
    },
    {
        title: '日期',
        type: 'col',
        key: 'date'
    },
    {
        title: '日期时间',
        type: 'col',
        key: 'datetime'
    },
    {
        title: '下拉框',
        type: 'col',
        key: 'selete'
    },
]
const formModuleItem = (item) => {
    let form = {
        title: item.title,
        key: item.key,
        id: new Date().getTime(),
    }
    formList.value.push(form);
}

// 内容中间数据操作
const formList = ref([]);
const formActive = ref(-1);
const starIndex = ref(-1);

const formClick = (item) => {
    formActive.value = item.id;
}

const handelStar = (item) => {
    starIndex.value = item.id
}

</script>


<style lang="scss" scoped>
.form-page{
    width: 100%;
    height: 100%;
    background: #fff;
    .content{
        padding: 15px;
        height: calc(100% - 68px);
    }
    .table-row{
        width: 100%;
        margin-top: 15px;
    }
    .setting{
        width: 100%;
        height: 100%;
        position: relative;
        .header-top{
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: center;
            position: relative;
            .steps{
                height: 35px;
                display: flex;
                align-items: center;
                .steps-item{
                    cursor: pointer;
                    .steps-item-icon{
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        color: #ccc;
                        background: #fff;
                        vertical-align: middle;
                        text-align: center;
                        line-height: 23px;
                        border-radius: 20px;
                        border: 1px solid #dcdcdc;
                    }
                    .steps-item-title{
                        display: inline-block;
                        height: 35px;
                        font-size: 14px;
                        vertical-align: middle;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: #030303;
                        line-height: 35px;
                        margin-left: 6px;
                    }
                }
                .steps-item-active{
                    .steps-item-icon{
                        color: #fff;
                        background: #3d81fa;
                        border: 0;
                    }
                    .steps-item-icon-Completed{
                        display: inline-block;
                        color: #3d81fa;
                        font-size: 24px;
                        position: relative;
                        top: 7px;
                        font-family: 'Simple-Line-Icons';
                        font-style: normal;
                        font-weight: normal;
                        font-variant: normal;
                        text-transform: none;
                        line-height: 1;
                        -webkit-font-smoothing: antialiased;
                        &::before{
                            content: "\e080";
                        }
                    }
                    .steps-item-title{
                        color: #3d81fa;
                    }
                }
                .steps-line{
                    width: 40px;
                    height: 1px;
                    background-color: #dcdcdc;
                    display: inline-block;
                    margin: 10px 5px;
                }
            }
            .CustomHeader-toolbar{
                position: absolute;
                right: 25px;
                display: flex;
                align-items: center;
                .close-icon{
                    font-size: 18px;
                    margin-left: 10px;
                    cursor: pointer;
                    &:hover{
                        color: #3d81fa;
                    }
                }
            }
        }
        .content{
            display: flex;
            width: 100%;
            .content-left{
                width: 275px;
                margin: 0;
                border-right: 1px solid #f0f0f0;
                padding: 0;
                display: flex;
                flex-direction: column;
                .cnt-l-c{
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    .cnt-l-info{
                        overflow-y: auto;
                        overflow-x: hidden;
                        .module-info{
                            padding: 20px;
                            .column-box{
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                .column-item{
                                    border-radius: 2px;
                                    padding: 6px;
                                    display: flex;
                                    flex-wrap: wrap;
                                    margin: 10px 0px;
                                    align-items: center;
                                    margin-bottom: -1px;
                                    border: 1px solid #ddd;
                                    border-color: #e7ecee;
                                    font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
                                    font-size: 14px;
                                    color: #58666e;
                                    cursor: pointer;
                                    .fa-icon{
                                        margin-right: 5px;
                                        width: 1.28571429em;
                                        text-align: center;
                                        display: inline-block;
                                        font: normal normal normal 14px/1 FontAwesome;
                                        font-size: inherit;
                                        text-rendering: auto;
                                        -webkit-font-smoothing: antialiased;
                                        &::before{
                                            content: "\f067";
                                        }
                                    }
                                    &:hover{
                                        background-color: #f5f5f5;
                                    }
                                }
                                .column-col{
                                    width: 47%;
                                }
                                .column-row{
                                    width: 100%
                                }
                            }
                        }
                    }
                }
            }
            .content-center{
                flex: 1;
                padding: 15px;
                .c-header{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    .nav{
                        font-size: 14px;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    .nav-active{
                        color: #3d81fa;
                    }
                }
                .form-box{
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 20px;
                    .form-item{
                        width: 50%;
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                        .label-text{
                            width: 120px;
                            padding: 0 10px;
                            font-size: 14px;
                            text-align: right;
                            user-selete: none;
                            -webkit-user-select: none; /* Safari */
                            -moz-user-select: none; /* Firefox */
                            -ms-user-select: none; /* Internet Explorer 10及更高版本 */
                            .collect-icon{
                                color: #ff9800;
                                display: inline-block;
                                font: normal normal normal 14px/1 FontAwesome;
                                font-size: inherit;
                                text-rendering: auto;
                                -webkit-font-smoothing: antialiased;
                                &::before{
                                    content: "\f005";
                                }
                            }
                        }
                        .input-box{
                            flex: 1;
                            padding-left: 10px;
                            .input{
                                width: 100%;
                                height: 34px;
                                padding: 6px 15px;
                                color: #999;
                                font-size: 14px;
                                border: 1px solid #ccc;
                                border-radius: 2px;
                                background-color: #fff;
                            }
                        }
                    }
                    .item-active{
                        position: relative;
                        z-index: 1;
                        &::before{
                            content: '';
                            position: absolute;
                            top: -3px;
                            left: 0px;
                            box-sizing: border-box;
                            width: calc(100% + 10px);
                            height: calc(100% + 6px);
                            border: 1px solid #2f7be9;
                            // border-right-width: 1px !important;
                            background-color: #e1ecfd;
                            outline: 0;
                            z-index: -1;
                            box-shadow: 0px 3px 6px 0px rgba(47, 123, 233, 0.35);
                        }
                        .star-icon{
                            position: absolute;
                            top: -13px;
                            right: 10px;
                            border-radius: 50%;
                            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                            background-color: white;
                            padding: 3px 4px;
                            z-index: 1;
                            font: normal normal normal 14px/1 FontAwesome;
                            font-size: inherit;
                            text-rendering: auto;
                            -webkit-font-smoothing: antialiased;
                            cursor: pointer;
                            &:hover{
                                color: red;
                            }
                            &::before{
                                content: "\f006";
                            }
                        }
                        .del-icon{
                            position: absolute;
                            top: -13px;
                            right: -20px;
                            border-radius: 50%;
                            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                            background-color: white;
                            padding: 3px 4px;
                            z-index: 1;
                            font: normal normal normal 14px/1 FontAwesome;
                            font-size: inherit;
                            text-rendering: auto;
                            -webkit-font-smoothing: antialiased;
                            cursor: pointer;
                            &:hover{
                                color: red;
                            }
                            &::before{
                                content: "\f014";
                            }
                        }
                    }
                }
            }
            .content-right{
                width: 350px;
            }
        }
    }
}
</style>