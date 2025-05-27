<template>
    <el-dialog
        v-model="AIVisible"
        title="校园碳排放AI推演"
        width="800"
        header-class="AI-header"
        :align-center='true'
    >
        <div class="AI-content">
            <div class="AI-com" ref="scrollableBox">
                <div class="my-msg">
                    <div class="user-cover">
                        <img src="@/assets/AIDialog/user-cover.png" alt="">
                    </div>
                    <div class="msg-content">假设我在校园教学区安装了200㎡光伏发电板，日均有效光照4小时，全年运行。结合上海地区的光照数据和电网碳排放因子，CHATAI能否推演一年内可抵消多少吨碳排放？请说明计算逻辑和关键参数来源。</div>
                </div>
                <div class="other-msg">
                    <div class="other-cover">
                        <img src="@/assets/AIDialog/DeepSeek.jpg" alt="">
                    </div>
                    <div class="msg-content">
                        <div class="cnt">
                            ‌碳排放抵消量‌：
                            <br/>
                            上海电网每度电碳排放因子 = ‌0.581kgCO₂/kWh‌（2023年上海环境能源交易所数据）
                            <br/>
                            总抵消量 = 59,328kWh × 0.581kg ≈ ‌34.47tCO2e/年‌
                            <br/>
                            ‌2. 动态修正因子（提升精度）：‌
                            <br/>
                            ‌季节波动‌：夏季日均发电量提升20%（光照增强），冬季下降15%（阴雨天气）；
                            <br/>
                            ‌建筑遮挡‌：若教学区周边有高层遮挡，全年发电量需再下调8%-12%；
                            <br/>
                            ‌电网反馈机制‌：若余电反哺电网，按实际输送比例额外计算区域减排贡献。
                            <br/>
                        </div>
                    </div>
                </div>
                <template v-for="(item, index) in stateData" :key="item.id">
                    <div class="my-msg" v-if="item.userId === 'tj'">
                        <div class="user-cover">
                            <img src="@/assets/AIDialog/user-cover.png" alt="">
                        </div>
                        <div class="msg-content">{{item.msg}}</div>
                    </div>
                    <div class="loading-box" v-show="loading && index === stateData.length-1">
                        <img src="@/assets/AIDialog/loading.gif" alt="">
                    </div>
                    <div class="other-msg" v-if="item.userId === 'DeepSeek'">
                        <div class="other-cover">
                            <img src="@/assets/AIDialog/DeepSeek.jpg" alt="">
                        </div>
                        <div class="msg-content">
                            <div class="cnt">{{item.msg}}</div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="dialog-box">
                <div class="input-box">
                    <el-input
                        v-model="textarea2"
                        style="width: 100%"
                        type="textarea"
                        placeholder="给DeepSeek 发送消息"
                    />
                </div>
                <div class="send-box">
                    <div class="send-btn" @click="sendMsg">发送</div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>


<script setup>
import { nextTick, ref } from 'vue';

const AIVisible = defineModel('AIVisible', {
    type: Boolean,
    default: false
})

const scrollableBox = ref(null);

const stateData = ref([])

const textarea2 = ref('');
const loading = ref(false);
const sendMsg = () => {
    stateData.value.push({
        id: new Date().getTime(),
        msg: textarea2.value,
        userId: 'tj',
    })
    textarea2.value = '';
    loading.value = true;

    // 添加平滑滚动底部功能
    nextTick(() => {
        if (scrollableBox.value) {
            scrollableBox.value.scrollTo({
                top: scrollableBox.value.scrollHeight,
                behavior: 'smooth' // 平滑滚动
            });
        }
    })

    setTimeout(() => {
       stateData.value.push({
            id: new Date().getTime(),
            msg: '抱歉！系统繁忙，请稍后再试',
            userId: 'DeepSeek',
        })
        loading.value = false; 
    }, 1000)
}
</script>

<style lang="scss" scoped>
.AI-content{
    .AI-com{
        width: 100%;
        height: 400px;
        padding: 15px;
        overflow-x: auto;
        background: url('@/assets/AIDialog/cnt-bag.png');
        .my-msg{
            position: relative;
            margin-bottom: 20px;
            overflow: hidden;
            .msg-content{
                float: right;
                max-width: 80%;
                margin-right: 10px;
                color: #fff;
                padding: 10px 15px 10px 10px;
                background: url('@/assets/AIDialog/my-msg-bag.png');
                background-position: right top; /* 始终定位到右上角 */
                background-repeat: no-repeat;
                background-size: auto; /* 不缩放背景图，超出部分会被裁剪 */
            }
            .user-cover{
                float: right;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .loading-box{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .other-msg{
            margin-bottom: 20px;
            overflow: hidden;
            .other-cover{
                float: left;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .msg-content{
                float: left;
                max-width: 80%;
                margin-left: 10px;
                margin-top:5px;
                color: #fff;
                padding: 10px 10px 10px 20px;
                box-sizing: border-box;
                background: url('@/assets/AIDialog/other-msg-bag.png');
                background-position: left top; /* 始终定位到右上角 */
                background-repeat: no-repeat;
                background-size: auto; /* 不缩放背景图，超出部分会被裁剪 */
                .cnt{
                    width: 100%;
                    max-height: 200px;
                    overflow-x: auto;
                    &::-webkit-scrollbar-thumb {
                        border-radius: 10px;
                        height:5px;
                        background-color: rgba(2, 37, 41, .9);;
                    }
                }
            }
        }
    }
    .dialog-box{
        width: 100%;
        height: 80px;
        background: rgba(50, 80, 80, .6);
        border-radius: 5px;
        display: flex;
        margin-top: 20px;
        .input-box{
            width: 85%;
            height: 100%;
        }
        .send-box{
            width: 15%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .send-btn{
                width: 80px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(32, 113, 109, 1);
                color: #fff;
                font-size: 16px;
                border-radius: 40px;
                overflow: hidden;
                cursor: pointer;
            }
        }
    }
}
.input-box :deep(.el-textarea__inner) {
    height: 100%;
    max-height: 100%;
    resize: none; // 去除右下角图标
    background: transparent;
    border-width: 0px;
    box-shadow: none;
    color: #fff;
}
.input-box :deep(.el-textarea) {
    height: 100%;
}
</style>

<style>

</style>