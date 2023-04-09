
<template>
  <div class="performance-page">
    <div style="float: left;margin-bottom: 20px">
      <el-button type="primary" :icon="Plus" @click="addAppointment">新增绩效考核标准</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="指标名称"></el-table-column>
      <el-table-column prop="weight" label="权重"></el-table-column>
<!--      <el-table-column prop="score" label="得分"></el-table-column>-->
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="" label="操作">
        <template #default="{row}">
        <el-button size="small" type="text" @click="editAppointment(row)">编辑</el-button>
        <el-button size="small" type="text" @click="cancelAppointment(row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog v-model="dialogVisible" title="添加/编辑考核标准">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="指标名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="权重" prop="date">
          <el-input v-model="formData.weight"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="date">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- 取消添加或编辑 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 确认添加或编辑 -->
        <el-button type="primary" @click="">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="cancelDialogVisible" title="删除考核标准">
      <div style="margin-bottom: 20px;font-size: 18px">确定要删除此考核标准吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消删除考核标准 -->
    <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <!-- 确认删除考核标准 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';

const dialogVisible = ref(false);
const cancelDialogVisible = ref(false);
const formData = ref({}); // 添加或编辑考核标准的表单数据
const formRules = ref({
  name: [
    { required: true, message: '考核标准不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '得分码不能为空', trigger: 'blur' },
  ]
}); // 添加或编辑考核标准的表单验证规则

function editAppointment(appointment) {
  formData.value = { ...appointment };
  dialogVisible.value = true;
}

function cancelAppointment(appointment) {
  cancelDialogVisible.value = true;
  formData.value = { ...appointment };
}


const addAppointment = () => {
  dialogVisible.value = true;
  formData.value = {};
}
    const tableData = [
      { name: '工作量', weight: 0.3, score: 85, remark: '完成任务数' },
      { name: '质量', weight: 0.4, score: 90, remark: '代码规范性等' },
      { name: '沟通协作', weight: 0.2, score: 80, remark: '与团队成员沟通协作能力' },
      { name: '创新能力', weight: 0.1, score: 70, remark: '提出创新想法和解决方案的能力' },
      { name: '学习能力', weight: 0.1, score: 95, remark: '学习和掌握新技术的速度和能力' }
    ];

    const chartInstance = ref(null);

    const initChart = () => {
      const chartDom = document.querySelector('.chart-container');
      chartInstance.value = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: ['工作量', '质量', '沟通协作', '创新能力', '学习能力']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0.3,0.4, 0.2, 0.1, 0.1],
          type: 'bar'
        }]
      };
      chartInstance.value.setOption(option);
    };

    const handleResize = () => {
      if (chartInstance.value) {
        chartInstance.value.resize();
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
</script>

<style scoped>
.performance-page {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  padding: 20px;
}
.chart-container {
  width: 80%;
  height: 400px;
  margin-top: 20px;
}
</style>