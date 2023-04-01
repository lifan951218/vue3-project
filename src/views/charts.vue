<template>
	<div class="container">
		<div class="schart-box">
<!--			<div class="content-title">柱状图</div>-->
<!--			<schart class="schart" canvasId="bar" :options="options1"></schart>-->
		</div>
		<div class="schart-box">
<!--			<div class="content-title">折线图</div>-->
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</div>
		<div class="schart-box">
<!--			<div class="content-title">饼状图</div>-->
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</div>
		<div class="schart-box">
<!--			<div class="content-title">环形图</div>-->
			<schart class="schart" canvasId="ring" :options="options4"></schart>
		</div>
	</div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';
import {reactive} from "_vue@3.2.47@vue";

const options2 = {
  type: 'line',
  title: {
    text: '过去7天产品检测合格率趋势'
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
      label: '自有产品',
      data: [
        85.2,
        85.3,
        89.5,
        95.6,
        95.7,
        95.8,
        95.9
      ]
    },
    {
      label: '外部产品',
      data: [72.4,  72.5, 78.6, 82.7, 82.8, 82.9, 83.2]
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
