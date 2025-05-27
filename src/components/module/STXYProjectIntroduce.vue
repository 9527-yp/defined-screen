<template>
    <div class="project-introduce" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{ props.block.title }}</span>
        </div>
        <div class="module-content">
            零碳校园建设以物联网与大数据为核心，构建覆盖能源、
            建筑、交通的智能管控体系，通过光伏微电网、碳足迹动
            态追踪及AI节能算法，实现教学区碳排放下降45%、资源
            循环率达90%，并获LEED碳中和认证，打造产学研一体的
            低碳教育范本。
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
.project-introduce{
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
        padding: 30px 30px 0px;
        background: rgba(13, 44, 65, .6);
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 30px;
        text-align: left;
        font-style: normal;
        text-transform: none;
    }
}
</style>