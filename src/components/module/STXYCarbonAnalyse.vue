<template>
    <div class="carbon-analyse" v-show="props.block.lookShow" :style="moduleOneStyle">
        <div class="module-header">
            <img class="header-img" src="@/assets/STXY/title-bag.png" alt="">
            <span>{{props.block.title}}</span>
        </div>
        <div class="module-content">
            <div class="content-hd">
                <div class="hd-info">
                    <div class="emission">
                        昨日排放量:
                        <span>25.7t</span>
                    </div>
                    <div class="emission new-emission">
                        今日排放量:
                        <span>25.39t</span>
                    </div>
                </div>
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
                <div ref="carbonEmissionRef" class="echart"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import * as echarts from 'echarts';

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

const carbonEmissionRef = ref(null);
const date = ref(undefined);

let myChart = null;
const getEchart = () => {
    myChart = echarts.init(carbonEmissionRef.value);

    const payload = {
        id: '',
        data: {
            title: ['生态指数'],
            unit: ['%'],
            x: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            data1: [20, 80, 100, 40, 34, 90, 60, 20, 80, 100, 40, 34],
        },
    };

    const unit = payload.data.unit || [];
    const x = payload.data.x || [];
    const data1 = payload.data.data1 || [];
    const title = payload.data.title || [];

    let option = {
        grid: {
            top: 35,
            left: 15,
            right: 15,
            bottom: 10,
            // 是否包含文本
            containLabel: true,
        },
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'axis',
            show: false,
            backgroundColor: 'rgba(9, 30, 60, 0.6)',
            extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset;',
            borderWidth: 0,
            confine: false,
            appendToBody: true,
            textStyle: {
                color: '#fff',
                fontSize: 10,
            },
            // 轴触发提示才有效
            axisPointer: {
                type: 'shadow',
            },
            shadowStyle: {
                color: 'rgba(157, 168, 245, 0.1)',
            },

            formatter: (data) => {
                var tip = '<h5 class="echarts-tip-h5">' + data[0].name + '</h5>';
                data.forEach((item) => {
                    let unit = '';
                    if (item.seriesType === 'bar') {
                        tip += '<div class="echarts-tip-div">';
                        tip += '<div class="left">' + item.marker + item.seriesName + '：</div>';
                        tip += '<div class="right">' + item.value + unit + '</div>';
                        tip += '</div>';
                    }
                });
                return tip;
            },
        },
        xAxis: {
            data: x,
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
        },
        yAxis: [
            {
                name: '单位/t',
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
        ],
        series: [
             {
                name: 'maxdata',
                type: 'custom',
                itemStyle: {
                    color: 'rgba(35, 125, 181, .2)',
                    borderWidth: '1',
                    borderColor: 'rgba(35, 125, 181, 1)'
                },
                renderItem: function (params, api) {
                    //获取对应类目的axisTick中心点坐标
                    var start = api.coord([api.value(0)])

                    //通过坐标系的宽度和类目数，计算单个类目的背景
                    var width = (params.coordSys.width / data1.length) * 0.7
                    return {
                        type: 'rect',
                        shape: {
                        // 相对左上角坐标
                        x: start[0] - width / 2,
                        y: params.coordSys.y,
                        width: width,
                        height: params.coordSys.height
                        },
                        // style: api.style()
                        style: {
                            fill: api.visual('color')
                        }
                    }
                },
                z: 0,
                zlevel: 0,
                data: data1.map(() => 0)
            },
            {
                type: 'pictorialBar',
                barWidth: 17,
                // itemStyle: {
                //     color: '#021C46', //数据的间隔颜色
                // },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#54E5FF', //渐变1
                        },
                        {
                            offset: 1,
                            color: '#144B6F', //渐变2
                        },
                    ]),
                },

                symbolRepeat: 'true',
                symbolMargin: 2,
                symbol: 'rect',
                symbolSize: [17, 5],
                data: data1,
                z: 1,
                zlevel: 0,
                label: {
                    show: false,
                    position: 'top',
                    fontSize: 14,
                    color: '#fff', //柱状顶部文字颜色
                    formatter: function (params) {
                        return params.data;
                    },
                }
            },
        ],
    };

    myChart.setOption(option);
}

onMounted(() => {
    getEchart();
})
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
        padding-right: 27px;
        .content-hd{
            width: 100%;
            height: 40px;
            padding-top: 10px;
            padding-left: 14.36915%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .hd-info{
                display: flex;
                .emission{
                    font-size: 16px;
                    color: #fff;
                    span{
                        color: #91EEFF;
                    }
                }
                .new-emission{
                    margin-left: 40px;
                }
            }
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
            height: calc( 100% - 40px);
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