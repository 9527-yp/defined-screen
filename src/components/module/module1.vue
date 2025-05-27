<template>
    <div class="module-box" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module1-tit">
            <span class="tit-text">{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div class="content-info">
                <div class="content-box tab1">
                    <img src="@/assets/home/tab1.png" alt="">
                    <div class="c-top">棚内实时温度(℃)</div>
                    <div class="c-number">32.4</div>
                    <div class="c-icon"></div>
                </div>
                <div class="content-box tab2">
                    <img src="@/assets/home/tab2.png" alt="">
                    <div class="c-top">棚内实时温度(℃)</div>
                    <div class="c-number">32.4</div>
                    <div class="c-icon"></div>
                </div>
                <div class="content-box tab1">
                    <img src="@/assets/home/tab1.png" alt="">
                    <div class="c-top">棚内实时温度(℃)</div>
                    <div class="c-number">32.4</div>
                    <div class="c-icon"></div>
                </div>
                <div class="content-box last tab3">
                    <img src="@/assets/home/tab1.png" alt="">
                    <div class="c-top">棚内实时温度(℃)</div>
                    <div class="c-number">32.4</div>
                    <div class="c-icon"></div>
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
.module-box{
    position: fixed;
    background: url('@/assets/home/right-b.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .module1-tit{
        width: 100%;
        height: 14.2857%;
        display: flex;
        align-items: center;
        .tit-text{
            margin-left: 51px;
            color: #1DD2BA;
            font-size: 16px;
            margin-bottom: 10px;
        }
    }
    .module-content{
        width: 100%;
        height: calc(100% - 45px);
        padding: 0 16px;
        .content-info{
            display: flex;
            flex-wrap: wrap;
        }
        .content-box{
            // width: 148px;
            flex: 1;
            height: 65px;
            margin: 0px 12px;
            margin-bottom: 12px;
            position: relative;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
            }
            .c-top{
                padding-left: 11px;
                padding-top: 9px;
                font-family: Microsoft YaHei;
                font-size: 14px;
            }
            .c-number{
                position: absolute;
                top: 33px;
                left: 16px;
                font-size: 22px;
            }
            .c-icon{
                width: 49px;
                height: 26px;
                position: absolute;
                bottom: 7px;
                right: 11px;
            }
        }
        .last{
            margin-right: 0px;
        }
        .tab1{
            .c-top{
                color: #93D9D9;
            }
            .c-number{
                color: #00FFFF;
            }
            .c-icon{
                background: url('@/assets/home/tab1-icon.png');
            }
        }
        .tab2{
            .c-top{
                color: #D29731;
            }
            .c-number{
                color: #E99401;
            }
            .c-icon{
                height: 21px;
                background: url('@/assets/home/tab2-icon.png');
            }
        }
        .tab3{
            .c-top{
                color: #D84343;
            }
            .c-number{
                color: #ED2424;
            }
            .c-icon{
                background: url('@/assets/home/tab3-icon.png');
            }
        }
    }
}
</style>