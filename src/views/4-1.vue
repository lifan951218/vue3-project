<template>
  <div class="data-exploration">
    <el-row>

      <el-col :span="6">

        <el-upload
            ref="upload"
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleUploadChange"
        >

          <el-button slot="trigger" icon="el-icon-upload">

            选择文件
          </el-button>

          <div slot="tip" class="el-upload__tip">

            只能上传csv格式的文件
          </div>

        </el-upload>

      </el-col>

      <el-col :span="6">

        <el-button type="primary" icon="el-icon-s-data" @click="">探索数据
        </el-button>

      </el-col>

    </el-row>
    <!-- 搜索框 -->
    <el-input v-model="search" placeholder="搜索" class="search"></el-input>

    <!-- 数据表格 -->
    <el-table :data="filteredData" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="score" label="社交分数"></el-table-column>
    </el-table>

    <!-- 数据可视化图表 -->
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import {reactive, onMounted, computed} from 'vue';
import { ElInput, ElTable, ElTableColumn } from 'element-plus';
import * as echarts from 'echarts';

export default {
  components: { ElInput, ElTable, ElTableColumn },
  setup() {
    // 响应式数据对象
    const state = reactive({
      data: [], // 原始数据
      search: '', // 搜索关键词
      chartType: 'bar', // 图表类型
      chartData: [], // 图表数据
    });

    // 计算属性：根据搜索关键词过滤数据
    const filteredData = computed(() => {
      if (state.search) {
        return state.data.filter((item) =>
            item.name.toLowerCase().includes(state.search.toLowerCase())
        );
      } else {
        return state.data;
      }
    });

    // 方法：获取模拟数据
    const fetchData = () => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: `用户${i + 1}`,
          age: Math.floor(Math.random() * 10 + 15),
          gender: Math.random() > 0.5 ? '男' : '女',
          score: Math.floor(Math.random() * 30 + 70),
        });
      }
      state.data = data;
    };

    // 方法：绘制图表
    const drawChart = () => {
      const chartDom = document.querySelector('.chart');
      const myChart = echarts.init(chartDom);
      myChart.setOption({
        title: { text: '社交分数分布情况' },
        tooltip: {},
        xAxis: { type: 'category', data: state.chartData.map((item) => item.name) },
        yAxis: { type: 'value' },
        series: [{ data: state.chartData.map((item) => item.value), type: state.chartType }],
      });
    };

    // 生命周期钩子：页面加载完成后获取数据并绘制图表
    onMounted(() => {
      fetchData();
      state.chartData = [
        { name: '60-69', value: 0 },
        { name: '70-79', value: 0 },
        { name: '80-89', value: 0 },
        { name: '90-100', value: 0 },
      ];
      state.data.forEach((item) => {
        if (item.score >= 60 && item.score < 70) {
          state.chartData[0].value++;
        } else if (item.score >= 70 && item.score < 80) {
          state.chartData[1].value++;
        } else if (item.score >= 80 && item.score < 90) {
          state.chartData[2].value++;
        } else if (item.score >= 90 && item.score <= 100) {
          state.chartData[3].value++;
        }
      });
      drawChart();
    });

    return { state, filteredData, fetchData, drawChart };
  },
};
</script>

<style>
.data-exploration {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search {
  width: 200px;
}

.chart {
  height: 400px;
}
</style>