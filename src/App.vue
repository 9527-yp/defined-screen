<script setup>
</script>

<template>
  <div class="app">
    <!-- <div class="unity-box">
      <iframe ref="iframeRef" width="100%" height="100%" scrolling="no" src="/CustomSchoolWEBGL/index.html" frameborder="0"></iframe>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app{
  width: 100%;
  height: 100%;
}
.unity-box{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
:deep(.v-screen-box) {
  background-color: rgb(43 43 43) !important;
  /* background-size: 100% 100%; */
  /* background: url('@/assets/gif-img/20250427113000.gif'); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
}
</style>
