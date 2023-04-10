<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="节点数目">
        <el-slider v-model="form.nodeNum" :min="10" :max="100" show-input></el-slider>
      </el-form-item>
      <el-form-item label="连边数目">
        <el-slider v-model="form.edgeNum" :min="20" :max="200" show-input></el-slider>
      </el-form-item>
    </el-form>

    <div ref="chart" style="width: 100%; height: 700px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      form: {
        nodeNum: 50,
        edgeNum: 80
      }
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chart = echarts.init(this.$refs.chart);

      // 随机生成社交网络数据
      const graph = this.generateRandomGraph();

      // 使用Echarts库展示社交网络图谱
      chart.setOption({
        title: {
          text: '社交网络图谱 | 社群发现',
          left: 'center'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            roam: true,
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [4, 10],
            force: {
              repulsion: 100,
              edgeLength: [20, 100]
            },
            data: graph.nodes,
            links: graph.edges
          }
        ]
      });
    },
    generateRandomGraph() {
      const nodeNum = this.form.nodeNum;
      const edgeNum = this.form.edgeNum;

      const nodes = [];
      for (let i = 0; i < nodeNum; i++) {
        nodes.push({
          id: i + 1,
          name: 'Node ' + (i + 1),
          x: Math.random() * 500,
          y: Math.random() * 500,
          itemStyle: {
            color: '#67C23A'
          }
        });
      }

      const edges = [];
      for (let i = 0; i < edgeNum; i++) {
        const source = Math.floor(Math.random() * nodeNum);
        let target = Math.floor(Math.random() * nodeNum);
        while (target === source) {
          target = Math.floor(Math.random() * nodeNum);
        }
        edges.push({
          source: source + 1,
          target: target + 1
        });
      }

      return {
        nodes,
        edges
      };
    }
  }
};
</script>