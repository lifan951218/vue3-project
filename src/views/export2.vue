<template>

  <div class="container">

    <div class="row">

      <div class="col">

        <el-card>

          <p slot="header">

            销售额分布
          </p>

          <div ref="saleAmountChart" class="chart">

          </div>

        </el-card>

      </div>

      <div class="col">

        <el-card>

          <p slot="header">

            订单量分布
          </p>

          <div ref="orderCountChart" class="chart">

          </div>

        </el-card>

      </div>

    </div>

    <div class="row">

      <div class="col">

        <el-card>

          <p slot="header">

            渠道占比
          </p>

          <div ref="channelRatioChart" class="chart">

          </div>

        </el-card>

      </div>

      <div class="col">

        <el-card>

          <p slot="header">

            转化率趋势
          </p>

          <div ref="conversionRateTrendChart" class="chart">

          </div>

        </el-card>

      </div>

    </div>

    <div class="row">

      <div class="col">

        <el-card>

          <p slot="header">

            各渠道销售额对比
          </p>

          <div ref="saleAmountComparisonChart" class="chart">

          </div>

        </el-card>

      </div>

      <div class="col">

        <el-card>

          <p slot="header">

            各渠道订单量对比
          </p>

          <div ref="orderCountComparisonChart" class="chart">

          </div>

        </el-card>

      </div>

    </div>

  </div>

</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const saleAmountChart = ref(null);
    const orderCountChart = ref(null);
    const channelRatioChart = ref(null);
    const conversionRateTrendChart = ref(null);
    const saleAmountComparisonChart = ref(null);
    const orderCountComparisonChart = ref(null);

    let saleAmountChartInstance = null;
    let orderCountChartInstance = null;
    let channelRatioChartInstance = null;
    let conversionRateTrendChartInstance = null;
    let saleAmountComparisonChartInstance = null;
    let orderCountComparisonChartInstance = null;

    const initSaleAmountChart = () => {
      if (!saleAmountChartInstance) {
        saleAmountChartInstance = echarts.init(saleAmountChart.value);
      }
      saleAmountChartInstance.resize();
      saleAmountChartInstance.setOption({
        xAxis: {
          type: 'category',
          data: ['线上', '线下']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [1200, 800],
          type: 'bar'
        }]
      });
    };

    const initOrderCountChart = () => {
      if (!orderCountChartInstance) {
        orderCountChartInstance = echarts.init(orderCountChart.value);
      }
      orderCountChartInstance.resize();
      orderCountChartInstance.setOption({
        series: [{
          type: 'pie',
          data: [
            { name: '线上', value: 335 },
            { name: '线下', value: 310 }
          ]
        }]
      });
    };

    const initChannelRatioChart = () => {
      if (!channelRatioChartInstance) {
        channelRatioChartInstance = echarts.init(channelRatioChart.value);
      }
      channelRatioChartInstance.resize();
      channelRatioChartInstance.setOption({
        series: [{
          type: 'pie',
          data: [
            { name: '线上', value: 335 },
            { name: '线下', value: 310 }
          ]
        }]
      });
    };

    const initConversionRateTrendChart = () => {
      if (!conversionRateTrendChartInstance) {
        conversionRateTrendChartInstance = echarts.init(conversionRateTrendChart.value);
      }
      conversionRateTrendChartInstance.resize();
      conversionRateTrendChartInstance.setOption({
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [30, 36, 42, 48, 54, 60],
      type: 'line'
    }]
    });
    };

    const initSaleAmountComparisonChart = () => {
      if (!saleAmountComparisonChartInstance) {
        saleAmountComparisonChartInstance = echarts.init(saleAmountComparisonChart.value);
      }
      saleAmountComparisonChartInstance.resize();
      saleAmountComparisonChartInstance.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '线上', '线下'],
          source: [
            { product: '商品A', '线上': 43.3, '线下': 85.8 },
            { product: '商品B', '线上': 83.1, '线下': 73.4 },
            { product: '商品C', '线上': 86.4, '线下': 65.2 },
            { product: '商品D', '线上': 72.4, '线下': 53.9 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar', name: '线上' },
          { type: 'bar', name: '线下' }
        ]
      });
    };

    const initOrderCountComparisonChart = () => {
      if (!orderCountComparisonChartInstance) {
        orderCountComparisonChartInstance = echarts.init(orderCountComparisonChart.value);
      }
      orderCountComparisonChartInstance.resize();
      orderCountComparisonChartInstance.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '线上', '线下'],
          source: [
            { product: '商品A', '线上': 10, '线下': 22 },
            { product: '商品B', '线上': 20, '线下': 18 },
            { product: '商品C', '线上': 30, '线下': 14 },
            { product: '商品D', '线上': 40, '线下': 10 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar', name: '线上' },
          { type: 'bar', name: '线下' }
        ]
      });
    };

    onMounted(() => {
      initSaleAmountChart();
      initOrderCountChart();
      initChannelRatioChart();
      initConversionRateTrendChart();
      initSaleAmountComparisonChart();
      initOrderCountComparisonChart();
    });

    return {
      saleAmountChart,
      orderCountChart,
      channelRatioChart,
      conversionRateTrendChart,
      saleAmountComparisonChart,
      orderCountComparisonChart
    };
  }
}

</script>

<style>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.col {
  width: 48%;
}

.chart {
  height: 300px;
}
</style>