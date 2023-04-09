<template>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>


<script>
import * as echarts from 'echarts';

export default {
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chart;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '关系挖掘图',
          subtext: '数据来自XXX社交平台'
        },
        tooltip: {},
        legend: {
          data: ['用户A', '用户B', '用户C', '用户D', '用户E', '用户F']
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: [
              { name: '用户A', category: 0 },
              { name: '用户B', category: 0 },
              { name: '用户C', category: 1 },
              { name: '用户D', category: 1 },
              { name: '用户E', category: 2 },
              { name: '用户F', category: 3 }
            ],
            links: [
              {
                source: '用户A',
                target: '用户B',
                label: {
                  show: true,
                  formatter: '好友关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户B',
                target: '用户C',
                label: {
                  show: true,
                  formatter: '师生关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户A',
                target: '用户D',
                label: {
                  show: true,
                  formatter: '父子关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户C',
                target: '用户E',
                label: {
                  show: true,
                  formatter: '同事关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户D',
                target: '用户E',
                label: {
                  show: true,
                  formatter: '同事关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户D',
                target: '用户F',
                label: {
                  show: true,
                  formatter: '兄弟关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              },
              {
                source: '用户E',
                target: '用户F',
                label: {
                  show: true,
                  formatter: '同事关系'
                },
                lineStyle: {
                  curveness: 0.3
                }
              }
            ],
            categories: [
              { name: '家庭' },
              { name: '教育' },
              { name: '职业' },
              { name: '其他' }
            ],
            force: {
              repulsion: 200,
              edgeLength: 100,
              layoutAnimation: true
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 700px;
}

.chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>