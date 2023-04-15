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
      text: '弹幕数量统计'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['0分', '1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分', '11分', '12分', '13分', '14分', '15分', '16分', '17分', '18分', '19分', '20分', '21分', '22分', '23分', '24分', '25分', '26分', '27分', '28分', '29分', '30分', '31分', '32分', '33分', '34分', '35分', '36分', '37分', '38分', '39分', '40分', '41分', '42分', '43分', '44分', '45分', '46分', '47分', '48分', '49分', '50分', '51分', '52分', '53分', '54分', '55分', '56分', '57分', '58分', '59分']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '弹幕数量',
      data: [120, 200, 150, 80, 70, 110, 130, 180, 220, 300, 450, 500, 580, 700, 800, 900, 950, 920, 850, 750, 650, 600, 500, 400, 300, 200, 150, 80, 70, 110, 130, 180, 220, 300, 450, 500, 580, 700, 800, 900, 950, 920, 850, 750, 650, 600, 500, 400, 300, 200, 150, 80, 70, 110, 130, 180, 220, 300, 450, 500, 580, 700, 800],
      type: 'bar'
    }]
  }

  option1 && myChart.setOption(option1);

  let chartDom2 = document.getElementById('main2');
  let myChart2 = echarts.init(chartDom2);

  const option2 = {
    title: {
      text: '弹幕关键词统计'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} 次'
      }
    },
    yAxis: {
      type: 'category',
      data: ['弹幕', '直播', '小姐姐', '666', '打call', '礼物', '舰长', '爱你哟', '哈哈哈', '23333', '66666', 'woc', '牛逼']
    },
    series: [{
      name: '频次',
      type: 'bar',
      data: [10000, 6181, 4386, 4055, 2467, 2244, 1898, 1484, 1112, 965, 847, 582, 555],
      label: {
        show: true,
        position: 'right'
      }
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
