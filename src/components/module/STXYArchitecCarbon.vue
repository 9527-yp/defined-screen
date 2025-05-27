<template>
    <div class="Architec-carbon" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div class="item">
                <div class="teaching item-img">
                    <img class="teach-icon" src="@/assets/STXY/teach-icon.png" alt="">
                </div>
                <div class="item-content">
                    <div class="item-tit">教学区</div>
                    <div class="item-label">
                        今日碳排放 <span class="label-num">12246</span> kg
                    </div>
                    <div class="item-label">
                        碳排放占比 <span class="label-percent">48.24</span> %
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item-img">
                    <img class="teach-icon" src="@/assets/STXY/life-icon.png" alt="">
                </div>
                <div class="item-content">
                    <div class="item-tit">生活区</div>
                    <div class="item-label">
                        今日碳排放 <span class="label-num">9420</span> kg
                    </div>
                    <div class="item-label">
                        碳排放占比 <span class="label-percent">37.1</span> %
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item-img">
                    <img class="teach-icon" src="@/assets/STXY/other-icon.png" alt="">
                </div>
                <div class="item-content">
                    <div class="item-tit">其他</div>
                    <div class="item-label">
                        今日碳排放 <span class="label-num">3720</span> kg
                    </div>
                    <div class="item-label">
                        碳排放占比 <span class="label-percent">14.66</span> %
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
.Architec-carbon{
    position: fixed;
    top: 264px;
    left: 24px;
    width: 460px;
    height: 584px;
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
        padding: 30px 0 60px 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item{
            width: 100%;
            height: 135px;
            display: flex;
            .item-img{
                width: 113px;
                height: 135px;
                padding-top: 55px;
                display: flex;
                justify-content: center;
                background: url('@/assets/STXY/item-bag.png');
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                .teach-icon{
                    width: 62px;
                    height: 62px;
                }
            }
            .item-content{
                padding-left: 45px;
                padding-top: 20px;
                .item-tit{
                    font-size: 16px;
                    color: #FFFFFF;
                }
                .item-label{
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-top: 18px;
                    .label-num{
                        font-size: 16px;
                        color: rgba(145, 238, 255, 1);
                    }
                    .label-percent{
                        font-size: 16px;
                        color: rgba(255, 207, 112, 1);
                    }
                }
            }
        }
    }
}
</style>