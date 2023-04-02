<template>
	<div class="container">

      <div style="margin-bottom: 20px">
        请选择盘点商品
        <el-select v-model="value2" placeholder="请选择">
          <el-option
              v-for="item in users"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button style="margin-left: 20px" type="primary" @click="">查询</el-button>
      </div>
      <!--		<div class="mgb20" ref="editor"></div>-->

    <div class="add-appointment">
      <h3>盘点历史记录</h3>
    </div>
    <el-table :data="appointments">

      <el-table-column prop="id" label="盘点单编号">

      </el-table-column>
      <el-table-column prop="name" label="名称">

      </el-table-column>

      <el-table-column prop="date" label="日期">

      </el-table-column>

      <el-table-column prop="personnel" label="盘点人员">

      </el-table-column>

      <el-table-column prop="item" label="商品">
      </el-table-column>

      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <el-tag
              :type="scope.row.state === '盘点成功' ? 'success' : scope.row.state === '盘点失败' ? 'danger' : ''"
          >
            {{ scope.row.state }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">

        <template #default="{row}">
          <!-- 编辑盘点单 -->

          <el-button type="text" @click="editAppointment(row)" v-if="row.state==='盘点失败'">重新生成盘点单
          </el-button>

        </template>

      </el-table-column>

    </el-table>
    <!-- 添加或编辑盘点单的表单 -->
    <el-dialog v-model="dialogVisible" title="添加/编辑盘点单">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="盘点单名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="formData.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="盘点人员" prop="name">
          <el-input v-model="formData.personnel"></el-input>
        </el-form-item>
        <el-form-item label="商品" prop="name">
          <el-input v-model="formData.item"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- 取消添加或编辑 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 确认添加或编辑 -->
        <el-button type="primary" @click="">确认</el-button>
      </div>
    </el-dialog>

    <!-- 确认取消盘点单的对话框 -->
    <el-dialog v-model="cancelDialogVisible" title="删除盘点单">
      <div style="margin-bottom: 20px;font-size: 18px">确定要删除此盘点单吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消取消盘点单 -->
    <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <!-- 确认取消盘点单 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";

const appointments = ref([]); // 盘点单列表
const services = ref([
   '盘点成功', '盘点失败'
]); // 服务列表
for (let i = 1; i <= 50; i++) {
  const name = `盘点单${i}`;

  const date = new Date(2022, 0, Math.floor(Math.random() * 31) + 1);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const time = `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  const state = services.value[Math.floor(Math.random() * services.value.length)];
  appointments.value.push({
    "id": 10+i,
    "name": name,
    "date": formattedDate,
    "personnel": '员工'+Math.floor(Math.random() * 24),
    "item": '商品'+Math.floor(Math.random() * 24),
    "state": state
  });
}


const cancelDialogVisible = ref(false);

const formData = ref({}); // 添加或编辑盘点单的表单数据
const formRules = ref({
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '日期不能为空', trigger: 'blur' },
  ],
  time: [
    { required: true, message: '时间不能为空', trigger: 'blur' },
  ],
  service: [
    { required: true, message: '服务不能为空', trigger: 'blur' },
  ],
}); // 添加或编辑盘点单的表单验证规则
const dialogVisible = ref(false); // 是否显示添加或编辑盘点单的对话框

// 编辑盘点单
function editAppointment(appointment: any) {
  formData.value = { ...appointment };
  dialogVisible.value = true;
}

function addAppointment() {
  dialogVisible.value = true;
  formData.value = {};
}

// 取消盘点单
function cancelAppointment(appointment: any) {
  cancelDialogVisible.value = true;
  formData.value = { ...appointment };
}

</script>

<style scoped>
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.add-appointment {
  margin-bottom: 20px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 40px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>
