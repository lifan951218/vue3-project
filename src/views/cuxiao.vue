<template>
  <div class="container">
    <div class="toolbar">
      <span>产品名称</span>
      <el-input v-model="filterText" placeholder="请输入搜索关键词" style="width: 200px; margin-left: 10px;" prefix-icon="el-icon-search"></el-input>
      <el-button style="margin-left: 15px" type="primary" @click="exportCsv">查询</el-button>

      <el-button type="primary" @click="exportCsv">导出CSV</el-button>
    </div>
    <el-table ref="table" :data="filteredData" style="width: 100%" :header-cell-style="{ backgroundColor: '#f5f5f5' }">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="productName" label="产品名称"></el-table-column>
      <el-table-column prop="marketSize" label="市场规模"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="salesVolume" label="销量"></el-table-column>
      <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="data.length" :current-page.sync="currentPage" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const data = ref([
      { productName: '产品1', marketSize: 100, price: 10, salesVolume: 50, manufacturer: '厂家1' },
      { productName: '产品2', marketSize: 200, price: 20, salesVolume: 70, manufacturer: '厂家2' },
      { productName: '产品3', marketSize: 300, price: 30, salesVolume: 90, manufacturer: '厂家3' },
      { productName: '产品4', marketSize: 400, price: 40, salesVolume: 110, manufacturer: '厂家4' },
      { productName: '产品5', marketSize: 500, price: 50, salesVolume: 120, manufacturer: '厂家5' },
      { productName: '产品6', marketSize: 600, price: 60, salesVolume: 130, manufacturer: '厂家6' },
      { productName: '产品7', marketSize: 700, price: 70, salesVolume: 140, manufacturer: '厂家7' },
      { productName: '产品8', marketSize: 800, price: 80, salesVolume: 130, manufacturer: '厂家8' },
      { productName: '产品9', markSize: 900, price: 90,  salesVolume: 150, manufacturer: '厂家9' },
      { productName: '产品10', markSize: 1000, price: 100,  salesVolume: 160, manufacturer: '厂家10' },
      { productName: '产品11', markSize: 1100, price: 110,  salesVolume: 170, manufacturer: '厂家11' },
      { productName: '产品12', markSize: 1200, price: 120,  salesVolume: 180, manufacturer: '厂家12' },
      { productName: '产品13', markSize: 1300, price: 130,  salesVolume: 190, manufacturer: '厂家13' }
      // ... 后面还可以添加更多数据
    ]);

    const currentPage = ref(1);
    const pageSize = 10;
    const filterText = ref('');
    const selectAll = ref(false);

    const filteredData = computed(() => {
      let filtered = data.value.filter((item) => item.productName.includes(filterText.value));
      if (selectAll.value) {
        return filtered;
      }
      return filtered.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize);
    });

    const exportCsv = () => {
      // 获取表格数据
      const tableData = JSON.parse(JSON.stringify(filteredData.value));
      // 移除id字段
      tableData.forEach(item => {
        delete item.id;
      });
      // 导出xlsx文件
      import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(tableData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        xlsx.writeFile(workbook, '市场规模数据.xlsx');
      });
    };

    return {
      data,
      currentPage,
      pageSize,
      filterText,
      selectAll,
      filteredData,
      exportCsv
    };
  }
}
</script>

<style>
.market-size-list-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.pagination {
  margin-top: 10px;
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>