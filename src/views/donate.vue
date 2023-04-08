<template>
  <div class="container">

    <div class="add-appointment">
      <el-button type="primary" :icon="Plus" @click="addAppointment">新增库存</el-button>
    </div>
    <div class="add-appointment">
      <h3>库存列表</h3>
    </div>
    <el-table :data="appointments">

      <el-table-column prop="name" label="库存名称">

      </el-table-column>

      <el-table-column prop="type" label="库存类型">

      </el-table-column>

      <el-table-column prop="date" label="入库日期">

      </el-table-column>


      <el-table-column prop="service" label="所属部门">

      </el-table-column>

      <el-table-column label="操作">

        <template #default="{row}">
          <!-- 编辑库存 -->

          <el-button type="text" @click="editAppointment(row)">编辑
          </el-button>

          <!-- 取消库存 -->

          <el-button type="text" @click="cancelAppointment(row)">删除
          </el-button>

        </template>

      </el-table-column>

    </el-table>
    <!-- 添加或编辑库存的表单 -->
    <el-dialog v-model="dialogVisible" title="添加/编辑库存">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="库存名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item><el-form-item label="库存类型" prop="name">
        <el-input v-model="formData.type"></el-input>
      </el-form-item>
        <el-form-item label="入库日期" prop="date">
          <el-date-picker v-model="formData.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属部门" prop="service">
          <el-select v-model="formData.service">
            <el-option v-for="service in services" :key="service" :label="service" :value="service"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- 取消添加或编辑 -->
        <el-button @click="dialogVisible = false">取消</el-button>
        <!-- 确认添加或编辑 -->
        <el-button type="primary" @click="">确认</el-button>
      </div>
    </el-dialog>

    <!-- 确认取消库存的对话框 -->
    <el-dialog v-model="cancelDialogVisible" title="删除库存">
      <div style="margin-bottom: 20px;font-size: 18px">确定要删除此库存吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消取消库存 -->
    <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <!-- 确认取消库存 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";

const appointments = ref([]); // 库存列表
const services = ref([
  '部门1', '部门2', '部门3', '部门4', '部门5', '部门6'
]); // 所属部门列表
const types = ref([
  '商品2', '商品5','商品6', '商品7', '商品8', '商品9', '商品10', '商品11'
]); // 所属部门列表
for (let i = 1; i <= 50; i++) {
  const name = `库存${i}`;

  const date = new Date(2022, 0, Math.floor(Math.random() * 31) + 1);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const service = services.value[Math.floor(Math.random() * services.value.length)];
  const type = types.value[Math.floor(Math.random() * types.value.length)];
  appointments.value.push({
    "name": name,
    "date": formattedDate,
    "service": service,
    "type": type
  });
}


const cancelDialogVisible = ref(false);

const formData = ref({}); // 添加或编辑库存的表单数据
const formRules = ref({
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '日期不能为空', trigger: 'blur' },
  ],
  service: [
    { required: true, message: '所属部门不能为空', trigger: 'blur' },
  ],
}); // 添加或编辑库存的表单验证规则
const dialogVisible = ref(false); // 是否显示添加或编辑库存的对话框

// 编辑库存
function editAppointment(appointment: any) {
  formData.value = { ...appointment };
  dialogVisible.value = true;
}

function addAppointment() {
  dialogVisible.value = true;
  formData.value = {};
}

// 取消库存
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
