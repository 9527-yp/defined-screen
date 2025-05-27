<template>
    <div class="new-add">
        <div class="detail-box">
            <div class="box-hd">
                <el-icon class="back-icon" @click="handelNew(3)"><ArrowLeftBold /></el-icon>
                实例一：智慧农业-棚内温度
            </div>
            <div class="box-cnt">
                <img src="" alt="">
            </div>
        </div>
        <div class="echart-form">
            <div class="item">
                <div class="item-label">实例名称：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <!-- X轴 -->
            <div class="item">
                <div class="item-label">X轴名称：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <div class="item">
                <div class="item-label">X轴数据：</div>
                <div class="item-select">
                    <el-select
                        v-model="value"
                        placeholder=""
                        style="100%"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="item-label">X轴最小刻度值：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <div class="item">
                <div class="item-label">X轴刻度间隔数量：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <!-- Y轴 -->
            <div class="item">
                <div class="item-label">Y轴名称：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <div class="item">
                <div class="item-label">Y轴数据：</div>
                <div class="item-select">
                    <el-select
                        v-model="value"
                        placeholder=""
                        style="100%"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="item-label">Y轴最小刻度值：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <div class="item last-item">
                <div class="item-label">Y轴刻度间隔数量：</div>
                <div class="item-input">
                    <el-input v-model="input" style="100%" placeholder="" />
                </div>
            </div>
            <div class="save">保存</div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { ref } from 'vue';

const input = ref(undefined);
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const emits = defineEmits(['handelNew'])
const handelNew = (val) => {
    emits('handelNew', val)
}
</script>

<style lang="scss" scoped>
.new-add{
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
    .echart-form{
        margin-top: 30px;
        .item{
            width: 100%;
            height: 25px;
            margin-bottom: 12px;
            display: flex;
            .item-label{
                height: 100%;
                line-height: 25px;
                font-family: Source Han Sans CN;
                font-size: 16px;
                color: #000000;
                flex-shrink:0;
            }
            .item-input{
                flex-grow:1;
                height: 100%;
            }
            .item-select{
                flex-grow:1;
                height: 100%;
            }
        }
        .last-item{
            margin-bottom: 30px;
        }
        .save{
            width: 73px;
            height: 32px;
            font-size: 16px;
            color: #FFFFFF;
            line-height: 32px;
            text-align: center;
            background: #409EFF;
            border-radius: 4px;
            margin: 0 auto;
            cursor: pointer;
        }
    }
}
</style>

<style scoped>
.item-input :deep(.el-input__wrapper) {
    height: 25px;
    border-radius: 4px;
}
.item-select :deep(.el-select__wrapper) {
    height: 25px;
    min-height: 25px;
}
</style>