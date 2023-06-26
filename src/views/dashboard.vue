<template>
  <div>
    <el-button type="primary" @click="showRoleDialog">添加角色</el-button>

    <el-dialog
        title="添加角色"
        :visible.sync="roleDialogVisible"
        width="30%"
        center
        :close-on-click-modal="false"
    >
      <el-form ref="roleForm" :model="roleForm" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoleDialog">取消</el-button>
        <el-button type="primary" @click="addRole">确认</el-button>
      </div>
    </el-dialog>

    <el-table :data="roles" style="margin-top: 20px">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="editRole(row)">编辑</el-button>
          <el-button type="text" @click="deleteRole(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const roles = ref([
  { id: 1, name: '管理员', description: '拥有全部权限' },
  { id: 2, name: '普通用户', description: '具有部分权限' },
]);

const roleForm = reactive({
  name: '',
  description: '',
});

const roleDialogVisible = ref(false);

const showRoleDialog = () => {
  roleForm.name = '';
  roleForm.description = '';
  roleDialogVisible.value = true;
};

const closeRoleDialog = () => {
  roleDialogVisible.value = false;
};

const addRole = () => {
  if (roleForm.name.trim() === '') {
    // 角色名称不能为空
    return;
  }

  const newRole = {
    id: roles.value.length + 1,
    name: roleForm.name,
    description: roleForm.description,
  };

  roles.value.push(newRole);
  closeRoleDialog();
};

const editRole = (row) => {
  roleForm.name = row.name;
  roleForm.description = row.description;
  roleDialogVisible.value = true;
};

const deleteRole = (row) => {
  const index = roles.value.findIndex((role) => role.id === row.id);
  if (index !== -1) {
    roles.value.splice(index, 1);
  }
};
</script>

<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="add-appointment">-->
<!--      <h3>直播列表</h3>-->
<!--    </div>-->
<!--    <el-tabs v-model="message">-->
<!--      <el-tab-pane label="游戏" name="1">-->
<!--        <el-table :data="appointments">-->

<!--          <el-table-column prop="id" label="直播编号"></el-table-column>-->
<!--          <el-table-column prop="name" label="直播标题"></el-table-column>-->
<!--          <el-table-column prop="phone" label="观看人数"></el-table-column>-->
<!--          <el-table-column prop="date" label="类型"></el-table-column>-->
<!--          <el-table-column prop="status" label="状态">-->
<!--            <template #default="scope">-->
<!--              <el-tag type="success" v-if="scope.row.status === '直播中'">直播中</el-tag>-->
<!--              <el-tag type="info" v-else>已关闭</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作" width="280">-->
<!--            <template #default="{row}">-->
<!--              &lt;!&ndash; 编辑直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>&ndash;&gt;-->
<!--              <el-button  v-if="row.status === '直播中'" type="primary" size="small" @click="editAppointment(row)">进入直播间</el-button>-->
<!--              <el-button  v-if="row.status === '已关闭'" type="primary" size="small" @click="startAppointment(row)">启动直播</el-button>-->
<!--              <el-button type="primary" size="small" @click="startAppointment(row)">收藏</el-button>-->

<!--              &lt;!&ndash; 取消直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->

<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="户外" name="2">-->
<!--        <el-table :data="appointments2">-->

<!--          <el-table-column prop="id" label="直播编号"></el-table-column>-->
<!--          <el-table-column prop="name" label="直播标题"></el-table-column>-->
<!--          <el-table-column prop="phone" label="观看人数"></el-table-column>-->
<!--          <el-table-column prop="date" label="类型"></el-table-column>-->
<!--          <el-table-column prop="status" label="状态">-->
<!--            <template #default="scope">-->
<!--              <el-tag type="success" v-if="scope.row.status === '直播中'">直播中</el-tag>-->
<!--              <el-tag type="info" v-else>已关闭</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作" width="280">-->
<!--            <template #default="{row}">-->
<!--              &lt;!&ndash; 编辑直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>&ndash;&gt;-->
<!--              <el-button  v-if="row.status === '直播中'" type="primary" size="small" @click="editAppointment(row)">进入直播间</el-button>-->
<!--              <el-button  v-if="row.status === '已关闭'" type="primary" size="small" @click="startAppointment(row)">启动直播</el-button>-->
<!--              <el-button type="primary" size="small" @click="startAppointment(row)">收藏</el-button>-->

