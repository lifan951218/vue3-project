<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="输入文本">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="" type="primary">开始分析</el-button>
      </el-form-item>
    </el-form>

    <div ref="chart" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      form: {
        text: '如果要给我们的电话做电话识别，我们必须满足以下条件：在给出前台应用程序的 URL 或在电子邮件中输入来源的主题。'
      }
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.chart);

      // 分析文本情感并生成图表数据
      const data = this.analyzeSentiment(this.form.text);

      // 使用Echarts库展示情感分析结果
      chart.setOption({
        title: {
          text: '情感分析结果',
          left: 'center'
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      });
    },
    analyzeSentiment(text) {
      const result = {
        positive: 5,
        neutral: 86,
        negative: 9
      };

      return [
        {
          value: result.positive.toFixed(2),
          name: '积极',
          itemStyle: {
            color: '#67C23A'
          }
        },
        {
          value: result.neutral.toFixed(2),
          name: '中性',
          itemStyle: {
            color: '#E6A23C'
          }
        },
        {
          value: result.negative.toFixed(2),
          name: '消极',
          itemStyle: {
            color: '#F56C6C'
          }
        }
      ];
    }
  }
};
</script>