<template>
  <div class="cash-flow-analysis-container">
    <div class="chart-row">
      <div class="chart-item">
        <div class="chart-title">经营活动现金流量</div>
        <div class="chart-content" ref="operatingCashFlowChart"></div>
      </div>
      <div class="chart-item">
        <div class="chart-title">投资和筹资现金流量</div>
        <div class="chart-content" ref="investmentFinancingCashFlowChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const operatingCashFlowChart = ref(null);
    const investmentFinancingCashFlowChart = ref(null);

    onMounted(() => {
      // 经营活动现金流量
      const operatingCashFlowOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['经营活动净现金流量']
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
            name: '经营活动净现金流量',
            type: 'line',
            stack: '总量',
            data: [100, 180, -230, 350, 500],
            itemStyle: {
              color: '#007aff'
            }
          }
        ]
      };
      const chart1 = echarts.init(operatingCashFlowChart.value);
      chart1.setOption(operatingCashFlowOption);

      // 投资和筹资现金流量
      const investmentFinancingCashFlowOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['投资现金流量', '筹资现金流量']
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
            name: '投资现金流量',
            type: 'bar',
            stack: '总量',
            data: [-50, -80, -60, -90, -70],
            itemStyle: {
              color: '#ffb900'
            }
          },
          {
            name: '筹资现金流量',
            type: 'bar',
            stack: '总量',
            data: [20, 30, 40, 50, 60],
            itemStyle: {
              color: '#007aff'
            }
          }
        ]
      };
      const chart2 = echarts.init(investmentFinancingCashFlowChart.value);
      chart2.setOption(investmentFinancingCashFlowOption);
    });

    return {
      operatingCashFlowChart,
      investmentFinancingCashFlowChart
    };
  }
}
</script>

<style>
.cash-flow-analysis-container {
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
  width: 600px;
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