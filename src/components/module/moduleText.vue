<template>
    <div class="module-box" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module1-tit">
            <span class="tit-text">{{props.block.title}}</span>
        </div>
        <div class="module-content">
            {{props.block?.props?.textValue}}
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

console.log()

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
        color: #2c2d2e;
        font-size: 18px;
    }
}
</style>