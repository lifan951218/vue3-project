<template>
  <div>
    <h2>客户行为分析</h2>
    <div class="chart-container">
      <div class="chart-item">
        <h3>月活跃用户数</h3>
        <div ref="lineChart" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>用户地域分布</h3>
        <div ref="barChart" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>用户来源渠道</h3>
        <div ref="pieChart" class="chart"></div>
      </div>
      <div class="chart-item">
        <h3>用户留存率</h3>
        <div ref="scatterChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const lineChart = ref(null);
    const barChart = ref(null);
    const pieChart = ref(null);
    const scatterChart = ref(null);

    const initLineChart = () => {
      const chart = echarts.init(lineChart.value);
      chart.setOption({
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1200, 1500, 1800, 2000, 2200, 2400],
          type: 'line'
        }]
      });
    };

    const initBarChart = () => {
      const chart = echarts.init(barChart.value);
      chart.setOption({
        xAxis: {
          type: 'category',
          data: ['北京', '上海', '广州', '深圳', '杭州']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1200, 800, 500, 300, 200],
          type: 'bar'
        }]
      });
    };

    const initPieChart = () => {
      const chart = echarts.init(pieChart.value);
      chart.setOption({
        series: [{
          type: 'pie',
          data: [
            { name: '搜索引擎', value: 335 },
            { name: '直接访问', value: 310 },
            { name: '邮件营销', value: 234 },
            { name: '联盟广告', value: 135 },
            { name: '视频广告', value: 1548 }
          ]
        }]
      });
    };

    const initScatterChart = () => {
      const chart = echarts.init(scatterChart.value);
      chart.setOption({
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'scatter',
          symbolSize: 10,
          data: [
            [10, 20],
            [30, 40],
            [50, 60],
            [70, 80],
            [90, 100]
          ]
        }]
      });
    };

    onMounted(() => {
      initLineChart();
      initBarChart();
      initPieChart();
      initScatterChart();
    });

    return {
      lineChart,
      barChart,
      pieChart,
      scatterChart
    };
  }
}
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
}

.chart-item {
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
}

.chart {
  height: 300px;
  border: 1px solid #ccc;
}
</style>