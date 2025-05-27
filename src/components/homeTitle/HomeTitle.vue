<template>
    <div class="home-title-box" :style="titleStyle">
            <div class="item-inner">
                <div class="home-tit-scrop">
                    <div class="hade-inner">
                        <div class="inner-title1">项目管理实操晨曦教育事业部指挥中心</div>
                        <div class="edit-btn">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
    import { computed } from 'vue';
    import useTitleStoer from '@/stores/modules/title.js';

    const useTitle = useTitleStoer();

    const titleInfo = computed(() => useTitle.getTitleInfo())
    const titleStyle = computed(() => {
        return {
            width: (titleInfo.value.width / 12) * 100 + '%',
            height: (titleInfo.value.height / 24) * 100 + '%',
            left: (titleInfo.value.left / 12) * 100 + '%',
            top:  (titleInfo.value.top / 24) * 100 + '%',
            zIndex: titleInfo.value.hierarchy
        }
    })
</script>

<style lang="scss" scoped>
.home-title-box{
    // z-index: 3;
    // padding: 0px;
    // left: 0%;
    // top: 0%;
    // width: 100%;
    // height: 8.33333%;
    backdrop-filter: brightness(100%);

    position: fixed;
    box-sizing: border-box;
    transform-origin: 0% 0%;
    .item-inner{
        width: 100%;
        height: 100%;
        .home-tit-scrop{
            width: 100%;
            height: 100%;
            transform-origin: 0% 0%;
            .hade-inner{
                height: 100%;
                width: 100%;
                background-image: url('@/assets/home/title.png');
                background-size: 100% 100%;
                z-index: 2;
                .inner-title1{
                    width: 29%;
                    text-align: center;
                    margin: 0 auto;
                    font-size: 3.4vmin;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #fff;
                    text-shadow: 0 0px 10px #23b7e5;
                    line-height: 1.42857143;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .edit-btn{
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: calc(100% / 12);
                    height: calc(100% / 24);
                }
            }
        }
    }
}
</style>