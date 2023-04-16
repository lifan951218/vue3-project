<template>
  <div class="income-analysis">
    <div>
      <el-image style="width: 600px; height: 400px" v-model:src="imgurl"></el-image>
    </div>
    <el-tabs v-model="message">
      <el-tab-pane label="发送弹幕" name="1">

        <el-form :model="formData" :rules="formRules">
          <el-form-item label="弹幕内容" prop="name">
            <el-input type="textarea" :rows="3" v-model="formData.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <!-- 取消添加或编辑 -->
          <el-button @click="dialogVisible = false">取消</el-button>
          <!-- 确认添加或编辑 -->
          <el-button type="primary" @click="">发送</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发送礼物" name="2">

        <el-form :model="formData" :rules="formRules">
          <el-form-item label="礼物" prop="region">
            <el-select v-model="formData.region" placeholder="请选择">
              <el-option key="小明" label="小明" value="小明"></el-option>
              <el-option key="小红" label="小红" value="小红"></el-option>
              <el-option key="小白" label="小白" value="小白"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" prop="name">
            <el-input-number v-model="formData.num"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <!-- 取消添加或编辑 -->
          <el-button @click="dialogVisible = false">取消</el-button>
          <!-- 确认添加或编辑 -->
          <el-button type="primary" @click="">赠送</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import imgurl from '../assets/img/zhibo2.jpeg';

const message = ref("1");

const formData = ref({}); // 添加或编辑弹幕的表单数据
const formRules = ref({
  name: [
    { required: true, message: '弹幕不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '观看人数码不能为空', trigger: 'blur' },
  ]
});
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