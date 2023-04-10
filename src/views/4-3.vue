<template>

  <div class="machine-learning">

    <!-- 数据预处理 -->

    <el-card shadow="hover">

      <div slot="header">

        数据预处理
      </div>

      <el-form :model="preprocessForm" label-width="80px">

        <el-form-item label="数据文件">

          <el-upload
              action="#"
              :show-file-list="false"
              :on-change="handleFileChange"
              :before-upload="beforeUpload"
              :disabled="preprocessing"
          >

            <el-button slot="trigger" type="primary" icon="el-icon-upload">

              选择文件
            </el-button>

            <div class="upload-tip">

              {{ preprocessForm.file.name }}
            </div>

          </el-upload>

          <el-button type="primary" icon="el-icon-check" :loading="preprocessing" :disabled="!preprocessForm.file" @click="preprocessData" > 处理数据
          </el-button>

        </el-form-item>

        <el-form-item label="分析结果">

          <el-alert v-if="preprocessResult" :title="preprocessResult" type="success" />

        </el-form-item>

      </el-form>

    </el-card>

    <!-- 数据可视化 -->
    <el-card shadow="hover">
      <div slot="header">数据可视化</div>
      <div class="chart" ref="chart"></div>
    </el-card>

    <!-- 分类器选择 -->
    <el-card shadow="hover">
      <div slot="header">分类器选择</div>
      <div class="classifier-list">
        <el-radio-group v-model="classifier" @change="trainModel">
          <el-radio label="naive_bayes">朴素贝叶斯</el-radio>
          <el-radio label="decision_tree">决策树</el-radio>
          <el-radio label="random_forest">随机森林</el-radio>
        </el-radio-group>
      </div>
    </el-card>

    <!-- 模型评估和预测 -->
    <el-card shadow="hover">
      <div slot="header">模型评估和预测</div>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="模型评估">
          <el-form :model="evaluationForm" label-width="100px">
            <el-form-item label="准确率">
              <el-input v-model="evaluationForm.accuracy" readonly />
            </el-form-item>
            <el-form-item label="精度">
              <el-input v-model="evaluationForm.precision" readonly />
            </el-form-item>
            <el-form-item label="召回率">
              <el-input v-model="evaluationForm.recall" readonly />
            </el-form-item>
            <el-form-item label="F1 值">
              <el-input v-model="evaluationForm.f1_score" readonly />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="模型预测">
          <el-form :model="predictionForm" label-width="100px">
            <el-form-item label="输入特征">
              <el-input v-model="predictionForm.features" placeholder="请输入待分类数据的特征值" />
            </el-form-item>
            <el-form-item label="分类结果">
              <el-input v-model="predictionForm.result" readonly />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>


<script>
import { ref, reactive } from 'vue';
import { ElCard, ElForm, ElFormItem, ElUpload, ElButton, ElRadioGroup, ElRadio, ElAlert, ElTabs, ElTabPane, ElInput } from 'element-plus';
import * as echarts from 'echarts';

export default {
  components: { ElCard, ElForm, ElFormItem, ElUpload, ElButton, ElRadioGroup, ElRadio, ElAlert, ElTabs, ElTabPane, ElInput },
  setup() {
    // 响应式数据对象
    const preprocessForm = reactive({
      file: null, // 待处理的文件
    });
    const preprocessResult = ref(null); // 处理结果
    const preprocessing = ref(false); // 是否正在处理数据

// Echarts 实例
    const chartInstance = ref(null);
    const classifier = ref(null); // 选择的分类器
    const activeTab = ref('0'); // 当前激活的选项卡

    const evaluationForm = reactive({
      accuracy: null, // 准确率
      precision: null, // 精度
      recall: null, // 召回率
      f1_score: null, // F1 值
    });
    const predictionForm = reactive({
      features: null, // 待分类数据的特征值
      result: null, // 分类结果
    });

// 方法：读取上传的文件
    const handleFileChange = ({ file }) => {
      preprocessForm.file = file;
    };

// 方法：验证上传的文件格式和大小
    const beforeUpload = (file) => {
      const isCSV = file.type === 'text/csv';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isCSV) {
        this.$message.error('只支持上传 CSV 格式的文件');
      }
      if (!isLt10M) {
        this.$message.error('上传的文件大小不能超过 10MB');
      }
      return isCSV && isLt10M;
    };

// 方法：处理上传的数据
    const preprocessData = () => {
      preprocessing.value = true;
      // TODO: 实现数据预处理逻辑
      setTimeout(() => {
        preprocessResult.value = '数据预处理完成';
        preprocessing.value = false;
      }, 2000);
    };

// 方法：训练模型
    const trainModel = () => {
      // TODO: 实现训练模型逻辑
      // 在这里可以调用机器学习库（例如 scikit-learn）来训练模型
    };

// 方法：评估模型
    const evaluateModel = () => {
      // TODO: 实现评估模型逻辑
      // 在这里可以计算模型的准确率、精度、召回率和 F1 值等指标
      evaluationForm.accuracy = '0.85';
      evaluationForm.precision = '0.82';
      evaluationForm.recall = '0.88';
      evaluationForm.f1_score = '0.85';
    };

// 方法：预测分类结果
    const predictResult = () => {
      // TODO: 实现预测分类结果逻辑
      // 在这里可以调用训练好的模型进行预测
      predictionForm.result = '正类';
    };

// 生命周期钩子：页面加载完成后绘制数据可视化图表
    const initChart = () => {
      chartInstance.value = echarts.init(document.querySelector('.chart'));
      chartInstance.value.setOption({
        title: { text: '社交网络数据可视化' },
        tooltip: {},
        series: [
          {
            type: 'graph',
            layout: 'force',
            roam: true,
            data: [
              { name: '节点1', symbolSize: 30 },
              { name: '节点2', symbolSize: 20 },
              { name: '节点3', symbolSize: 10 },
              { name: '节点4', symbolSize: 40 },
              { name: '节点5', symbolSize: 50 },
            ],
            links: [
              { source: '节点1', target: '节点2' },
              { source: '节点1', target: '节点4' },
              { source: '节点2', target: '节点3' },
              { source: '节点2', target: '节点5' },
              { source: '节点3', target: '节点4' },
              { source: '节点4', target: '节点5' },
            ],
          },
        ],
      });
    };
    // initChart();

    return {
      preprocessForm,
      preprocessResult,
      preprocessing,
      chartInstance,
      classifier,
      activeTab,
      evaluationForm,
      predictionForm,
      handleFileChange,
      beforeUpload,
      preprocessData,
      trainModel,
      evaluateModel,
      predictResult,
    };
  },
};

</script>

<style>
.machine-learning {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-tip {
  margin-top: 10px;
  font-size: 14px;
}

.classifier-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chart {
  height: 400px;
}

</style>