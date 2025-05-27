<template>
    <div class="home-title">
        <img class="home-img" src="@/assets/STXY/home-bag.png" alt="">
        <div class="title">双碳校园虚拟仿真数据中心</div>
        <div class="go-back" @click="goBack">
            <img src="@/assets/STXY/goBack-icon.png" alt="">
        </div>
        <div class="setting" @click="settingBtn">
            <img src="@/assets/STXY/setting-icon.png" alt="">
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const emits = defineEmits(['settingClick'])

const goBack = () => {
    router.go(-1)
}

const settingBtn = () => {
    emits('settingClick')
}
</script>


<style lang="scss" scoped>
.home-title{
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 124px;
    .home-img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .title{
        width: 100%;
        height: 100%;
        padding-top: 15px;
        display: flex;
        justify-content: center;
        letter-spacing: 20px;
        font-family: iFontszhounianti;
        font-size: 38px;
        font-weight: 700;
        color: #fff;
    }
    .go-back{
        position: absolute;
        top: 33px;
        right: 48px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .setting{
        position: absolute;
        top: 33px;
        right: 90px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>