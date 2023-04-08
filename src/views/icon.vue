<template>

  <div class="customer-analysis-container">

    <div class="chart-row">

      <div class="chart-item">

        <div class="chart-title">

          客户规模分布
        </div>

        <div class="chart-content" ref="customerSizeDistributionChart">

        </div>

      </div>

      <div class="chart-item">

        <div class="chart-title">

          客户活跃度分析
        </div>

        <div class="chart-content" ref="customerActivityAnalysisChart">

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const customerSizeDistributionChart = ref(null);
    const customerActivityAnalysisChart = ref(null);

    onMounted(() => {
      // 客户规模分布
      const customerSizeDistributionOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            data: [
              { name: '规模1', value: Math.round(Math.random() * 1000) },
              { name: '规模2', value: Math.round(Math.random() * 1000) },
              { name: '规模3', value: Math.round(Math.random() * 1000) },
              { name: '规模4', value: Math.round(Math.random() * 1000) },
              { name: '规模5', value: Math.round(Math.random() * 1000) }
            ],
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c} ({d}%)'
            },
            labelLine: {
              show: true
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function(params) {
                var colorList = [
                  '#007aff',
                  '#ffb900',
                  '#00c853',
                  '#ff6a00',
                  '#5c6bc0'
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        ]
      };
      const chart1 = echarts.init(customerSizeDistributionChart.value);
      chart1.setOption(customerSizeDistributionOption);

      // 客户活跃度分析
      const customerActivityAnalysisOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['高活跃度客户', '低活跃度客户']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['客户1', '客户2', '客户3', '客户4', '客户5']
        },
        series: [
          {
            name: '高活跃度客户',
            type: 'bar',
            stack: '总量',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100)
            ],
            itemStyle: {
              color: '#007aff'
            }
          },
          {
            name: '低活跃度客户',
            type: 'bar',
            stack: '总量',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100),
              Math.round(Math.random() * 100)
            ],
            itemStyle: {
              color: '#ffb900'
            }
          }
        ]
      };
      const chart2 = echarts.init(customerActivityAnalysisChart.value);
      chart2.setOption(customerActivityAnalysisOption);
    });

    return {
      customerSizeDistributionChart,
      customerActivityAnalysisChart
    };
  }
}

</script>

<style scoped>
.customer-analysis-container {
  padding: 20px;
}

.chart-row {
  display: flex;
  margin-bottom: 20px;
}

.chart-item {
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-content {
  height: 400px;
}
</style>