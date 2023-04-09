<template>

  <div class="monthly-page">

    <!-- 目标与完成率 -->

    <el-card class="goal-card" shadow="hover">

      <h2 class="card-header">

        目标与完成率
      </h2>

      <el-form :model="goalForm" label-width="100px" class="goal-form">

        <el-form-item label="目标名称">

          <el-input v-model="goalForm.name" disabled>

          </el-input>

        </el-form-item>

        <el-form-item label="目标描述">

          <el-input type="textarea" v-model="goalForm.description" disabled rows="4">

          </el-input>

        </el-form-item>

        <el-row>

          <el-col :span="12">

            <div class="index-item">

              <p>

                完成率
              </p>

              <h3>

                {{ goalForm.progress }}%
              </h3>

            </div>

          </el-col>

          <el-col :span="12">

            <div class="index-item">

              <p>

                绩效得分
              </p>

              <h3>

                {{ goalForm.score }}
              </h3>

            </div>

          </el-col>

        </el-row>

      </el-form>

      <el-progress :percentage="goalForm.progress" color="#67C23A" style="margin-top: 20px;">

      </el-progress>

    </el-card>

    <!-- 完成情况 -->
    <el-card class="progress-card" shadow="hover">
      <h2 class="card-header">完成情况</h2>
      <el-table :data="progressData" border>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="actualProgress" label="实际完成率" :min-width="120">
          <template #default="scope">
            {{scope.row.actualProgress}}%
          </template>
        </el-table-column>
        <el-table-column prop="problem" label="存在问题" :min-width="120"></el-table-column>
        <el-table-column prop="solution" label="解决方案" :min-width="120"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-card>

    <!-- 绩效得分详情 -->
    <el-card class="score-card" shadow="hover">
      <h2 class="card-header">绩效得分详情</h2>
      <div class="chart-container">
        <div ref="chart1" class="echarts-chart"></div>
        <div ref="chart2" class="echarts-chart"></div>
      </div>
    </el-card>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const goalForm = ref({
      name: '开发新功能',
      description: '为了提高用户体验，我们计划上线一个全新的XXX功能。',
      progress: 80,
      score: 85
    });

    const formatPercent = (val) => `${val}%`;

    const progressData = ref([
      {
        date: '2022-01-01',
        actualProgress: 20,
        problem: '技术难点太多',
        solution: '增强团队协作，加强学习和交流',
        remark: ''
      },
      {
        date: '2022-01-10',
        actualProgress: 50,
        problem: '需求变化频繁',
        solution: '与业务部门沟通，及时调整开发计划',
        remark: ''
      },
      {
        date: '2022-01-20',
        actualProgress: 80,
        problem: '',
        solution: '',
        remark: ''
      },
      {
        date: '2022-01-31',
        actualProgress: 100,
        problem: '',
        solution: '',
        remark: ''
      }
    ]);

    const initChart = () => {
      const chart1Dom = document.querySelector('.echarts-chart:nth-of-type(1)');
      const chart2Dom = document.querySelector('.echarts-chart:nth-of-type(2)');
      const chart1Instance = echarts.init(chart1Dom);
      const chart2Instance = echarts.init(chart2Dom);

      const option1 = {
        tooltip: {
          trigger: 'axis'
        },
      xAxis: {
        type: 'category',
            data: ['技术部', '市场部', '运营部']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          name: '自我评价',
          data: [80, 75, 85]
        },
        {
          type: 'bar',
          name: '上级评价',
          data: [85, 80, 90]
        },
        {
          type: 'bar',
          name: 'HR评价',
          data: [90, 85, 90]
        },
        {
          type: 'bar',
          name: '委员会评价',
          data: [95, 90, 95]
        }
      ]
    };

      const option2 = {
        title: {
          text: '部门得分占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['技术部', '市场部', '运营部']
        },
        series: [
          {
            name: '得分占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '技术部' },
              { value: 310, name: '市场部' },
              { value: 234, name: '运营部' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      chart1Instance.setOption(option1);
      chart2Instance.setOption(option2);
    };

    onMounted(() => {
      initChart();
    });

    return {
      goalForm,
      progressData,
      formatPercent
    };
  }
};

</script>

<style scoped>
.monthly-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.goal-card,
.progress-card,
.score-card {
  width: 80%;
  margin-top: 20px;
}
.card-header {
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f5f7fa;
}
.goal-form {
  margin-top: 20px;
}
.index-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}
.index-item h3 {
  margin-top: 10px;
  font-size: 32px;
  font-weight: bold;
}
.chart-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.echarts-chart {
  width: 48%;
  height: 400px;
}
</style>