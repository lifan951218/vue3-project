<template>
  <div class="container">
    <div class="handle-box">
      <el-select v-model="query.address" placeholder="直播间" class="handle-select mr10">
        <el-option key="1" label="直播间1" value="直播间1"></el-option>
        <el-option key="2" label="直播间2" value="直播间2"></el-option>
        <el-option key="3" label="直播间3" value="直播间3"></el-option>

      </el-select>
      <el-input v-model="query.name" placeholder="弹幕内容" class="handle-input mr10"></el-input>
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" :icon="Plus"  @click="addAppointment">发送弹幕</el-button>
    </div>
    <div class="add-appointment">
      <h3>弹幕列表</h3>
    </div>
    <el-table :data="appointments">
      <el-table-column prop="id" label="弹幕编号"></el-table-column>
      <el-table-column prop="name" label="弹幕内容"></el-table-column>
      <!--      <el-table-column prop="phone" label="观看人数"></el-table-column>-->
      <el-table-column prop="date" label="所属直播间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === '正常'">正常</el-tag>
          <el-tag type="info" v-else>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template #default="{row}">
          <!-- 编辑弹幕 -->
          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>
          <!--          <el-button  v-if="row.status === '正常'" type="primary" size="small" @click="editAppointment(row)">进入弹幕间</el-button>-->
          <!-- 取消弹幕 -->
          <el-button v-if="row.status === '正常'" type="danger" size="small" @click="cancelAppointment(row)">删除弹幕</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或编辑弹幕的表单 -->
    <el-dialog v-model="dialogVisible" title="添加/编辑弹幕">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="弹幕内容" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="弹幕编号" prop="date">
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item label="所属直播间" prop="date">
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

    <!-- 确认取消弹幕的对话框 -->
    <el-dialog v-model="cancelDialogVisible" title="删除弹幕">
      <div style="margin-bottom: 20px;font-size: 18px">确定要删除此弹幕吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消删除弹幕 -->
    <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <!-- 确认删除弹幕 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog v-model="startDialogVisible" title="开启弹幕">
      <div style="margin-bottom: 20px;font-size: 18px">确定要开启此弹幕吗？</div>
      <span slot="footer" class="dialog-footer">
    <!-- 取消删除弹幕 -->
    <el-button @click="startDialogVisible = false">取 消</el-button>
        <!-- 确认删除弹幕 -->
    <el-button type="primary" @click="">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import {Plus, Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";

const appointments = ref([]); // 弹幕列表
const services = ref([
  '直播间1', '直播间2', '直播间3'
]);
const services2 = ref([
  '正常', '已删除'
]);
for (let i = 1; i <= 50; i++) {
  const service = services.value[Math.floor(Math.random() * services.value.length)];
  const service2 = services2.value[Math.floor(Math.random() * services2.value.length)];
  appointments.value.push({
    id: i,
    name: `弹幕内容${i}`,
    date: service,
    status: service2,
    phone: Math.floor(Math.random() * 10000),
  });
}


const handleSearch = () => {
  if (query.address !== '') {
    appointments.value = appointments.value.filter(a=>
        a.date === query.address
    )
  }
  if (query.name !== '') {
    appointments.value = appointments.value.filter(a=> {
          console.log(a.name.includes(query.name))
          return a.name.includes(query.name)
        }
    )
  }

}


const cancelDialogVisible = ref(false);
const startDialogVisible = ref(false);

const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10
});

const formData = ref({}); // 添加或编辑弹幕的表单数据
const formRules = ref({
  name: [
    { required: true, message: '弹幕不能为空', trigger: 'blur' },
  ],
  date: [
    { required: true, message: '观看人数码不能为空', trigger: 'blur' },
  ]
}); // 添加或编辑弹幕的表单验证规则
const dialogVisible = ref(false); // 是否显示添加或编辑弹幕的对话框

// 编辑弹幕
function editAppointment(appointment: any) {
  formData.value = { ...appointment };
  dialogVisible.value = true;
}

function startAppointment(appointment: any) {
  formData.value = { ...appointment };
  startDialogVisible.value = true;
}

function addAppointment() {
  dialogVisible.value = true;
  formData.value = {};
}

// 删除弹幕
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
  color: #F56C6C;
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
