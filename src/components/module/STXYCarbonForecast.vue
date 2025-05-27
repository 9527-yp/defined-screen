<template>
    <div class="carbon-forecast" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div class="content-hd">
                <div class="date-box">
                    <span class="date-label">日期：</span>
                    <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="请选择"
                    />
                </div>
            </div>
            <div class="echart-box">
                <div ref="carbonForecastRef" class="echart"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, computed, watch, onMounted } from 'vue';


const props = defineProps({
    block: {
        type: Object,
        default: () => {}
    }
})

let changeTime = null
// 监听模块宽高变化，调整图表位置及大小重新渲染
// 因监听对象变化，需要进行深拷贝
watch(() => JSON.parse(JSON.stringify(props.block)), (newValue, oldValue) => {
    if(newValue.width !== oldValue.width || newValue.height !== oldValue.height) {
        if(changeTime) {
            clearTimeout(changeTime)
        }
        changeTime = setTimeout(function(){
            myChart ? myChart.resize() : ''
        }, 500);
    }
}, {deep: true})


const moduleOneStyle = computed(() => {
    return {
        width: props.block.width + 'px',
        height: props.block.height + 'px',
        left: props.block.left + 'px',
        top: props.block.top + 'px',
        zIndex: props.block.zIndex
    }
})

const date = ref(undefined);
const carbonForecastRef = ref(null);

let myChart = null;
const getEchart = () => {
    myChart = echarts.init(carbonForecastRef.value);

    let data1 = ["计划", '实际'];
    let data2 = ["11", "22", "33", "44", "55", "66", "77"];
    let data3 = [4000, 6000, 7000, 2000, 5000, 7000, 9000];
    let data4 = [1000, 4000, 5000, 6000, 3000, 8000, 7000];
    let option = {
        tooltip: {
            show: true,
            trigger: "axis",
            textStyle: {
                color: "#000"
            },
            axisPointer: {
                lineStyle: {
                    color: "#4681C2"
                }
            },
        },
        grid: {
                left: "2%",
                right: "5%",
                bottom: "5%",
                top: "70px",
                containLabel: true
        },
        legend: {
            show: true,
            top: "15px",
            left: "15%",
            itemWidth: 20,
            itemHeight: 2,
            formatter: ["{a|{name}}"].join("\n"),
            textStyle: {
            fontSize: 12,
            color: "#fff",
            height: 8,
            rich: {
                a: {
                verticalAlign: "bottom"
                }
            }
            },
            data: data1
        },
        xAxis: {
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#04BBFF',
                    width: '1', //坐标线的宽度
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#fff', //底部文字颜色
                fontSize: 12,
            },
            data: data2
        },
        yAxis: {
            name: "单位/t",
            nameTextStyle: {
                align: 'right',
                fontSize: 11,
                color: '#fff',
            },
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'transparent', //左边框颜色
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#04BBFF',
                    width: '0.5',
                    type: 'dashed'
                }
            },
            axisTick: { show: false },
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#fff', //左文字颜色
            },
        },
        series: [
            {
                type: "line",
                symbol: "none",
                smooth: true,
                name: '计划', // 图例对应类别
                data: data3, // 纵坐标数据
                lineStyle: {
                    width: 2
                },
                emphasis: {
                    focus: 'series', // 高亮状态是否淡出其他图形
                },
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(29, 241, 250, 1)' },
                    { offset: 1, color: 'rgba(247, 147, 29, 1)' }
                ]),
            },
            {
                type: "line",
                symbol: "none",
                smooth: true,
                name: '实际', // 图例对应类别
                data: data4, // 纵坐标数据
                lineStyle: {
                    width: 2
                },
                emphasis: {
                    focus: 'series', // 高亮状态是否淡出其他图形
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(106, 130, 241, 1)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(101, 212, 250, 1)'
                    }
                ]),
                
            }
        ]
    };

    myChart.setOption(option);
}

onMounted(() => {
    getEchart();
})
</script>

<style lang="scss" scoped>
.carbon-forecast{
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
        background: rgba(13, 44, 65, .6);
        position: relative;
        .content-hd{
            position: absolute;
            top: 10px;
            right: 20px;
            height: 30px;
            z-index: 2;
            .date-box{
                display: flex;
                align-items: center;
                .date-label{
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }
        }
        .echart-box{
            width: 100%;
            height: calc( 100%);
            z-index: 1;
            .echart{
                width: 100%;
                height: 100%;
            }
        }
    }
}

.date-box :deep(.el-input__wrapper) {
    background-color: transparent;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #91EEFF;
    box-shadow: none;
    box-sizing: border-box;
}
.date-box :deep(.el-input--suffix) {
    width: 160px;
    height: 30px;
}
.date-box :deep(.el-input__inner) {
    color: #fff;
}
.date-box :deep(.el-input__icon) {
    width: 16px;
    height: 16px;
    color: #91EEFF;
}
</style>