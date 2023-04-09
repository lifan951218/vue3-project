<template>
  <div class="income-analysis">
    <h1>收入分析</h1>
    <el-row>
      <el-col :span="12"><div ref="chart1" class="chart"></div></el-col>
      <el-col :span="12"><div ref="chart2" class="chart"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const chart1 = ref(null);
    const chart2 = ref(null);

    // 假设有三个部门，收入来源分别为销售、租金、广告
    const data1 = [
      { name: '部门 A', sales: 1000, rent: 2000, ads: 500 },
      { name: '部门 B', sales: 1500, rent: 1200, ads: 800 },
      { name: '部门 C', sales: 2000, rent: 3000, ads: 600 }
    ];

    // 假设有三家店铺，收入分别为1000、2000、3000
    const data2 = [
      { name: '店铺 A', value: 1000 },
      { name: '店铺 B', value: 2000 },
      { name: '店铺 C', value: 3000 }
    ];

    onMounted(() => {
      const chartObj1 = echarts.init(chart1.value);
      const chartObj2 = echarts.init(chart2.value);

      const option1 = {
        legend: {
          data: ['Sales', 'Rent', 'Ads']
        },
        xAxis: {
          type: 'category',
          data: data1.map(item => item.name)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Sales',
            data: data1.map(item => item.sales),
            type: 'bar',
            stack: 'total'
          },
          {
            name: 'Rent',
            data: data1.map(item => item.rent),
            type: 'bar',
            stack: 'total'
          },
          {
            name: 'Ads',
            data: data1.map(item => item.ads),
            type: 'bar',
            stack: 'total'
          }
        ]
      };

      const option2 = {
        xAxis: {
          type: 'category',
          data: data2.map(item => item.name)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data2.map(item => item.value),
          type: 'bar'
        }]
      };

      chartObj1.setOption(option1);
      chartObj2.setOption(option2);
    });

    return {
      chart1,
      chart2
    };
  }
}
</script>

<style scoped>
.income-analysis {
  padding: 20px;
}

.chart {
  width: 100%;
  height: 500px;
}
</style>