<template>
	<div class="container">
    <div style="margin-bottom: 20px">
      请选择所属部门
      <el-select v-model="value2" placeholder="请选择">
        <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="margin-bottom: 20px">
      请输入工作人员名称
      <el-input v-model="value3" placeholder="名称" style="width: 200px">
      </el-input>
    </div>
<!--		<div class="mgb20" ref="editor"></div>-->
		<el-button type="primary" @click="syncHTML">查询</el-button>
		<el-button type="primary" @click="">新增</el-button>

	</div>
  <div class="container">
    <h3 style="margin-bottom: 10px">工作人员列表</h3>
    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="155" align="center"></el-table-column>
      <el-table-column prop="type" label="名称"></el-table-column>
      <el-table-column prop="pro_type" label="所属部门"></el-table-column>
      <el-table-column prop="content" label="职位"></el-table-column>
      <el-table-column label="是否在线" align="center">
        <template #default="scope">
          <el-tag
              :type="scope.row.state === '在线' ? 'success' : scope.row.state === '离线' ? 'danger' : ''"
          >
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button type="primary" v-permiss="15">
            编辑
          </el-button>
          <el-button type="danger" v-permiss="15">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="editor">
// import WangEditor from 'wangeditor';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import {fetchData6} from "../api";

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
  fetchData6().then(res => {
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
