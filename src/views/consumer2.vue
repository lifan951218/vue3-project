<template>
  <div class="container">

    <div class="add-appointment">
      <el-button type="primary" :icon="Plus" @click="addAppointment">新增客户</el-button>
    </div>
    <div class="add-appointment">
      <h3>客户列表</h3>
    </div>
    <el-table :data="appointments">

      <el-table-column prop="id" label="客户编号"></el-table-column>
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="dep" label="所属公司"></el-table-column>

      <el-table-column prop="date" label="级别">

      </el-table-column>

      <el-table-column label="操作">

        <template #default="{row}">
          <!-- 编辑客户 -->

          <el-button type="primary" size="small" @click="editAppointment(row)">编辑
          </el-button>

          <!-- 取消客户 -->

          <el-button type="danger" size="small" @click="cancelAppointment(row)">删除
          </el-button>

        </template>

      </el-table-column>

    </el-table>
    <!-- 添加或编辑客户的表单 -->
    <el-dialog v-model="dialogVisible" title="添加/编辑客户">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="客户" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="date">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="date">
          <el-input v-model="formData.dep"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="date">
          <el-input v-model="formData.date"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- 取消添加或编辑 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 确认添加或编辑 -->
        <el-button type="primary" @click="">确认</el-button>
      </div>
    </el-dialog>

    <!-- 确认取消客户的对话框 -->
    <el-dialog v-model="cancelDialogVisible" title="删除客户">
      <div style="margin-bottom: 20px;font-size: 18px">确定要删除此客户吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消删除客户 -->
    <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <!-- 确认删除客户 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";

const appointments = ref([]); // 客户列表
const services = ref([
  '普通客户', 'VIP', 'SVIP'
]);
const services2 = ref([
  '公司1', '公司2', '公司3', '公司4', '公司5', '公司6', '公司7'
]);
for (let i = 1; i <= 50; i++) {
  const service = services.value[Math.floor(Math.random() * services.value.length)];
  const service2 = services2.value[Math.floor(Math.random() * services2.value.length)];
  appointments.value.push({
    id: i,
    name: `客户${i}`,
    date: service,
    dep: service2,
    phone: `138234578${i.toString().padStart(2, '0')}`,
  });
}



const cancelDialogVisible = ref(false);

const formData = ref({}); // 添加或编辑客户的表单数据
const formRules = ref({
  name: [
    { required: true, message: '客户不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
  ]
}); // 添加或编辑客户的表单验证规则
const dialogVisible = ref(false); // 是否显示添加或编辑客户的对话框

// 编辑客户
function editAppointment(appointment: any) {
  formData.value = { ...appointment };
  dialogVisible.value = true;
}

function addAppointment() {
  dialogVisible.value = true;
  formData.value = {};
}

// 删除客户
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
