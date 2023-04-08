<template>

  <div class="purchase-demand-analysis-container">
    <div class="analysis-form">

      <el-form :model="form" inline>

        <el-form-item label="采购部门">

          <el-select v-model="form.department" placeholder="请选择采购部门">

            <el-option label="部门1" value="1">

            </el-option>

            <el-option label="部门2" value="2">

            </el-option>

            <el-option label="部门3" value="3">

            </el-option>

          </el-select>

        </el-form-item>

        <el-form-item label="采购时间">

          <el-date-picker v-model="form.purchaseTime" type="daterange">

          </el-date-picker>

        </el-form-item>

        <el-form-item>

          <el-button type="primary" @click="handleAnalysis">分析
          </el-button>

        </el-form-item>

      </el-form>

    </div>

    <div class="chart-row">

      <div class="chart-item">

        <div class="chart-title">

          采购计划金额占比
        </div>

        <div class="chart-content" ref="purchasePlanAmountRatioChart">

        </div>

      </div>

      <div class="chart-item">

        <div class="chart-title">

          采购品类金额统计
        </div>

        <div class="chart-content" ref="purchaseCategoryAmountChart">

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import { ElForm, ElFormItem, ElSelect, ElOption, ElDatePicker, ElButton } from 'element-plus';

export default {
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElButton
  },
  setup() {
    const form = reactive({
      department: '',
      purchaseTime: []
    });

    const purchasePlanAmountRatioChart = ref(null);
    const purchaseCategoryAmountChart = ref(null);

    const initCharts = () => {
      // 采购计划金额占比
      const purchasePlanAmountRatioOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['品类1', '品类2', '品类3', '品类4', '品类5']
        },
        series: [
          {
            name: '采购计划金额占比',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '品类1' },
              { value: 310, name: '品类2' },
              { value: 234, name: '品类3' },
              { value: 135, name: '品类4' },
              { value: 1548, name: '品类5' }
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
      const chart1 = echarts.init(purchasePlanAmountRatioChart.value);
      chart1.setOption(purchasePlanAmountRatioOption);

      // 采购品类金额统计
      const purchaseCategoryAmountOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['品类金额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['品类1', '品类2', '品类3', '品类4', '品类5']
    },
      series: [
        {
          name: '品类金额',
          type: 'bar',
          data: [320, 302, 301, 334, 390],
          itemStyle: {
            color: '#007aff'
          }
        }
      ]
    };
      const chart2 = echarts.init(purchaseCategoryAmountChart.value);
      chart2.setOption(purchaseCategoryAmountOption);
    }

    const handleAnalysis = () => {
      // 进行分析操作
      initCharts()
    };

    return {
      form,
      purchasePlanAmountRatioChart,
      purchaseCategoryAmountChart,
      handleAnalysis
    };
  }
}

</script>

<style scoped>
.purchase-demand-analysis-container {
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
  height: 300px;
}

.analysis-form {
  margin-bottom: 20px;
}
</style>