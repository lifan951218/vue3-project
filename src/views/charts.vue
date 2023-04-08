<template>

  <div class="container">

    <div class="chart-row">

      <div class="chart-item">

        <div class="chart-title">

          利润趋势
        </div>

        <div class="chart-content" ref="profitTrendChart">

        </div>

      </div>

      <div class="chart-item">

        <div class="chart-title">

          利润构成
        </div>

        <div class="chart-content" ref="profitCompositionChart">

        </div>

      </div>

    </div>

    <div class="chart-row">

      <div class="chart-item">

        <div class="chart-title">

          利润率趋势
        </div>

        <div class="chart-content" ref="profitRateTrendChart">

        </div>

      </div>

      <div class="chart-item">

        <div class="chart-title">

          利润率比较
        </div>

        <div class="chart-content" ref="profitRateComparisonChart">

        </div>

      </div>

    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import echarts from 'echarts';

const profitTrendChart = ref(null);
const profitCompositionChart = ref(null);
const profitRateTrendChart = ref(null);
const profitRateComparisonChart = ref(null);

onMounted(() => {
  // 利润趋势
  const profitTrendOption = {
    tooltip: {
      trigger: 'axis'
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
      data: ['2017', '2018', '2019', '2020', '2021']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '利润',
        type: 'line',
        data: [100, 180, 230, 350, 500],
        itemStyle: {
          color: '#007aff'
        }
      }
    ]
  };
  const chart1 = echarts.init(profitTrendChart.value);
  chart1.setOption(profitTrendOption);

  // 利润构成
  const profitCompositionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['销售收入', '其他收益']
    },
    series: [
      {
        name: '利润构成',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 800, name: '销售收入' },
          { value: 200, name: '其他收益' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          color: function(params) {
            var colorList = [
              '#007aff',
              '#ffb900'
            ];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };
  const chart2 = echarts.init(profitCompositionChart.value);
  chart2.setOption(profitCompositionOption);

  // 利润率趋势
  const profitRateTrendOption = {
    tooltip: {
      trigger: 'axis'
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
      data: ['2017', '2018', '2019', '2020', '2021']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '利润率',
        type: 'line',
        data: [10, 15, 18, 20, 25],
        itemStyle: {
          color: '#007aff'
        }
      }
    ]
  };
  const chart3 = echarts.init(profitRateTrendChart.value);
  chart3.setOption(profitRateTrendOption);

  // 利润率比较
  const profitRateComparisonOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['利润率1', '利润率2']
    },
    series: [
      {
        name: '利润率比较',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 60, name: '利润率1' },
          { value: 40, name: '利润率2' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          color: function(params) {
            var colorList = [
              '#007aff',
              '#ffb900'
            ];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };
  const chart4 = echarts.init(profitRateComparisonChart.value);
  chart4.setOption(profitRateComparisonOption);
});

</script>

<style>
.profit-analysis-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart-item {
  width: 400px;
  height: 400px;
  margin-right: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chart-title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.chart-content {
  flex: 1;
}
</style>