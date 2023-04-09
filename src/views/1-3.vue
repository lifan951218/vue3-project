<template>
  <div class="cost-analysis">
    <h1>成本分析</h1>
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

    // 假设有三项成本，分别为材料、工资和运输
    const data1 = [
      { name: '月份1', 材料成本: 1000, 工资成本: 2000, 运输成本: 500 },
      { name: '月份2', 材料成本: 1500, 工资成本: 1200, 运输成本: 800 },
      { name: '月份3', 材料成本: 2000, 工资成本: 3000, 运输成本: 600 }
    ];

    // 假设有三种产品，成本分别为1000、2000、3000
    const data2 = [
      { name: '产品A', 成本: 1000 },
      { name: '产品B', 成本: 2000 },
      { name: '产品C', 成本: 3000 }
    ];

    onMounted(() => {
      const chartObj1 = echarts.init(chart1.value);
      const chartObj2 = echarts.init(chart2.value);

      const option1 = {
        legend: {
          data: ['材料成本', '工资成本', '运输成本']
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
            name: '材料成本',
            data: data1.map(item => item.材料成本),
            type: 'bar',
            stack: '总量'
          },
          {
            name: '工资成本',
            data: data1.map(item => item.工资成本),
            type: 'bar',
            stack: '总量'
          },
          {
            name: '运输成本',
            data: data1.map(item => item.运输成本),
            type: 'bar',
            stack: '总量'
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
          data: data2.map(item => item.成本),
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
.cost-analysis {
  padding: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  padding-right: 20px;
}

@media screen and (max-width: 768px) {
  .el-col {
    padding-right: 0;
  }
}

.chart {
  width: 100%;
  height: 500px;
}
</style>