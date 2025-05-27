<template>
    <div class="echart-box" v-show="props.block.lookShow" :style="moduleTwoStyle">
        <div class="echart-tit">
            <span class="tit-text">{{props.block.title}}</span>
        </div>
        <div class="echart-info">
            <div class="info-item">
                <div class="item">
                    <div class="item-img"></div>
                    <div class="item-cont">
                        <span class="item-label">品种</span>
                        <span class="item-text">南瓜</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-img"></div>
                    <div class="item-cont">
                        <span class="item-label">常温/亩</span>
                        <span class="item-text">37.4</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-img"></div>
                    <div class="item-cont">
                        <span class="item-label">冷棚/亩</span>
                        <span class="item-text">240.5</span>
                    </div>
                </div>
            </div>
            <div class="info-content">
                <div class="info-cnt-l">
                    <div class="cnt-l-tit"></div>
                    <div class="city-echart-box">
                        <!-- 百合花图谱 -->
                        <!-- <Atlas /> -->
                        <!-- 南平城市图 -->
                        <!-- <City /> -->
                        <!-- 折线图 -->
                        <BrokenLine :block="props.block" />
                    </div>
                </div>
                <div class="info-cnt-r">
                    <div class="cnt-r-tit"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';

import Atlas from '@/components/echarts/Atlas.vue';
import City from '@/components/echarts/City.vue';
import BrokenLine from '@/components/echarts/BrokenLine.vue';

const props = defineProps({
    block: {
        type: Object,
        default: () => {}
    }
})

const moduleTwoStyle = computed(() => {
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
.echart-box{
    position: fixed;
    padding: 0 28px 0 25px;
    background: url('@/assets/home/left-b.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .echart-tit{
        width: 100%;
        height: 11.1111%;
        display: flex;
        align-items: center;
        .tit-text{
            margin-left: 25px;
            color: #1DD2BA;
            font-size: 16px;
        }
    }
    .echart-info{
        width: 100%;
        height: 88.9999%;
        display: flex;
        justify-content: space-between;
        .info-item{
            width: 17%;
            height: 100%;
            padding: 22px 0;
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            .item{
                width: 100%;
                height: 6vmin;
                display: flex;
                // background: red;
                .item-img{
                    width: 6vmin;
                    height: 6vmin;
                    background: url('@/assets/home/item-bag.png') no-repeat;
                    background-size: 100% 100%;
                }
                .item-cont{
                    height: 100%;
                    margin-left: 21px;
                    display: flex;
                    flex-wrap: wrap;
                    align-content: space-between;
                    .item-label{
                        width: 100%;
                        font-family: Adobe Heiti Std;
                        font-size: 1.49vmin;
                        color: #5EE3C6;
                    }
                    .item-text{
                        font-family: Adobe Heiti Std;
                        font-size: 2.59vmin;
                        color: #B4EBFF;
                    }
                }
            }
        }
        .info-content{
            width: 83%;
            height: 100%;
            padding-top: 22px;
            display: flex;
            .info-cnt-l{
                width: calc(50% - 16px);
                height: 100%;
                margin-right: 16px;
                .cnt-l-tit{
                    width: 100%;
                    height: 22px;
                    background: url('@/assets/home/echart-cnt-l.png') no-repeat;
                    background-position: 100% 100%;
                }
                .city-echart-box{
                    width: 100%;
                    height: calc(100% - 22px);
                    .nanping{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .info-cnt-r{
                width: calc(50% - 16px);
                height: 100%;
                margin-left: 16px;
                .cnt-r-tit{
                    width: 100%;
                    height: 22px;
                    background: url('@/assets/home/echart-cnt-l.png') no-repeat;
                    background-position: 100% 100%;
                }
                
            }
        }
    }
}
</style>