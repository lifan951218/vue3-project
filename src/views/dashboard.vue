<template>

  <div class="overview">

    <div class="card-row">

      <el-card class="card-item" :body-style="{ padding: '20px' }">

        <div class="card-title">

          经营概况
        </div>

        <div class="card-content">

<span>

近30天销售额：
</span>

          {{ sales }}元
          <br />

          <span>

近30天成本：
</span>

          {{ cost }}元
          <br />

          <span>

近30天净利润：
</span>

          {{ profit }}元
        </div>

      </el-card>

      <el-card class="card-item" :body-style="{ padding: '20px' }">

        <div class="card-title">

          收入分析
        </div>

        <div class="card-content">

          <div ref="incomeChart" class="chart">

          </div>

        </div>

      </el-card>

      <el-card class="card-item" :body-style="{ padding: '20px' }">

        <div class="card-title">

          成本分析
        </div>

        <div class="card-content">

          <div ref="costChart" class="chart">

          </div>

        </div>

      </el-card>

    </div>

  </div>

</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'Overview',
  data() {
    return {
      sales: 0,
      cost: 0,
      profit: 0,
    };
  },
  mounted() {
    this.renderIncomeChart();
    this.renderCostChart();
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 模拟获取数据
      // 近30天销售额
      const salesData = [120000, 150000, 100000, 180000, 140000];
      this.sales = this.formatNumber(salesData.reduce((acc, cur) => acc + cur, 0));
      // 近30天成本
      const costData = [50000, 70000, 40000, 80000, 60000];
      this.cost = this.formatNumber(costData.reduce((acc, cur) => acc + cur, 0));
      // 近30天净利润
      this.profit = this.formatNumber(salesData.reduce((acc, cur, index) => acc + (cur - costData[index]), 0));
    },
    formatNumber(value) {
      return value.toLocaleString('en-US');
    },
    renderIncomeChart() {
      const incomeChart = echarts.init(this.$refs.incomeChart);
      incomeChart.setOption({
        title: {
          text: '收入趋势',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['销售额'],
          bottom: 10,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'],
        },
        yAxis: [
          {
            name: '销售额（元）',
            type: 'value',
            position: 'left',
          },
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            data: [10000, 12000, 8000, 15000, 14000],
          },
        ],
      });
    },
    renderCostChart() {
      const costChart = echarts.init(this.$refs.costChart);
      costChart.setOption({
        title: {
          text: '成本趋势',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['成本'],
          bottom: 10,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-01-01', '2022-01-02', '2022-01-03', '2022-01-04', '2022-01-05'],
        },
        yAxis: [
          {
            name: '成本（元）',
            type: 'value',
            position:'left',
    },
    ],
      series: [
        {
          name: '成本',
          type: 'line',
          data: [5000, 6000, 4000, 7500, 7000],
        },
      ],
    });
    },
  },
};

</script>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
}
.card-item {
  width: calc(33.33% - 10px);
  border-radius: 4px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 18px;
  font-weight: bold;
  padding: 20px;
  background-color: #f5f7fa;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.card-content {
  padding: 20px;
}
.chart {
  height: 300px;
  width: 100%;
}
</style>