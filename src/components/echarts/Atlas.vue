<template>
    <div class="echart-atlas" id="atlas"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { computed, onMounted, reactive, watch, ref, onBeforeUnmount } from 'vue';

onMounted(() => {
    echartFun();
})
let myChart = null;
// 百合花图谱
const echartFun = () => {
    myChart = echarts.init(document.getElementById('atlas'));
    let mockGraphData = [
        {
            id: 0,
            name: "百合花",
            category: '业务系统',
            value: 99,
            // symbol: 'image://data:image/png;base64,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'

        },
        {
            id: 3,
            name: "数据源1",
            category: '数据源',
            value: 15,
        },
        {
            id: 4,
            name: "数据源2",
            category: '数据源',
            value: 12,
        },
        {
            id: 5,
            name: "数据源3",
            category: '数据源',
            value: 15,
        },
        {
            id: 6,
            name: "数据源4",
            category: '数据源',
            value: 16,
        },
        {
            id: 7,
            name: "数据源5",
            category: '数据源',
            value: 16,
        },
        {
            id: 8,
            name: "数据源6",
            category: '数据源',
            value: 16,
        },
        {
            id: 9,
            name: "数据源7",
            category: '数据源',
            value: 16,
        },
        {
            id: 10,
            name: "数据源8",
            category: '数据源',
            value: 16,
        },
        {
            id: 11,
            name: "数据源9",
            category: '数据源',
            value: 16,
        },
        {
            id: 12,
            name: "数据源10",
            category: '数据源',
            value: 16,
        },
        {
            id: 13,
            name: "数据源11",
            category: '数据源',
            value: 16,
        },
        {
            id: 14,
            name: "数据源12",
            category: '数据源',
            value: 16,
        },
        {
            id: 20,
            name: "数据库1",
            category: '数据库',
            value: 55,
        },
        {
            id: 21,
            name: "数据库2",
            category: '数据库',
            value: 75,
        },
        {
            id: 22,
            name: "数据库3",
            category: '数据库',
            value: 93,
        },
        {
            id: 23,
            name: "数据库4",
            category: '数据库',
            value: 96,
        },
        {
            id: 24,
            name: "数据库5",
            category: '数据库',
            value: 96,
        },
        {
            id: 25,
            name: "数据库6",
            category: '数据库',
            value: 96,
        },
        {
            id: 26,
            name: "数据库7",
            category: '数据库',
            value: 96,
        },
        {
            id: 27,
            name: "数据库8",
            category: '数据库',
            value: 96,
        },
        {
            id: 28,
            name: "数据库9",
            category: '数据库',
            value: 96,
        },
        {
            id: 29,
            name: "数据库10",
            category: '数据库',
            value: 96,
        },
        {
            id: 30,
            name: "数据库11",
            category: '数据库',
            value: 96,
        },
        {
            id: 31,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 32,
            name: "数据库13",
            category: '数据库',
            value: 96,
        },
        {
            id: 33,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 34,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 35,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 36,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 37,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 38,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 39,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 40,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 41,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 42,
            name: "数据库12",
            category: '数据库',
            value: 96,
        },
        {
            id: 43,
            name: "数据库12",
            category: '数据库',
            value: 96,
        }
    ];
    let mockLink = [
        {
            source: "0",
            target: "3",
            type: "关系",
        },
        {
            source: "0",
            target: "4",
            type: "关系",
        },
        {
            source: "0",
            target: "5",
            type: "关系",
        },
        {
            source: "0",
            target: "6",
            type: "关系",
        },
        {
            source: "0",
            target: "7",
            type: "关系",
        },
        {
            source: "0",
            target: "8",
            type: "关系",
        },
        {
            source: "0",
            target: "9",
            type: "关系",
        },
        {
            source: "0",
            target: "10",
            type: "关系",
        },
        {
            source: "0",
            target: "11",
            type: "关系",
        },
        {
            source: "0",
            target: "12",
            type: "关系",
        },
        {
            source: "0",
            target: "13",
            type: "关系",
        },
        {
            source: "0",
            target: "14",
            type: "关系",
        },
        {
            source: "3",
            target: "20",
            type: "关系",
        },
        {
            source: "4",
            target: "21",
            type: "关系",
        },
        {
            source: "5",
            target: "22",
            type: "关系",
        },
        {
            source: "6",
            target: "23",
            type: "关系",
        },
        {
            source: "7",
            target: "24",
            type: "关系",
        },
        {
            source: "8",
            target: "25",
            type: "关系",
        },
        {
            source: "9",
            target: "26",
            type: "关系",
        },
        {
            source: "10",
            target: "27",
            type: "关系",
        },
        {
            source: "11",
            target: "28",
            type: "关系",
        },
        {
            source: "12",
            target: "29",
            type: "关系",
        },
        {
            source: "13",
            target: "30",
            type: "关系",
        },
        {
            source: "14",
            target: "31",
            type: "关系",
        },
        {
            source: "14",
            target: "32",
            type: "关系",
        },
        {
            source: "14",
            target: "33",
            type: "关系",
        },
        {
            source: "14",
            target: "34",
            type: "关系",
        },
        {
            source: "14",
            target: "35",
            type: "关系",
        },
        {
            source: "14",
            target: "36",
            type: "关系",
        },
        {
            source: "14",
            target: "37",
            type: "关系",
        },
        {
            source: "14",
            target: "38",
            type: "关系",
        },
        {
            source: "14",
            target: "39",
            type: "关系",
        },
        {
            source: "14",
            target: "40",
            type: "关系",
        },
        {
            source: "14",
            target: "41",
            type: "关系",
        },
        {
            source: "14",
            target: "42",
            type: "关系",
        },
        {
            source: "14",
            target: "43",
            type: "关系",
        },
    ];

    const rawData = mockGraphData.map((item) => {
        if (item.category === "关系") {
            return {
                ...item,
                symbolSize: [80, 80],
                itemStyle: {
                    normal: {
                    color: "#f4b7be",
                    },
                }
            };
        } else {
            return {
                ...item,
            };
        }
    });

    const rawLink = mockLink.map((item) => {
    // if (item.type === "关系") {
        return {
            ...item,
            tooltip: { formatter: "关系" },
            symbolSize: [10, 10],
        };
    // } else {
    //    return {
    //       ...item,
    //       tooltip: { formatter: "关系" },
    //       symbolSize: [20, 20],
    //    };
    // }

    });

    let option = {
    title: {
        text: "",
        subtext: "Default layout",
        top: "bottom",
        left: "right",
    },
    color: ["#ff575f", "#ffca56", "#00ccc1", "#4f9ef5"],
    tooltip: {
        show: false,
        trigger: "item",
        formatter: "{b}",
    },
    legend: {
        // 图表组例组件
        selectedMode: "true",
        orient: "vertical",
        top: 10,
        show: false,
        data: [
            {
                name: "业务系统",
            },
            {
                name: "数据源",
            },
            {
                name: "数据库",
            }
        ],
        left: 10,
        // itemStyle:{color: 'inherit'},
        // selector: [
        //   {
        //     type: "inverse",
        //     title: "反选",
        //   },
        // ],
    },

    animationDuration: 1000,
    animationEasingUpdate: "quinticInOut",
    // dataZoom: [
    //     {
    //         type: 'inside', // 内置的缩放
    //         start: 10,      // 初始缩放范围开始位置，百分比
    //         end: 60         // 初始缩放范围结束位置，百分比
    //     },
    //     {
    //         type: 'slider', // 滑动条缩放
    //         show: true,     // 是否显示滑动条，默认为true
    //         start: 10,      // 同上
    //         end: 60         // 同上
    //     }
    // ],
    series: [
        {
            name: "",
            type: "graph",
            layout: "force",
            edgeSymbol: ["none", "arrow"],
            edgeSymbolSize: [0, 0],
            draggable: false,
            zoom: 1, // 数据多的情况下控制显示区域大小
            // itemStyle: {
            //   normal: {
            //     // borderWidth: 2
            //   },
            // },
            symbolSize: [50, 50],
            force: {
                // 布局配置
                repulsion: 600,
                edgeLength: 50,
                layoutAnimation: true,
                friction: 0.6
            },
            data: rawData,
            links: rawLink,
            categories: [
                {
                name: "业务系统",
                },
                {
                name: "数据源",
                },
                {
                name: "数据库",
                }
            ],
            roam: true, // 是否开启平移缩放
            // edgeLabel: {
            //   normal: {
            //     show: true,
            //     formatter: function (x) {
            //         console.log(x.data, 'xxxxxxxxxxx')
            //       return x.data.target;
            //     },
            //   },
            // },
            label: {
                normal: {
                    show: true,
                    // position: ["125%", "100%"],
                    position: "inside",
                    color: "#fff",
                    textBorderWidth: 1,
                    fontSize: function(params) {
                        return params.data.labelSize || 12;  // 使用存储的 labelSize
                    },
                    // formatter: "{a|{b}}",
                    formatter: function(params) {
                        // 根据节点大小返回适当大小的文字
                        return '{a|' + params.data.name + '}\n{action|点击我}';
                        // return '<div>' + params.name + '<button id="btn-' + params.data.id + '">Click</button></div>';
                    },
                    rich: {
                        a: {
                            color: "#1458e2", // 修改节点名字color
                            fontSize: 14,
                        },
                        action: {
                            width: 10,
                            height:5,
                            lineHeight: 10,
                            color: 'red', // 按钮文本颜色
                            align: 'center', // 文本对齐方式，这里主要是为了美观，实际点击区域更大是通过下面的 bounding 设置实现的。
                            fontSize: 16, // 按钮文本大小，可以根据需要调整。实际点击区域更大是通过下面的 bounding 设置实现的。
                            // bounding: 'rect',
                        },
                        button: {
                            backgroundColor: '#4c9cf2',
                            color: '#fff',
                            padding: [2, 8],
                            borderRadius: 4,
                            fontSize: 12,
                            boxShadowBlur: 4,
                            boxShadowColor: 'rgba(0,0,0,0.3)'
                        }
                    },
                },
            },
            lineStyle: {
                normal: {
                color: "#000",
                curveness: 0, // 线的弯曲度 0-1之间 越大则歪曲度更大
                type: "solid",
                },
            },
            emphasis: {
                focus: "adjacency",
                lineStyle: {
                width: 3, // 线选中时的宽度
                },
            },
        },
    ],
    };

    myChart.setOption(option);

    // 为echarts实例添加点击事件监听器
    myChart.on('click', function (params) {
        if (params.dataType === 'node') {
            console.log('点击了节点: ', params); // 假设每个节点有一个name属性

             /* true 代表点击的是圆点
            fasle 表示点击的是当前节点的文本
            */
            if(params.event.target.culling === true){
                return
            } else if(params.event.target.culling === false){
                
            }

        } else if (params.dataType === 'edge') {
            console.log('点击了边'); // 处理边的点击事件（如果需要）
        }
    });

    // 监听缩放事件
    myChart.on('graphRoam', function(params) {
        console.log(params, 'params')
        // const option = myChart.getOption();
        // const zoom = option.series[0].zoom || 1;
        
        // // 更新所有标签字体大小
        // option.series[0].label.fontSize = Math.max(8, 12 * zoom);
        // myChart.setOption(option);
    });
}

</script>


<style lang="scss" scoped>
.echart-atlas{
    width: 100%;
    height: 100%;
}
</style>