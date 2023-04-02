<template>
  <div class="container">
    <div  id="main" style="height: 700px;width: 100%">
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";


onMounted(() => {
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    legend: {
      top: 'bottom'
    },
    title: {
      text: '商品库存饼状图'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: '商品 1' },
          { value: 38, name: '商品 2' },
          { value: 32, name: '商品 3' },
          { value: 30, name: '商品 4' },
          { value: 28, name: '商品 5' },
          { value: 26, name: '商品 6' },
          { value: 22, name: '商品 7' },
          { value: 18, name: '商品 8' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);

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
