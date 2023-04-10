<template>
  <div>
    <h2>手动输入数据</h2>
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="name" style="width: 400px">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="formData.age"></el-input-number>
      </el-form-item>
      <el-form-item label="职业" prop="job"  style="width: 400px">
        <el-input v-model="formData.job"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <div style="height: 400px;">
      <div class="chart-content" ref="channelSatisfactionChart">
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
// import { ElForm, ElFormItem, ElInput, ElInputNumber, ElButton } from 'element-plus';
import * as echarts from 'echarts';

const channelSatisfactionChart = ref(null);

    const formData = reactive({
      name: '',
      age: 0,
      job:  ''
    });

    const rules = {
      name: [{ required: true, message: '请输入姓名' }],
      age: [{ required: true, message: '请输入年龄' }]
    };

    const chartOptions = reactive({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['年龄']
      },
      series: [
        {
          name: '年龄',
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
          data: []
        }
      ]
    });

    const submitForm = () => {
      chartOptions.series[0].data.push({
        value: formData.age,
        name: formData.name
      });
      init()
      // // 清空表单数据
      // formData.name = '';
      // formData.age = 0;
      // // 表单验证通过
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //
      //   } else {
      //     return false;
      //   }
      // });
    };
const init = () => {
  // 初始化echarts图表
  const chart2 = echarts.init(channelSatisfactionChart.value);
  chart2.setOption(chartOptions);
}

  onMounted(() => {
    init()
  })

</script>
<style scoped>
.chart-content {
  height: 400px;
}
</style>