<template>
  <div class="keyword-extraction">
    <el-row>
      <el-col :span="18">
        <el-input v-model="inputText" placeholder="请输入待分析文本"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-search" @click="extractKeywords">提取关键词</el-button>
      </el-col>
    </el-row>
    <div class="chart-wrapper">
      <div id="chart" style="height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { ElInput, ElButton, ElRow, ElCol } from 'element-plus';

export default {
  name: 'KeywordExtraction',
  components: {
    ElInput,
    ElButton,
    ElRow,
    ElCol,
  },
  data() {
    return {
      inputText: '',
      chart: null,
    };
  },
  methods: {
    extractKeywords() {
      const keywords = [];

      // 这里使用正则表达式将输入文本分成单词
      const words = this.inputText.split(/[^\w'-]+/);

      // 随机选取其中的一些单词作为关键词
      while (keywords.length < 10 && words.length > 0) {
        const index = Math.floor(Math.random() * words.length);
        const word = words.splice(index, 1)[0];
        if (word.trim().length > 1) {
          keywords.push(word.toLowerCase());
        }
      }

      // 统计每个关键词出现的次数
      const keywordCounts = {};
      for (const keyword of keywords) {
        keywordCounts[keyword] = keywordCounts[keyword] ? keywordCounts[keyword] + 1 : 1;
      }

      // 转换成Echarts所需的数据格式
      const data = [];
      for (const keyword in keywordCounts) {
        data.push({
          name: keyword,
          value: keywordCounts[keyword],
        });
      }

      // 使用Echarts渲染关键词图表
      const option = {
        title: { text: '关键词提取' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: Object.keys(keywordCounts),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'bar',
            data: data,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
  mounted() {
    // 初始化Echarts图表
    this.chart = echarts.init(document.getElementById('chart'));
  },
};
</script>

<style scoped>
.keyword-extraction .chart-wrapper {
  margin-top: 20px;
}
</style>