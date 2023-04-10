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

    <div ref="chart" style="width: 100%; height: 300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      form: {
        text: '今天我要去爬山，她们谁来？'
      }
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.chart);

      // 分析文本并生成图表数据
      const data = this.analyzeText(this.form.text);

      // 使用Echarts库展示文本分类结果
      chart.setOption({
        title: {
          text: '文本分类结果',
          left: 'center'
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['类别1', '类别2', '类别3', '类别4']
        },
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
    analyzeText(text) {
      // TODO: 调用文本分类API获取文本分类结果
      const result = {
        category1: Math.random(),
        category2: Math.random(),
        category3: Math.random(),
        category4: Math.random()
      };

      return [
        {
          value: result.category1.toFixed(2),
          name: '类别1',
          itemStyle: {
            color: '#67C23A'
          }
        },
        {
          value: result.category2.toFixed(2),
          name: '类别2',
          itemStyle: {
            color: '#E6A23C'
          }
        },
        {
          value: result.category3.toFixed(2),
          name: '类别3',
          itemStyle: {
            color: '#F56C6C'
          }
        },
        {
          value: result.category4.toFixed(2),
          name: '类别4',
          itemStyle: {
            color: '#909399'
          }
        }
      ];
    }
  }
};
</script>