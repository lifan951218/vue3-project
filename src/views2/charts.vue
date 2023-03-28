<template>
	<div class="container">
		<div class="schart-box">
<!--			<div class="content-title">柱状图</div>-->
			<schart class="schart" canvasId="bar" :options="options1"></schart>
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

const options1 = {
  type: 'bar',
  title: {
    text: '最近一周短信回复情况'
  },
  xRorate: 25,
  labels: ['周一', '周二', '周三', '周四', '周五'],
  datasets: [
    {
      label: '已回复',
      data: [234, 278, 270, 190, 230]
    },
    {
      label: '已读未回复',
      data: [164, 178, 190, 135, 160]
    },
    {
      label: '未读',
      data: [144, 198, 150, 235, 120]
    }
  ]
};
const options2 = {
  type: 'line',
  title: {
    text: '最近几个月短信发送情况'
  },
  labels: ['6月', '7月', '8月', '9月', '10月'],
  datasets: [
    {
      label: '快速发送',
      data: [234, 278, 270, 190, 230]
    },
    {
      label: '短信群发',
      data: [164, 178, 150, 135, 160]
    }
  ]
};
const options3 = {
	type: 'pie',
	title: {
		text: '短信回复情况饼状图'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: ['已回复', '已读未回复', '未读'],
	datasets: [
		{
			data: [334, 278, 141]
		}
	]
};
const options4 = {
	type: 'ring',
	title: {
		text: '短信发送情况'
	},
	showValue: false,
	legend: {
		position: 'bottom',
		bottom: 40
	},
	bgColor: '#fbfbfb',
	labels: ['快速发送', '短信群发'],
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
