<template>
  <div class="container">
    <div class="schart-box">
      			<div class="content-title">柱状图</div>
      			<schart class="schart" canvasId="bar" :options="options1"></schart>
    </div>
  </div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';
import {reactive} from "_vue@3.2.47@vue";

const serviceData = {
  labels: ['服务A', '服务B', '服务C', '服务D', '服务E'],
  datasets: [
    {
      data: [200, 300, 400, 500, 600],
      backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#e91e63'],
    },
  ],
};

const options1 = {
  type: 'bar',
  title: {
    text: '服务流行度对比统计'
  },
  xRorate: 25,
  labels: ['理发', '洗头', '染发', '烫发'],
  datasets: [
    {
      label: '',
      data: [234, 278, 270, 190, 230]
    }
  ]
};

const options2 = {
  title: {
    text: '最近一周短信回复情况'
  },
  xRorate: 25,
  labels: ['周一', '周二', '周三', '周四', '周五'],
  data: serviceData
};
const todoList = reactive([
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: false
  },
  {
    title: '今天要修复100个bug',
    status: true
  },
  {
    title: '今天要写100行代码加几个bug吧',
    status: true
  }
]);

const options3 = {
  type: 'pie',
  title: {
    text: '已完成检测产品质量饼状图'
  },
  legend: {
    position: 'left'
  },
  bgColor: '#fbfbfb',
  labels: ['合格', '待定', '不合格'],
  datasets: [
    {
      data: [364, 58, 12]
    }
  ]
};
const options4 = {
  type: 'ring',
  title: {
    text: '质量检测进度'
  },
  showValue: false,
  legend: {
    position: 'bottom',
    bottom: 40
  },
  bgColor: '#fbfbfb',
  labels: ['未完成', '已完成'],
  datasets: [
    {
      data: [500, 1546]
    }
  ]
};
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
