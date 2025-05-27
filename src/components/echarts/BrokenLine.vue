<template>
    <div class="echart-atlas" ref="atlasRef"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { computed, onMounted, reactive, watch, ref, onBeforeUnmount } from 'vue';

const props = defineProps({
    block: {
        type: Object,
        default: () => {}
    }
})

onMounted(() => {
    echartFun();
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


let myChart = null;
const atlasRef = ref(null);
// 百合花图谱
const echartFun = () => {
    let index = 0
    let anticipateData = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    let time = ['1时', '2时', '3时', '4时','5时', '6时', '7时', '8时','9时', '10时', '11时', '12时','13时', '14时', '15时', '16时','17时', '18时', '19时', '20时','21时', '22时', '23时', '24时'];
    myChart = echarts.init(atlasRef.value);
    

    let option = {
        // backgroundColor:'#222',
        title: {
            show: false,
            text: '单位:万',
            left: 30,
            // 文字颜色
            textStyle: {
                color: '#4c9bfd'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: false,
            data: ['预期销售额'],
            left: 'right',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
            data: time
        },
        yAxis: {
            /* 刻度为数据最大刻度 */
            min: 0,
            max: 300,
            type: 'value',
            // 文字颜色
            axisLabel: {
                color: '#4c9bfd'
            },
            //修改刻度颜色
            splitLine: {
                lineStyle: {
                color: '#012f4a'
                }
            }
        },
        series: [
        {
            name: '预期销售额',
            type: 'line',
            stack: '总量',
            //曲线
            smooth: true,
            //圆圈大小
            symbolSize: 8,
            itemStyle: {
            color: '#00f2f1' // 线颜色
            },
            data: anticipateData
        },
        ]
    }




    myChart.setOption(option);

    setInterval(function () {
        //1.数组下标++ 切换数据

        if(index >= 24) {
            anticipateData = []
            index = 0
        }else{
            let value =Math.floor(Math.random() * (200 - 10 + 1)) + 10;
            anticipateData[index] = value;
        }
        index++
        //2.替换数据
        option.series[0].data = anticipateData
        //3.重新渲染 echarts图表
        myChart.setOption(option)
    }, 3000)

}

</script>


<style lang="scss" scoped>
.echart-atlas{
    width: 100%;
    height: 100%;
}
</style>