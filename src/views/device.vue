<template>

  <div class="container">

    <el-form ref="form" :model="formData" :rules="formRules" label-width="120px">

      <el-form-item label="市场容量">

        <el-select v-model="formData.marketCapacity" placeholder="请选择市场容量">

          <el-option v-for="capacity in capacityOptions" :key="capacity" :label="capacity" :value="capacity" />

        </el-select>

      </el-form-item>

      <el-form-item label="年增长率">

        <el-select v-model="formData.growthRate" placeholder="请选择年增长率">

          <el-option v-for="rate in growthRateOptions" :key="rate" :label="rate" :value="rate" />

        </el-select>

      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="generateChart">生成图表</el-button>

      </el-form-item>

    </el-form>

    <div class="chart-container">

      <div ref="totalMarketChart" class="chart">

      </div>

      <div ref="marketShareChart" class="chart">

      </div>

    </div>

  </div>

</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const formData = ref({
      marketCapacity: null,
      growthRate: null
    });

    const formRules = {
      marketCapacity: [
        { required: true, message: '请选择市场容量', trigger: 'change' }
      ],
      growthRate: [
        { required: true, message: '请选择年增长率', trigger: 'change' }
      ]
    };

    const capacityOptions = ['1000万', '5000万', '1亿', '5亿', '10亿'];
    const growthRateOptions = ['5%', '10%', '15%', '20%', '25%'];

    const totalMarketChart = ref(null);
    const marketShareChart = ref(null);

    let totalMarketChartInstance = null;
    let marketShareChartInstance = null;

    const generateChart = () => {
      if (totalMarketChartInstance) {
        totalMarketChartInstance.dispose();
      }
      if (marketShareChartInstance) {
        marketShareChartInstance.dispose();
      }

      totalMarketChartInstance = echarts.init(totalMarketChart.value);
      marketShareChartInstance = echarts.init(marketShareChart.value);

      const marketCapacity = parseInt(formData.value.marketCapacity.replace(/[^0-9]/gi, ''));
      const growthRate = parseInt(formData.value.growthRate.replace('%', '')) / 100;

      const data = [];
      const years = [];
      let marketSize = marketCapacity;
      for (let i = 0; i < 5; i++) {
        years.push((new Date().getFullYear() + i).toString());
        data.push(marketSize);
        marketSize *= (1 + growthRate);
      }

      totalMarketChartInstance.setOption({
        title: {
          text: '总市场规模时间折线图'
        },
        xAxis: {
          type: 'category',
          data: years
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data,
          type: 'line'
        }]
      });

      marketShareChartInstance.setOption({
        title: {
          text: '竞争对手市场份额和公司市场份额饼状图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
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
              { value: marketCapacity * 0.2, name: '竞争对手市场份额' },
              { value: marketCapacity * 0.8, name: '公司市场份额' }
            ]
          }
        ]
      });
    };

    // onMounted(() => {
    //   generateChart();
    // });

    return {
      formData,
      formRules,
      capacityOptions,
      growthRateOptions,
      totalMarketChart,
      marketShareChart,
      generateChart
    };
  }
}
</script>


<style scoped>
.market-size-analysis-container {
display: flex;
flex-direction: column;
align-items: center;
}

.el-form-item__label {
width: 120px;
}

.chart-container {
display: flex;
justify-content: space-between;
width: 100%;
margin-top: 20px;
}

.chart {
height: 300px;
width: 48%;
}
</style>