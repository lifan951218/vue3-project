<template>
  <div class="social-network">
    <!-- 社交网络密度图 -->
    <el-card shadow="hover">
      <div slot="header">社交网络密度图</div>
      <div class="chart" id="densityChart"></div>
    </el-card>

    <!-- 社交网络节点关系图 -->
    <el-card shadow="hover">
      <div slot="header">社交网络节点关系图</div>
      <div class="chart" id="relationshipChart"></div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElCard } from 'element-plus';
import * as echarts from 'echarts';

export default {
  components: { ElCard },
  setup() {
    const densityChartInstance = ref(null); // 社交网络密度图 Echarts 实例
    const relationshipChartInstance = ref(null); // 社交网络节点关系图 Echarts 实例

    // 生命周期钩子：页面加载完成后绘制社交网络密度图和节点关系图
    onMounted(() => {
      drawDensityChart();
      drawRelationshipChart();
    });

    // 方法：绘制社交网络密度图
    const drawDensityChart = () => {
      densityChartInstance.value = echarts.init(document.getElementById('densityChart'));
      densityChartInstance.value.setOption({
        title: { text: '社交网络密度图' },
        tooltip: {},
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 10,
            data: [
              [0.1, 0.2],
              [0.3, 0.4],
              [0.5, 0.6],
              [0.7, 0.8],
              [0.9, 1.0],
            ],
          },
        ],
      });
    };

    // 方法：绘制社交网络节点关系图
    const drawRelationshipChart = () => {
      relationshipChartInstance.value = echarts.init(document.getElementById('relationshipChart'));
      relationshipChartInstance.value.setOption({
        title: { text: '社交网络节点关系图' },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: true,
            label: {
              show: true,
            },
            emphasis: {
              focus: 'adjacency',
              label: {
                show: true,
                position: 'right',
                color: '#333',
                fontSize: 14,
              },
            },
            data: [
              {
                name: 'Alice',
                draggable: true,
                value: 100,
                symbolSize: 50,
                itemStyle: { color: '#d7504b' },
              },
              {
                name: 'Bob',
                draggable: true,
                value: 80,
                symbolSize: 40,
                itemStyle: { color: '#339ca8' },
              },
              {
                name: 'Cathy',
                draggable: true,
                value: 60,
                symbolSize: 30,
                itemStyle: { color: '#c4ccd3' },
              },
              {
                name: 'David',
                draggable: true,
                value: 40,
                symbolSize: 20,
                itemStyle: { color: '#905a3d' },
              },
            ],
            links: [
              { source: 'Alice', target: 'Bob' },
              { source: 'Alice', target: 'Cathy' },
              { source: 'Bob', target: 'David' },
              { source: 'Cathy', target: 'David' },
            ],
            force: {
              edgeLength: 100,
              repulsion: 200,
              gravity: 0.2,
            },
          },
        ],
      });
    };

    return {
      densityChartInstance,
      relationshipChartInstance,
    };
  },
};
</script>

<style>
.social-network {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart {
  height: 400px;
}
</style>