<!--              &lt;!&ndash; 取消直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="体育" name="3">-->
<!--        <el-table :data="appointments3">-->

<!--          <el-table-column prop="id" label="直播编号"></el-table-column>-->
<!--          <el-table-column prop="name" label="直播标题"></el-table-column>-->
<!--          <el-table-column prop="phone" label="观看人数"></el-table-column>-->
<!--          <el-table-column prop="date" label="类型"></el-table-column>-->
<!--          <el-table-column prop="status" label="状态">-->
<!--            <template #default="scope">-->
<!--              <el-tag type="success" v-if="scope.row.status === '直播中'">直播中</el-tag>-->
<!--              <el-tag type="info" v-else>已关闭</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作" width="280">-->
<!--            <template #default="{row}">-->
<!--              &lt;!&ndash; 编辑直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>&ndash;&gt;-->
<!--              <el-button  v-if="row.status === '直播中'" type="primary" size="small" @click="editAppointment(row)">进入直播间</el-button>-->
<!--              <el-button  v-if="row.status === '已关闭'" type="primary" size="small" @click="startAppointment(row)">启动直播</el-button>-->
<!--              <el-button type="primary" size="small" @click="startAppointment(row)">收藏</el-button>-->

<!--              &lt;!&ndash; 取消直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="才艺" name="4">-->
<!--        <el-table :data="appointments4">-->

<!--          <el-table-column prop="id" label="直播编号"></el-table-column>-->
<!--          <el-table-column prop="name" label="直播标题"></el-table-column>-->
<!--          <el-table-column prop="phone" label="观看人数"></el-table-column>-->
<!--          <el-table-column prop="date" label="类型"></el-table-column>-->
<!--          <el-table-column prop="status" label="状态">-->
<!--            <template #default="scope">-->
<!--              <el-tag type="success" v-if="scope.row.status === '直播中'">直播中</el-tag>-->
<!--              <el-tag type="info" v-else>已关闭</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作" width="280">-->
<!--            <template #default="{row}">-->
<!--              &lt;!&ndash; 编辑直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>&ndash;&gt;-->
<!--              <el-button  v-if="row.status === '直播中'" type="primary" size="small" @click="editAppointment(row)">进入直播间</el-button>-->
<!--              <el-button  v-if="row.status === '已关闭'" type="primary" size="small" @click="startAppointment(row)">启动直播</el-button>-->
<!--              <el-button type="primary" size="small" @click="startAppointment(row)">收藏</el-button>-->

<!--              &lt;!&ndash; 取消直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="科技" name="5">-->
<!--        <el-table :data="appointments5">-->

<!--          <el-table-column prop="id" label="直播编号"></el-table-column>-->
<!--          <el-table-column prop="name" label="直播标题"></el-table-column>-->
<!--          <el-table-column prop="phone" label="观看人数"></el-table-column>-->
<!--          <el-table-column prop="date" label="类型"></el-table-column>-->
<!--          <el-table-column prop="status" label="状态">-->
<!--            <template #default="scope">-->
<!--              <el-tag type="success" v-if="scope.row.status === '直播中'">直播中</el-tag>-->
<!--              <el-tag type="info" v-else>已关闭</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="操作" width="280">-->
<!--            <template #default="{row}">-->
<!--              &lt;!&ndash; 编辑直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button type="primary" size="small" @click="editAppointment(row)">编辑</el-button>&ndash;&gt;-->
<!--              <el-button  v-if="row.status === '直播中'" type="primary" size="small" @click="editAppointment(row)">进入直播间</el-button>-->
<!--              <el-button type="primary" size="small" @click="startAppointment(row)">收藏</el-button>-->
<!--&lt;!&ndash;              <el-button  v-if="row.status === '已关闭'" type="primary" size="small" @click="startAppointment(row)">启动直播</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash; 取消直播 &ndash;&gt;-->
<!--              &lt;!&ndash;          <el-button v-if="row.status === '直播中'" type="danger" size="small" @click="cancelAppointment(row)">关闭直播</el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->

