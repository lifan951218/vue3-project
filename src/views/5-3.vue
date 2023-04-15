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
      text: '礼物数量统计'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['火箭', '飞机', '汽车', '火车', '鲜花', '棒棒糖', '巧克力', '钻石']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '礼物数量',
      data: [120, 200, 150, 80, 70, 110, 130, 180],
      type: 'bar'
    }]
  }

  option1 && myChart.setOption(option1);

  let chartDom2 = document.getElementById('main2');
  let myChart2 = echarts.init(chartDom2);
  const option2 = {
    title: {
      text: '礼物占比统计'
    },
    tooltip: {},
    legend: {
      orient: 'vertical',
      right: 10,
      top: 50,
      data: ['火箭', '飞机', '汽车', '火车', '鲜花', '棒棒糖', '巧克力', '钻石']
    },
    series: [{
      name: '礼物占比',
      type: 'pie',
      radius: [20, 140],
      center: ['45%', '50%'],
      roseType: 'radius',
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 120, name: '火箭' },
        { value: 200, name: '飞机' },
        { value: 150, name: '汽车' },
        { value: 80, name: '火车' },
        { value: 70, name: '鲜花' },
        { value: 110, name: '棒棒糖' },
        { value: 130, name: '巧克力' },
        { value: 180, name: '钻石' }
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
