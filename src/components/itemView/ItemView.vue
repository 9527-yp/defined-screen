<template>
    <div class="item-view-box" :style="titleStyle">
        <div class="item-inner">
            <div class="item-inner-tit">
                <img class="item-icon" src="@/assets/home/item-icon.png" alt="">
                <span class="item-text">项目信息</span>
            </div>
            <div class="item-inner-content">
                <div class="inner-c">
                    <div class="c-top">
                        <div class="c-top-item">
                            <div class="item-number">79224</div>
                            <div class="item-text">建筑(㎡)</div>
                        </div>
                        <div class="c-top-item">
                            <div class="item-number">1696.5</div>
                            <div class="item-text">投资额(万元)</div>
                        </div>
                    </div>
                    <div class="c-address">
                        <span class="address-text">工程地址:</span>
                    </div>
                    <div class="c-bottom">
                        <div class="item-dept">
                            <div class="inner-bottom-item">
                                <div class="item-title">
                                    <span class="dept-text">建设单位</span>
                                </div>
                                <div class="item-content">
                                    <div class="cnt-text">兰州信息咨询科技学院</div>
                                </div>
                            </div>
                            <div class="inner-bottom-item">
                                <div class="item-title">
                                    <span class="dept-text">建设单位</span>
                                </div>
                                <div class="item-content">
                                    <div class="cnt-text">投资合约室</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import useItemViewStore from '@/stores/modules/itemView.js';

const useItemView = useItemViewStore();

const itemViewInfo  = computed(() => useItemView.getInfo())
const titleStyle = computed(() => {
    return {
        width: (itemViewInfo.value.width / 12) * 100 + '%',
        height: (itemViewInfo.value.height / 24) * 100 + '%',
        left: (itemViewInfo.value.left / 12) * 100 + '%',
        top:  (itemViewInfo.value.top / 24) * 100 + '%',
        zIndex: itemViewInfo.value.hierarchy
    }
})
</script>

<style lang="scss" scoped>
@keyframes flip {
  0% { transform: rotateX(90deg); }
  100% { transform: rotateX(0deg); }
}
.item-view-box{
    // z-index: 3;
    // left: 0%;
    // top: 8.33333%;
    // width: 25%;
    // height: 20.8333%;
    backdrop-filter: brightness(100%);

    position: fixed;
    padding: 15px 20px;
    box-sizing: border-box;
    transform-origin: 0% 0%;
    .item-inner{
        width: 100%;
        height: 100%;
        .item-inner-tit{
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FEFEFF;
            cursor: pointer;
            .item-icon{
                width: 9px;
                height: 15px;
                vertical-align: middle;
            }
            .item-text{
                // vertical-align: middle;
                margin-left: 5px;
            }
            &:hover{
                .item-text{
                    color: #03A9F4;
                }
            }
        }
        .item-inner-content{
            width: 100%;
            height: calc(100% - 21px);
            .inner-c{
                width: 100%;
                height: 100%;
                padding-top: 5px;
                color: #fff;
                .c-top{
                    height: 38%;
                    width: 100%;
                    display: flex;
                    .c-top-item{
                        flex: 1;
                        text-align: center;
                        .item-number{
                            font-size: 4vmin;
                            line-height: 3vmin;
                            color: #FD950F;
                            letter-spacing: 0.2vw;
                            font-family: 'shuzi';
                        }
                        .item-text{
                            font-size: 1.4vmin;
                            line-height: 2.8vmin;
                        }
                    }
                }
                .c-address{
                    height: 22%;
                    padding-left: 1vmin;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .address-text{
                        font-size: 1.4vmin;
                        color: #97C3FA;
                    }
                }
                .c-bottom{
                    height: 40%;
                    width: 100%;
                    .item-dept{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        .inner-bottom-item{
                            margin: 0 5px 5px 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            border-radius: 3px;
                            width: calc(50% - 5px);
                            height: calc(100%);
                            padding: 10px;
                            overflow: hidden;
                            background: linear-gradient(0deg, #104b8326 0%, #2682d79e 100%);
                            animation: flip 1s infinite alternate;
                            .item-title{
                                flex: 1;
                                padding-left: 2.6vmin;
                                .dept-text{
                                    font-size: 1.4vmin;
                                }
                            }
                            .item-content{
                                padding-left: 2.6vmin;
                                font-size: 1.2vmin;
                                margin-bottom: 5px;
                                display: flex;
                                flex-direction: column;
                                .cnt-text{
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>