<!--&lt;!&ndash;    <div class="add-appointment">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-button type="primary" :icon="Plus" @click="addAppointment">创建直播</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--    &lt;!&ndash; 添加或编辑直播的表单 &ndash;&gt;-->
<!--    <el-dialog v-model="dialogVisible" title="直播间">-->
<!--&lt;!&ndash;      <el-form :model="formData" :rules="formRules">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="直播标题" prop="name">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="formData.name"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="直播编号" prop="date">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="formData.id"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="类型" prop="date">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="formData.date"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form>&ndash;&gt;-->
<!--      <el-image v-model:src="imgurl"></el-image>-->
<!--      <div slot="footer">-->
<!--        &lt;!&ndash; 取消添加或编辑 &ndash;&gt;-->
<!--&lt;!&ndash;        <el-button @click="dialogVisible = false">取消</el-button>&ndash;&gt;-->
<!--        &lt;!&ndash; 确认添加或编辑 &ndash;&gt;-->
<!--        <el-button type="primary" @click="">退出</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

<!--    &lt;!&ndash; 确认取消直播的对话框 &ndash;&gt;-->
<!--    <el-dialog v-model="cancelDialogVisible" title="关闭直播">-->
<!--      <div style="margin-bottom: 20px;font-size: 18px">确定要关闭此直播吗？</div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    &lt;!&ndash; 取消关闭直播 &ndash;&gt;-->
<!--    <el-button @click="cancelDialogVisible = false">取 消</el-button>-->
<!--        &lt;!&ndash; 确认关闭直播 &ndash;&gt;-->
<!--    <el-button type="primary" @click="">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->

<!--    <el-dialog v-model="startDialogVisible" title="收藏直播">-->
<!--      <div style="margin-bottom: 20px;font-size: 18px">确定要收藏此直播吗？</div>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    &lt;!&ndash; 取消关闭直播 &ndash;&gt;-->
<!--    <el-button @click="startDialogVisible = false">取 消</el-button>-->
<!--        &lt;!&ndash; 确认关闭直播 &ndash;&gt;-->
<!--    <el-button type="primary" @click="">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts" name="dashboard">-->
<!--import {Plus} from "@element-plus/icons-vue";-->
<!--import {ref} from "vue";-->
<!--import imgurl from '../assets/img/zhibo.jpeg';-->
<!--const message = ref("1");-->
<!--const appointments = ref([]); // 直播列表-->
<!--const appointments2 = ref([]); // 直播列表-->
<!--const appointments3 = ref([]); // 直播列表-->
<!--const appointments4 = ref([]); // 直播列表-->
<!--const appointments5 = ref([]); // 直播列表-->
<!--const services = ref([-->
<!--  '游戏',  '户外',  '体育', '才艺','科技', '其他'-->
<!--]);-->
<!--const services2 = ref([-->
<!--  '直播中'-->
<!--  // , '已关闭'-->
<!--]);-->
<!--for (let i = 1; i <= 50; i++) {-->
<!--  const service = services.value[Math.floor(Math.random() * services.value.length)];-->
<!--  const service2 = services2.value[Math.floor(Math.random() * services2.value.length)];-->
<!--  appointments.value.push({-->
<!--    id: i,-->
<!--    name: `直播标题${i}`,-->
<!--    date: services.value[0],-->
<!--    status: service2,-->
<!--    phone: Math.floor(Math.random() * 10000),-->
<!--  });-->
<!--  appointments2.value.push({-->
<!--    id: i,-->
<!--    name: `直播标题${i}`,-->
<!--    date: services.value[1],-->
<!--    status: service2,-->
<!--    phone: Math.floor(Math.random() * 10000),-->
<!--  });-->
<!--  appointments3.value.push({-->
<!--    id: i,-->
<!--    name: `直播标题${i}`,-->
<!--    date: services.value[2],-->
<!--    status: service2,-->
<!--    phone: Math.floor(Math.random() * 10000),-->
<!--  });-->
<!--  appointments4.value.push({-->
<!--    id: i,-->
<!--    name: `直播标题${i}`,-->
<!--    date: services.value[3],-->
<!--    status: service2,-->
<!--    phone: Math.floor(Math.random() * 10000),-->
<!--  });-->
<!--  appointments5.value.push({-->
<!--    id: i,-->
<!--    name: `直播标题${i}`,-->
<!--    date: services.value[4],-->
<!--    status: service2,-->
<!--    phone: Math.floor(Math.random() * 10000),-->
<!--  });-->
<!--}-->



