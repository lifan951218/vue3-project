<template>

  <div class="customer-analysis-container">

    <div class="chart-row">

      <div class="chart-item">

        <div class="chart-title">

          产品满意度分析
        </div>

        <div class="chart-content" ref="productSatisfactionChart">

        </div>

      </div>

      <div class="chart-item">

        <div class="chart-title">

          渠道满意度分析
        </div>

        <div class="chart-content" ref="channelSatisfactionChart">

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
    const productSatisfactionChart = ref(null);
    const channelSatisfactionChart = ref(null);

    onMounted(() => {
      // 产品满意度分析
      const productSatisfactionOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['产品1', '产品2', '产品3']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['客户1', '客户2', '客户3', '客户4', '客户5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '产品1',
            type: 'bar',
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
            name: '产品2',
            type: 'bar',
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
          },
          {
            name: '产品3',
            type: 'bar',
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
              color: '#00c853'
            }
          }
        ]
      };
      const chart1 = echarts.init(productSatisfactionChart.value);
      chart1.setOption(productSatisfactionOption);

      // 渠道满意度分析
      const channelSatisfactionOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['渠道1', '渠道2', '渠道3']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['客户1', '客户2', '客户3', '客户4', '客户5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '渠道1',
      type: 'bar',
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
        name: '渠道2',
            type: 'bar',
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
      },
      {
        name: '渠道3',
            type: 'bar',
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
        color: '#00c853'
      }
      }
    ]
    };
      const chart2 = echarts.init(channelSatisfactionChart.value);
      chart2.setOption(channelSatisfactionOption);
    });

    return {
      productSatisfactionChart,
      channelSatisfactionChart
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