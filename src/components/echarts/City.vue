<template>
    <div class="city-echart" id="city"></div>
</template>


<script setup>
import { onMounted } from 'vue';
import * as echarts from 'echarts';
import nanping from '@/assets/city/350700_full.json';

onMounted(() => {
    echartInit();
})

let myChart = null
// 南平市地图
const echartInit = () => {
    // 初始化统计图对象
    myChart = echarts.init(document.getElementById('city'));

    // 获取地图数据
    let mapData = nanping


    // 注册自定义地图类型, 类型名称, 地图数据
    echarts.registerMap("南平", mapData);

    // 设置不同区域的背景
    let data = mapData.features.map((item) => {
        let backgroundColorObj = {
            '延平区': 'rgba(19, 111, 120, 0.8)',
            '建阳区': 'rgba(19, 111, 120,  0.8)',
            '邵武市': 'rgba(19, 111, 120,  0.8)',
            '武夷山市': 'rgba(19, 111, 120,  0.8)',
            '建瓯市': 'rgba(19, 111, 120, 0.8)',
            '顺昌县': 'rgba(13, 150, 163,  0.8)',
            '浦城县': 'rgba(13, 150, 163, 0.8)',
            '光泽县': 'rgba(13, 150, 163,  0.8)',
            '松溪县': 'rgba(13, 150, 163,  0.8)',
            '政和县': 'rgba(13, 150, 163, 0.8)',
        }
        return {
            name: item.properties.name,
            itemStyle: {
                areaColor: backgroundColorObj[item.properties.name]
            }
        };
    });

    // 配置项
    let option = {
        // backgroundColor: "#030528",
        // backgroundColor: "rgb( 22, 33, 48)",
        geo: [
            {
                map: "南平",
                type: "map",
                aspectScale: 1,
                zoom: 1,
                regions: data,
                layoutCenter: ["50%", "50%"],
                layoutSize: "100%",
                show: true,
                roam: false,
                label: {
                    // 设置文字阴影
                    show: false,
                    color: "#fff", 
                    fontSize: "14px",
                    textShadowColor: '#fff',
                    textShadowBlur: 0.2,
                    textShadowOffsetX: -2,
                    textShadowOffsetY: 10,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                },
                itemStyle: {
                    borderColor: "rgba(18, 69, 74, 1)",
                    borderWidth: 1,
                    areaColor: "rgb(9, 177, 193, 0)",
                }
            },
        ],
        series: [
            {
                name: "南平数据",
                type: "map",
                map: "南平", // 自定义扩展图表类型
                aspectScale: 1,
                zoom: 1, // 缩放
                showLegendSymbol: true,
                label: {
                    show: true,
                    color: "#fff", fontWeight: 'bold', fontSize: "14px",
                    fontStyle: 'italic',
                },
                itemStyle: {
                    borderColor: "rgb(55, 229, 245)",
                    borderWidth: 0.5,
                    areaColor: 'rgba(255,255,255,0)',
                },
                emphasis: {
                    itemStyle: {
                        show: true,
                        color: "#fff",
                        fontWeight: 'bold',
                        areaColor: "rgba(51, 227, 244, 0.8)",
                    },
                    label: {
                        show: true,
                        color: "#fff", fontWeight: 'bold', fontSize: "14px",
                        fontStyle: 'italic',
                    }
                },
                layoutCenter: ["50%", "50%"],
                layoutSize: "100%",
                markPoint: {
                    symbol: "none",
                },
                data: data
            }
        ],
    };
    myChart.setOption(option);
}
</script>


<style lang="scss" scoped>
.city-echart{
    width: 100%;
    height: 100%;
}
</style>