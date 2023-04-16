<template>
  <div class="container">
    <div  id="main" style="height: 700px;width: 100%">
    </div>
    <div  id="main2" style="height: 700px;width: 100%">
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";


onMounted(() => {
  let chartDom = document.getElementById('main');
  let myChart = echarts.init(chartDom);
  const option1 = {
    title: {
      text: '直播间用户统计数据'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data:['观看人数', '订阅人数']
    },
    xAxis: {
      type: 'category',
      data: ["3月1日", "3月2日", "3月3日", "3月4日", "3月5日", "3月6日"]
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '观看人数',
      type: 'line',
      data: [100, 200, 300, 400, 500, 600]
    }, {
      name: '订阅人数',
      type: 'line',
      data: [50, 100, 150, 200, 250, 300]
    }]
  };

  option1 && myChart.setOption(option1);

  let chartDom2 = document.getElementById('main2');
  let myChart2 = echarts.init(chartDom2);

  const option2 = {
    title: {
      text: '直播间用户统计数据'
    },
    tooltip: {},
    legend: {
      data:['观看人数', '订阅人数']
    },
    xAxis: {
      data: ["3月1日", "3月2日", "3月3日", "3月4日", "3月5日", "3月6日"]
    },
    yAxis: {},
    series: [{
      name: '观看人数',
      type: 'bar',
      data: [100, 200, 300, 400, 500, 600]
    }, {
      name: '订阅人数',
      type: 'bar',
      data: [50, 100, 150, 200, 250, 300]
    }]
  };
  option2 && myChart2.setOption(option2);

});


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
