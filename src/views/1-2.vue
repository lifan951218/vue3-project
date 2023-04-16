<template>
  <div class="container">
    <div class="add-appointment">
      <h3>精彩回放</h3>
    </div>
    <el-form :inline="true" :model="queryForm">
      <el-form-item label="直播名称">
        <el-input v-model.trim="queryForm.直播" placeholder="请输入直播名称"></el-input>
      </el-form-item>
      <el-form-item label="回放日期">
        <el-date-picker format="YYYY/MM/DD" value-format="YYYY/MM/DD" v-model="queryForm.date" type="date" placeholder="选择直播日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="handleQuery">搜索</el-button>
<!--        <el-button type="primary" @click="handleExport">导出</el-button>-->

      </el-form-item>
    </el-form>
    <el-table :data="filteredSalesData">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="直播日期"></el-table-column>
      <el-table-column prop="直播" label="直播"></el-table-column>
      <el-table-column prop="amount" label="观看人数"></el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="{row}">
          <!-- 编辑直播 -->
          <!--          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>-->
          <el-button  type="primary" size="small" @click="editAppointment(row)">进入回放</el-button>

          <!-- 取消直播 -->
          <!--          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>-->
        </template>
      </el-table-column>
      <!--      <el-table-column prop="cost" label="成本"></el-table-column>-->
      <!--      <el-table-column prop="profit" label="利润"></el-table-column>-->
    </el-table>
    <el-pagination
        style="margin-top:15px"
        background
        layout="prev, pager, next"
        :total="salesData.length"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
    ></el-pagination>
  </div>

</template>
<script setup>
import {computed, ref} from 'vue';
import * as echarts from 'echarts';
import imgurl from '../assets/img/zhibo.jpeg';

const message = ref('first');

const salesData = ref([]);

for (let i = 0; i < 100; i++) {
  salesData.value.push({
    date: `2022/01/${i + 1}`,
    直播: `直播 ${i + 1}`,
    amount: Math.floor(Math.random() * 100),
    cost: Math.floor(Math.random() * 5000),
    profit: null
  });
  // 计算利润
  salesData.value[i].profit = salesData.value[i].amount - salesData.value[i].cost;
}
const pageSize = ref(10); // 每页显示的数据量
const currentPage = ref(1); // 当前页码

const queryForm = ref({
  直播: '',
  date: ''
});

const filteredSalesData = computed(() => {
  let data = JSON.parse(JSON.stringify(salesData.value));
  console.log("date:", queryForm.value.date)
  if (queryForm.value.直播) {
    data = data.filter(item => item.直播.includes(queryForm.value.直播));
  }
  if (queryForm.value.date) {
    data = data.filter(item => item.date === queryForm.value.date);
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.slice(start, end);
});


const handleCurrentChange = (page) => {
  currentPage.value = page;
};
const handleQuery = () => {
  currentPage.value = 1; // 切换查询条件后回到第一页
}

const handleExport = () => {
  // 获取表格数据
  const tableData = JSON.parse(JSON.stringify(filteredSalesData.value));
  // 移除id字段
  tableData.forEach(item => {
    delete item.id;
  });
  // 导出xlsx文件
  import('xlsx').then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(tableData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    xlsx.writeFile(workbook, 'sales_data.xlsx');
  });
};

const tabChange = (value) => {
  if(value === 'second') {
    setTimeout(() => {
      initLineChart();
      initBarChart();
      initPieChart();
      initScatterChart();
    });
  }
}

const lineChart = ref(null);
const barChart = ref(null);
const pieChart = ref(null);
const scatterChart = ref(null);

const initLineChart = () => {
  const chart = echarts.init(lineChart.value);
  chart.setOption({
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [1200, 1500, 1800, 2000, 2200, 2400],
      type: 'line'
    }]
  });
};

const initBarChart = () => {
  const chart = echarts.init(barChart.value);
  chart.setOption({
    xAxis: {
      type: 'category',
      data: ['北京', '上海', '广州', '深圳', '杭州']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [1200, 800, 500, 300, 200],
      type: 'bar'
    }]
  });
};

const initPieChart = () => {
  const chart = echarts.init(pieChart.value);
  chart.setOption({
    series: [{
      type: 'pie',
      data: [
        { name: '搜索引擎', value: 335 },
        { name: '直接访问', value: 310 },
        { name: '邮件营销', value: 234 },
        { name: '联盟广告', value: 135 },
        { name: '视频广告', value: 1548 }
      ]
    }]
  });
};

const initScatterChart = () => {
  const chart = echarts.init(scatterChart.value);
  chart.setOption({
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'scatter',
      symbolSize: 10,
      data: [
        [10, 20],
        [30, 40],
        [50, 60],
        [70, 80],
        [90, 100]
      ]
    }]
  });
};

</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
}

.chart-item {
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
}

.add-appointment {
  margin-bottom: 20px;
}

.chart {
  height: 300px;
  border: 1px solid #ccc;
}
</style>