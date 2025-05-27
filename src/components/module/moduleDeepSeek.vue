<template>
    <div class="deepseek-box"
        v-drag="{state,id:props.block.id}"
        v-show="props.block.lookShow"
        :style="moduleStyle"
        @drag-click="onDragStart"
    >
        <img class="deepseek-img" src="@/assets/AIDialog/user-cover.png" alt="">
    </div>
</template>

<script setup>
import  drag  from '@/utils/DeepSeek-drag.js';
import { computed } from 'vue';

defineOptions({
  directives: {
    drag,
  }
});

const props = defineProps({
    block:{
        type: Object,
        default: () => {}
    }
})

const state = defineModel('state', {
    type: Object,
    default: () => {}
})


const moduleStyle = computed(() => {
    return {
        width: props.block.width + 'px',
        height: props.block.height + 'px',
        left: props.block.left + 'px',
        top: props.block.top + 'px',
    }
})

const emits = defineEmits(['openDeepSeek'])
const onDragStart = () => {
    console.log('点击...')
    emits('openDeepSeek')
}
</script>

<style lang="scss" scoped>
.deepseek-box{
    position: fixed;
    z-index: 100;
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
    }
    
}
</style>