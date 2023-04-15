<template>
  <div class="income-analysis">
    <h3 style="margin-bottom: 20px">封禁用户</h3>
    <el-form :model="formData" :rules="formRules">
      <el-form-item label="选择用户" prop="name">
        <el-select v-model="formData.name" placeholder="请选择">
          <el-option key="小明" label="小明" value="小明"></el-option>
          <el-option key="小红" label="小红" value="小红"></el-option>
          <el-option key="小白" label="小白" value="小白"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封禁时长" prop="name">
        <el-select v-model="formData.name" placeholder="请选择">
          <el-option key="小明" label="小明" value="小明"></el-option>
          <el-option key="小红" label="小红" value="小红"></el-option>
          <el-option key="小白" label="小白" value="小白"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <!-- 取消添加或编辑 -->
      <el-button @click="dialogVisible = false">取消</el-button>
      <!-- 确认添加或编辑 -->
      <el-button type="primary" @click="">封禁</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';


const formData = ref({}); // 添加或编辑礼物的表单数据
const formRules = ref({
  name: [
    { required: true, message: '礼物不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '观看人数码不能为空', trigger: 'blur' },
  ]
});
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