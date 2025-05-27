<template>
    <div class="module-box" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module1-tit">
            <span class="tit-text">{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <video-player ref="videoPlayerRef" :options="playerOptions" :autoplay="false" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { VideoPlayer } from "@videojs-player/vue";
import 'video.js/dist/video-js.css'
import carbon from '@/assets/home/carbon.mp4';
import carbonCover from '@/assets/home/carbonCover.jpg';

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

//视频播放器
const videoPlayerRef = ref(null);

// 视频播放器配置
const playerOptions = ref({
  language: "zh-CN", // 语言
  playbackRates: [0.5, 1.0, 1.5],  // 倍速可选项 可自定义
  playsinline: true,
  width: '100%',
  height: '100%',
  mirror: false,
  controls: true, // 是否展示控制栏
  poster: carbonCover,  // 封面图
  sources: [
    {
      // type为视频资源类型 application/x-mpegURL在总结着重介绍
      type: "video/mp4", 
      src: carbon
    },
  ],
});
</script>

<style lang="scss" scoped>
.module-content .video-js{
    width: 100%;
    height: 100%;
}
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
        height: calc(100% - 14.2857%);
        padding: 0 16px 10px;
        color: #2c2d2e;
        font-size: 18px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>