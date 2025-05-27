<template>
    <div class="carbon-quota" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div class="pointer-chart">
                <div class="chart">
                    <img class="chart-img" src="@/assets/STXY/pointer-chart.png" alt="">
                    <img class="pointer-img" src="@/assets/STXY/pointer.png" alt="">
                </div>
                <div class="quota-status">优</div>
                <div class="quota-text">系统表现</div>
            </div>
            <div class="quota-right">
                <div>
                    <div class="label-box label-top">
                        <div class="label-text">年度碳排放配额(t):</div>
                        <div class="quota-number">10000</div>
                    </div>
                    <div class="label-box">
                        <div class="label-text">配额内排放(t):</div>
                        <div class="quota-number">750</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    block: {
        type: Object,
        default: () => {}
    }
})


const moduleOneStyle = computed(() => {
    return {
        width: props.block.width + 'px',
        height: props.block.height + 'px',
        left: props.block.left + 'px',
        top: props.block.top + 'px',
        zIndex: props.block.zIndex
    }
})
</script>

<style lang="scss" scoped>
.carbon-quota{
    position: fixed;
    .module-header{
        width: 100%;
        height: 38px;
        line-height: 38px;
        padding-left: 25px;
        position: relative;
        .header-img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        span{
            z-index: 2;
            font-size: 17px;
            font-style: normal;
            text-transform: none;
            color: #fff;
            display: inline-block;
            font-style: italic;
            letter-spacing: 2px;
            text-shadow: 0 0 5px #fff,0 0 5px #fff;	//设置发光效果
        }
    }
    .module-content{
        width: 100%;
        height: calc(100% - 38px);
        background: rgba(13, 44, 65, .6);
        display: flex;
        .pointer-chart{
            width: 50%;
            height: 100%;
            padding-left: 24px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            .chart{
                width: 186px;
                height: 140px;
                position: relative;
                .chart-img{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .pointer-img{
                    width: 40px;
                    height: 10px;
                    position: absolute;
                    bottom: 39px;
                    left: 50%;
                    margin-left: -40px;
                    /* 设置旋转基点为盒子的右边 */
                    transform-origin: calc(100% - 6px) 50%;
                    /* 旋转45度 */
                    transform: rotate(0deg);
                }
            }
            .quota-status{
                width: 186px;
                text-align: center;
                font-size: 16px;
                color: #16FFFE;
                line-height: 30px;
            }
            .quota-text{
                width: 186px;
                text-align: center;
                font-size: 14px;
                color: #fff;
            }
        }
        .quota-right{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            align-items: center;
            .label-box{
                .label-text{
                    font-size: 16px;
                    color: #fff;
                }
                .quota-number{
                    color: rgba(185, 255, 158, 1);
                    font-size: 24px;
                }
            }
            .label-top{
                margin-bottom: 20px;
            }
        }
    }
}
</style>