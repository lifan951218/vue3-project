<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="exportXlsx">导出Excel</el-button>
            </div>
          <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
            <el-table-column prop="id" label="ID" width="155" align="center"></el-table-column>
            <el-table-column prop="waiguan" label="外观检测"></el-table-column>
            <el-table-column prop="wuli" label="物理性能检测"></el-table-column>
            <el-table-column prop="anquan" label="安全性检测"></el-table-column>
            <el-table-column label="检测结果" align="center">
              <template #default="scope">
                <el-tag
                    :type="scope.row.state === '合格' ? 'success' : scope.row.state === '不合格' ? 'danger' : ''"
                >
                  {{ scope.row.state }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="检测时间"></el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script setup lang="ts" name="export">
import * as XLSX from 'xlsx';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import {fetchData4} from "../api";

interface TableItem {
  id: number;
  waiguan: string;
  wuli: string;
  anquan: string;
  state: string;
  date: string;
}

const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
const value2 = ref("");
const value3 = ref("");
// 获取表格数据
const getData = () => {
  fetchData4().then(res => {
    tableData.value = res.data.list;
    pageTotal.value = res.data.pageTotal || 50;
  });
};
getData();


const list = [['序号', '姓名', '学号', '班级', '年龄', '性别']];
const exportXlsx = () => {
    tableData.value.map((item: any, i: number) => {
        const arr: any[] = [i + 1];
        arr.push(...[item.name, item.sno, item.class, item.age, item.sex]);
        list.push(arr);
    });
    let WorkSheet = XLSX.utils.aoa_to_sheet(list);
    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
    XLSX.writeFile(new_workbook, `产品检测报告.xlsx`);
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #f56c6c;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
