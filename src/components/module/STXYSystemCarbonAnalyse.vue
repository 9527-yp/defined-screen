<template>
    <div class="carbon-analyse" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div ref="analyseBarRef" class="echart"></div>
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

onMounted(() => {
    analyseBarRef.value && getEchart();
})

const analyseBarRef = ref(null);
let myChart = null;
const getEchart = () => {

    myChart = echarts.init(analyseBarRef.value);

    const titleName = [
        {
            name: '建筑碳汇',
            value: 0.12
        },
        {
            name: '暖通空调',
            value: -0.2
        },
        {
            name: '照明插座',
            value: 0.22
        },
        {
            name: '动力系统',
            value: 0.35
        },
        {
            name: '生活用水',
            value: -0.45
        },
        {
            name: '其他',
            value: 0.55
        },
        {
            name: '可再生能源',
            value: 0.12
        },
    ];
    const color = ['#F772D1', '#015EEA', '#F7CB6B', '#43EA80', '#5A00FF', '#FFD800', '#F92929'];
    const seriesData = titleName.map((item, index) => {
        let dataArr = new Array(index+1);
        dataArr[index] = {value: item.value}
        let newData = {
            name: item.name,
            type: 'bar',
            stack: 'Total',
            label: {
                formatter: '{b}'
            },
            itemStyle: {
                color: color[index],
            },
            data: dataArr
        }
        return newData
    })
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            top: 40,
            bottom: 30,
            right: 120
        },
        yAxis: {
            type: 'value',
            name: '单位/tCO2e',
            nameTextStyle: {
                color: '#fff',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#19C0FD'
                }
            },
            axisLabel: {
                color: '#fff',
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#19C0FD'
                }
            },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: [
            'ten',
            'nine',
            'eight',
            'seven',
            'six',
            'five',
            'four'
            ]
        },
        series: seriesData
    };

    myChart.setOption(option);
}
</script>


<style lang="scss" scoped>
.carbon-analyse{
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
        .echart{
            width: 100%;
            height: 100%;
        }
    }
}
</style>