<template>

  <div class="process-page">

    <!-- 步骤条 -->

    <el-steps :active="activeStep" finish-status="success" align-center>

      <el-step v-for="(step, index) in processSteps" :key="index" :title="step.title">

      </el-step>

    </el-steps>

    <!-- 第一步：提交自评 -->
    <el-collapse v-model="activeCollapse" accordion>
      <el-collapse-item title="提交自评" name="step-1">
        <div class="collapse-content">
          <p>请输入您的自我评价：</p>
          <el-input v-model="selfEvaluation" type="textarea" :rows="6" placeholder="请输入自我评价"></el-input>
          <div class="btn-group">
            <el-button type="primary" @click="nextStep">提交</el-button>
          </div>
        </div>
      </el-collapse-item>

      <!-- 第二步：上级审批 -->
      <el-collapse-item title="上级审批" name="step-2">
        <div class="collapse-content">
          <p>请等待您的上级审批：</p>
          <el-alert class="alert" title="正在审批中，请稍后..." type="warning"></el-alert>
        </div>
      </el-collapse-item>

      <!-- 第三步：HR面谈 -->
      <el-collapse-item title="HR面谈" name="step-3">
        <div class="collapse-content">
          <h3>HR小姐姐与您进行面谈</h3>
          <p>您对自己的评价有什么想法？有哪些可以改进的地方？请畅所欲言。</p>
          <el-input v-model="selfEvaluation" type="textarea" :rows="6" placeholder="请输入自我评价"></el-input>
          <p class="mt-2">聊完以后，HR小姐姐会给您提供一些建议和帮助。</p>
          <div class="btn-group">
            <el-button type="primary" @click="nextStep">提交</el-button>
          </div>
        </div>
      </el-collapse-item>

      <!-- 第四步：绩效考核委员会评定 -->
      <el-collapse-item title="绩效考核委员会评定" name="step-4">
        <div class="collapse-content">
          <h3>绩效考核委员会正在评定中</h3>
          <div ref="chartContainer" class="chart-container"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>


<script>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const activeStep = ref(0);

    const processSteps = [
      { title: '提交自评' },
      { title: '上级审批' },
      { title: 'HR面谈' },
      { title: '绩效考核委员会评定' }
    ];

    const activeCollapse = ref(['step-1']);

    const selfEvaluation = ref('');

    const chartInstance = ref(null);

    const initChart = () => {
      const chartDom = document.querySelector('.chart-container');
      chartInstance.value = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
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
              { value: 80, name: '自评' },
              { value: 60, name: '上级审批' },
              { value: 40, name: 'HR面谈' },
              { value: 20, name: '委员会评定' }
    ]
    }
    ]
    };
      chartInstance.value.setOption(option);
    };

    const handleResize = () => {
      if (chartInstance.value) {
        chartInstance.value.resize();
      }
    };

    const nextStep = () => {
      if (activeStep.value < processSteps.length - 1) {
        activeStep.value += 1;
        activeCollapse.value.push(`step-${activeStep.value + 1}`);
        if (activeStep.value === processSteps.length - 1) {
          // 最后一步，显示评定结果图表
          initChart();
          window.addEventListener('resize', handleResize);
        }
      }
    };

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      activeStep,
      processSteps,
      activeCollapse,
      selfEvaluation,
      chartInstance,
      nextStep
    };
  }
};

</script>

<style scoped>
.process-page {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  padding: 20px;
}
.collapse-content {
  padding: 10px;
}
.btn-group {
  margin-top: 10px;
  text-align: right;
}
.alert {
  margin-top: 10px;
}
.chart-container {
  width: 80%;
  height: 400px;
  margin-top: 20px;
}
</style>