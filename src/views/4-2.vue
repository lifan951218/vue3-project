<template>
  <div class="social-network-analysis">
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

        <el-button type="primary" icon="el-icon-s-data" @click="">统计分析
        </el-button>

      </el-col>

    </el-row>
    <!-- 节点列表 -->
    <el-card shadow="hover">
      <div slot="header">节点列表</div>
      <el-table :data="state.nodes" style="width: 100%;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="degree" label="度中心性"></el-table-column>
        <el-table-column prop="closeness" label="紧密度"></el-table-column>
        <el-table-column prop="betweenness" label="介数中心性"></el-table-column>
        <el-table-column prop="eigenvector" label="特征向量中心性"></el-table-column>
      </el-table>
    </el-card>

    <!-- 关系图 -->
    <el-card shadow="hover">
      <div slot="header">关系图</div>
      <div class="chart" ref="chart"></div>
    </el-card>
  </div>
</template>

<script>
import { reactive, onMounted , ref} from 'vue';
import { ElCard, ElTable, ElTableColumn } from 'element-plus';
import * as echarts from 'echarts';

export default {
  setup() {
    // 响应式数据对象
    const state = reactive({
      nodes: [], // 节点列表
      links: [], // 边列表
    });


    // 方法：获取模拟数据
    const fetchData = () => {
      // 生成随机的节点和边
      const nodes = [];
      const links = [];
      for (let i = 1; i <= 10; i++) {
        nodes.push({
          id: i,
          name: `节点${i}`,
          degree: Math.floor(Math.random() * 10),
          closeness: Math.random().toFixed(2),
          betweenness: Math.random().toFixed(2),
          eigenvector: Math.random().toFixed(2),
        });
      }
      for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.8) {
            links.push({ source: i, target: j });
          }
        }
      }
      state.nodes = nodes;
      state.links = links;
    };

    // 生命周期钩子：页面加载完成后绘制关系图
    onMounted(() => {
      const chartDom = document.querySelector('.chart');
      const myChart = echarts.init(chartDom);
      fetchData()
      const nodeData = state.nodes.map((item) => {
        return {
          name: item.name,
          symbolSize: item.degree * 10,
          value: item.degree,
          label: { show: true },
        };
      });
      const linkData = state.links.map((item) => {
        return { source: item.source, target: item.target };
      });
      myChart.setOption({
        title: { text: '社交网络分析' },
        tooltip: {},
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: true,
            data: nodeData,
            links: linkData,
          },
        ],
      });
    });

    return { state, fetchData };
  },
};
</script>

<style>
.social-network-analysis {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart {
  height: 400px;
}
</style>