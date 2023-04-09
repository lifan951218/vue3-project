<template>

  <div class="result-page">

    <!-- 考核结果表格 -->

    <el-card class="result-card" shadow="hover">

      <h2 class="card-header">

        绩效考核结果
      </h2>

      <el-table :data="tableData" border :row-class-name="tableRowClassName">

        <el-table-column prop="name" label="姓名">

        </el-table-column>

        <el-table-column prop="department" label="部门">

        </el-table-column>

        <el-table-column prop="jobTitle" label="岗位">

        </el-table-column>

        <el-table-column prop="selfEvaluation" label="自我评价" :min-width="120">

        </el-table-column>

        <el-table-column prop="leaderEvaluation" label="上级评价" :min-width="120">

        </el-table-column>

        <el-table-column prop="HREvaluation" label="HR评价" :min-width="120">

        </el-table-column>

        <el-table-column prop="committeeEvaluation" label="委员会评价" :min-width="120">

        </el-table-column>

        <el-table-column prop="finalScore" label="最终得分" :min-width="100" class-name="score-column">

        </el-table-column>

      </el-table>

    </el-card>

    <!-- 绩效等级标准 -->
    <el-card class="standard-card" shadow="hover">
      <h2 class="card-header">绩效等级标准</h2>
      <el-table :data="levelData" border>
        <el-table-column prop="level" label="等级"></el-table-column>
        <el-table-column prop="scoreRange" label="得分范围"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
      </el-table>
    </el-card>

    <!-- 考核结果分析 -->
    <el-card class="analysis-card" shadow="hover">
      <h2 class="card-header">考核结果分析</h2>
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
    const tableData = ref([
      {
        name: '张三',
        department: '技术部',
        jobTitle: '前端工程师',
        selfEvaluation: 80,
        leaderEvaluation: 85,
        HREvaluation: 90,
        committeeEvaluation: 95
      },
      {
        name: '李四',
        department: '市场部',
        jobTitle: '销售经理',
        selfEvaluation: 75,
        leaderEvaluation: 80,
        HREvaluation: 85,
        committeeEvaluation: 90
      },
      {
        name: '王五',
        department: '运营部',
        jobTitle: '运营经理',
        selfEvaluation: 85,
        leaderEvaluation: 90,
        HREvaluation: 90,
        committeeEvaluation: 95
      }
    ]);

    const levelData = ref([
      {
        level: '优秀',
        scoreRange: '90-100',
        description: '表现极为出色，业绩突出，具有明显的领导潜力和创新能力。'
      },
      {
        level: '良好',
        scoreRange: '80-89',
        description: '表现较好，业绩稳定，能够完成工作任务，有一定的管理和沟通能力。'
      },
      {
        level: '合格',
        scoreRange: '70-79',
        description: '表现一般，业绩达到基本要求，需提高综合素质和专业技能。'
      },
      {
        level: '待改进',
        scoreRange: '60-69',
        description: '表现不佳，业绩未达到基本要求，需要加强自我发展和学习。'
},
    {
      level: '不合格',
          scoreRange: '0-59',
        description: '表现非常差，业绩未达到基本要求，需重新评估工作能力和职业素养。'
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

    onMounted(initChart);

    const tableRowClassName = ({ row }) => {
      const score = row.finalScore;
      if (score >= 90) {
        return 'excellent-row';
      } else if (score >= 80) {
        return 'good-row';
      } else if (score >= 70) {
        return 'qualified-row';
      } else {
        return 'improvement-needed-row';
      }
    };

    return {
      tableData,
      levelData,
      tableRowClassName
    };
  }
};

</script>

<style scoped>
.result-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.result-card,
.standard-card,
.analysis-card {
  width: 80%;
  margin-top: 20px;
}
.card-header {
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
  background-color: #f5f7fa;
}
.el-table__body td.score-column {
  font-weight: bold;
}
.excellent-row {
  background-color: #d6f5d6 !important;
}
.good-row {
  background-color: #e8f6d9 !important;
}
.qualified-row {
  background-color: #fff2cc !important;
}
.improvement-needed-row {
  background-color: #ffd9b3 !important;
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