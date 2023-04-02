<template>
  <div class="container">
    <div class="schart-box">
      <!--			<div class="content-title">折线图</div>-->
      <schart class="schart" canvasId="line" :options="options2"></schart>
    </div>
  </div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';
import {reactive} from "_vue@3.2.47@vue";

const incomeData = [100, 200, 300, 400, 500, 600];
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const options2 = {
  type: 'line',
  title: {
    text: '过去7天服务收入趋势'
  },
  labels: [
    '10-24',
    '10-25',
    '10-26',
    '10-27',
    '10-28',
    '10-29',
    '10-30'
  ],
  datasets: [
    {
      label: '理发',
      data: [
        852,
        853,
        895,
        956,
        957,
        958,
        959
      ]
    },
    {
      label: '洗头',
      data: [724,  725, 786, 827, 828, 829, 832]
    },
    {
      label: '洗头',
      data: [224,  225, 286, 327, 328, 329, 332]
    },
    {
      label: '洗头',
      data: [324,  325, 386, 427, 428, 429, 432]
    }
  ]
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
