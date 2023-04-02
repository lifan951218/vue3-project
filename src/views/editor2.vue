<template>
  <div class="container">
    <div style="margin-bottom: 20px">
      请选择顾客名称
      <el-select v-model="value2" placeholder="请选择">
        <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--		<div class="mgb20" ref="editor"></div>-->
    <el-button type="primary" @click="syncHTML">查询</el-button>
  </div>
  <div class="container">
    <h3 style="margin-bottom: 10px">预约记录</h3>
    <el-table :data="appointments" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="id" label="编号" width="155" align="center"></el-table-column>
      <el-table-column prop="customer" label="顾客名称"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="service" label="服务"></el-table-column>
      <el-table-column label="评分" align="center">
        <template #default="scope">
          <el-tag
              :type="scope.row.rating > 4 ? 'success' : scope.row.rating <4 ? 'danger' : ''"
          >
            {{ scope.row.rating }}
          </el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column prop="date" label="检测时间"></el-table-column>-->
<!--      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" v-permiss="15">
            重新检测
          </el-button>
          <el-button type="primary"  size="small" v-permiss="15">
            查看详情
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script setup lang="ts" name="editor">
// import WangEditor from 'wangeditor';
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

const appointments = ref([]);

const services = ref([
  '理发', '洗头','染发', '烫发'
]); // 服务列表
for (let i = 1; i <= 10; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const startHour = Math.floor(Math.random() * 6) + 8;
  const endHour = startHour + Math.floor(Math.random() * 3) + 1;
  const rating = Math.floor(Math.random() * 5) + 1; // 随机生成1-5之间的整数作为评分
  const service = services.value[Math.floor(Math.random() * services.value.length)];
  appointments.value.push({
    id: i,
    customer: `顾客${i}`,
    date: date.toISOString().substring(0, 10),
    service: service,
    time: `${startHour}:00 - ${endHour}:00`,
    rating,
  });
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

const users = reactive([
  {
    value: 'admin',
    label: '食品'
  },
  {
    value: 'user',
    label: '饮料'
  }
]);
const editor = ref(null);
const content = reactive({
  html: '',
  text: ''
});
let instance: any;
// onMounted(() => {
// 	instance = new WangEditor(editor.value);
// 	instance.config.zIndex = 1;
// 	instance.create();
// });
// onBeforeUnmount(() => {
// 	instance.destroy();
// 	instance = null;
// });

const flag = ref(false);
const syncHTML = () => {
  flag.value = !flag.value;
  // content.html = instance.txt.html();
  console.log(content.html);
};
</script>

<style></style>
