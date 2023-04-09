<template>
  <div>
    <div ref="chart1" style="width: 50%; height: 500px;"></div>
    <div ref="chart2" style="width: 50%; height: 500px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    this.drawChart1()
    this.drawChart2()
  },
  methods: {
    drawChart1() {
      const chart = echarts.init(this.$refs.chart1)
      chart.setOption({
        title: {
          text: '绩效分布情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['优秀', '良好', '合格', '不合格'],
        },
        series: [
          {
            name: '绩效分布情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 135, name: '优秀' },
              { value: 235, name: '良好' },
              { value: 410, name: '合格' },
              { value: 24, name: '不合格' },
            ],
          },
        ],
      })
    },
    drawChart2() {
      const chart = echarts.init(this.$refs.chart2)
      chart.setOption({
        title: {
          text: '绩效得分情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          top: 40,
          bottom: 20,
          left: 10,
          right: 10,
        },
        xAxis: {
          type: 'category',
          data: ['员工1', '员工2', '员工3', '员工4', '员工5']
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [85, 90, 82, 75, 94],
            type: 'bar',
          },
        ],
      })
    },
  },
}
</script>