<!--const cancelDialogVisible = ref(false);-->
<!--const startDialogVisible = ref(false);-->

<!--const formData = ref({}); // 添加或编辑直播的表单数据-->
<!--const formRules = ref({-->
<!--  name: [-->
<!--    { required: true, message: '直播不能为空', trigger: 'blur' },-->
<!--  ],-->
<!--  date: [-->
<!--    { required: true, message: '观看人数码不能为空', trigger: 'blur' },-->
<!--  ]-->
<!--}); // 添加或编辑直播的表单验证规则-->
<!--const dialogVisible = ref(false); // 是否显示添加或编辑直播的对话框-->

<!--// 编辑直播-->
<!--function editAppointment(appointment: any) {-->
<!--  formData.value = { ...appointment };-->
<!--  dialogVisible.value = true;-->
<!--}-->

<!--function startAppointment(appointment: any) {-->
<!--  formData.value = { ...appointment };-->
<!--  startDialogVisible.value = true;-->
<!--}-->

<!--function addAppointment() {-->
<!--  dialogVisible.value = true;-->
<!--  formData.value = {};-->
<!--}-->

<!--// 关闭直播-->
<!--function cancelAppointment(appointment: any) {-->
<!--  cancelDialogVisible.value = true;-->
<!--  formData.value = { ...appointment };-->
<!--}-->

<!--</script>-->

<!--<style scoped>-->
<!--.el-row {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.grid-content {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  height: 100px;-->
<!--}-->

<!--.add-appointment {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.grid-cont-right {-->
<!--  flex: 1;-->
<!--  text-align: center;-->
<!--  font-size: 14px;-->
<!--  color: #999;-->
<!--}-->

<!--.grid-num {-->
<!--  font-size: 30px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.grid-con-icon {-->
<!--  font-size: 50px;-->
<!--  width: 100px;-->
<!--  height: 100px;-->
<!--  text-align: center;-->
<!--  line-height: 100px;-->
<!--  color: #fff;-->
<!--}-->

<!--.grid-con-1 .grid-con-icon {-->
<!--  background: rgb(45, 140, 240);-->
<!--}-->

<!--.grid-con-1 .grid-num {-->
<!--  color: rgb(45, 140, 240);-->
<!--}-->

<!--.grid-con-2 .grid-con-icon {-->
<!--  background: rgb(100, 213, 114);-->
<!--}-->

<!--.grid-con-2 .grid-num {-->
<!--  color: rgb(100, 213, 114);-->
<!--}-->

<!--.grid-con-3 .grid-con-icon {-->
<!--  background: rgb(242, 94, 67);-->
<!--}-->

<!--.grid-con-3 .grid-num {-->
<!--  color: rgb(242, 94, 67);-->
<!--}-->

<!--.user-info {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  padding-bottom: 20px;-->
<!--  border-bottom: 2px solid #ccc;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.user-info-cont {-->
<!--  padding-left: 50px;-->
<!--  flex: 1;-->
<!--  font-size: 14px;-->
<!--  color: #999;-->
<!--}-->

<!--.user-info-cont div:first-child {-->
<!--  font-size: 30px;-->
<!--  color: #222;-->
<!--}-->

<!--.user-info-list {-->
<!--  font-size: 14px;-->
<!--  color: #999;-->
<!--  line-height: 25px;-->
<!--}-->

<!--.user-info-list span {-->
<!--  margin-left: 70px;-->
<!--}-->

<!--.mgb20 {-->
<!--  margin-bottom: 40px;-->
<!--}-->

<!--.todo-item {-->
<!--  font-size: 14px;-->
<!--}-->

<!--.todo-item-del {-->
<!--  text-decoration: line-through;-->
<!--  color: #999;-->
<!--}-->

<!--.schart {-->
<!--  width: 100%;-->
<!--  height: 300px;-->
<!--}-->
<!--</style>-->
