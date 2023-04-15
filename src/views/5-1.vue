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
      text: '观看人数统计'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '观看人数',
      data: [120, 200, 150, 80, 70, 110, 130, 180, 220, 300, 450, 500, 580, 700, 800, 900, 950, 920, 850, 750, 650, 600, 500, 400],
      type: 'bar'
    }]
  }

  option1 && myChart.setOption(option1);

  let chartDom2 = document.getElementById('main2');
  let myChart2 = echarts.init(chartDom2);

  const option2 = {
    title: {
      text: '设备访问占比'
    },
    tooltip: {},
    series: [{
      name: '访问设备',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 335, name: 'PC' },
        { value: 310, name: '手机' },
        { value: 234, name: '平板' },
        { value: 135, name: '其他设备' }
      ]
    }]
  }
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
