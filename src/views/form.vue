<template>
  <div class="container">
    <div class="toolbar">
      <span>产品名称</span>
      <el-input v-model="filterText" placeholder="请输入搜索关键词" style="width: 200px; margin-left: 10px;" prefix-icon="el-icon-search"></el-input>
      <el-button style="margin-left: 15px" type="primary" @click="exportCsv">查询</el-button>

      <el-button type="primary" @click="exportCsv">导出CSV</el-button>
    </div>
    <el-table ref="table" :data="filteredData" style="width: 100%" :header-cell-style="{ backgroundColor: '#f5f5f5' }">

      <el-table-column prop="item" label="项目">

      </el-table-column>

      <el-table-column prop="currentYear" label="本年数">

      </el-table-column>

      <el-table-column prop="lastYear" label="上年数">

      </el-table-column>

      <el-table-column prop="increaseRate" label="增长率(%)">

      </el-table-column>

      <el-table-column prop="fiveYearAvg" label="五年平均增长率(%)">

      </el-table-column>

      <el-table-column prop="remark" label="备注">

      </el-table-column>

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
      { item: '流动资产', currentYear: 8000000, lastYear: 6000000, increaseRate: 33.3, fiveYearAvg: 22.5, remark: '' },
      { item: '存货', currentYear: 3000000, lastYear: 2500000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
      { item: '应收账款', currentYear: 2000000, lastYear: 1800000, increaseRate: 11.1, fiveYearAvg: 13.6, remark: '' },
      { item: '非流动资产', currentYear: 12000000, lastYear: 10000000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
      { item: '其他', currentYear: 12000000, lastYear: 10000000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
      { item: '股票账户', currentYear: 12000000, lastYear: 10000000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
      { item: '其他2', currentYear: 12000000, lastYear: 10000000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
      { item: '其他3', currentYear: 12000000, lastYear: 10000000, increaseRate: 20, fiveYearAvg: 18.2, remark: '' },
    ]);

    const currentPage = ref(1);
    const pageSize = 10;
    const filterText = ref('');
    const selectAll = ref(false);

    const filteredData = computed(() => {
      let filtered = data.value.filter((item) => item.item.includes(filterText.value));
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
        xlsx.writeFile(workbook, '资产负债.xlsx');
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