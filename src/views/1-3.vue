<template>
  <div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="数据库类型">
        <el-select v-model="form.dbType" placeholder="请选择数据库类型">
          <el-option label="MySQL" value="mysql"></el-option>
          <el-option label="PostgreSQL" value="postgresql"></el-option>
          <el-option label="SQL Server" value="sqlserver"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主机地址">
        <el-input v-model="form.host"></el-input>
      </el-form-item>
      <el-form-item label="端口号">
        <el-input v-model="form.port"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称">
        <el-input v-model="form.database"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align: center; margin-top: 20px;">
      <el-button type="primary" @click="testConnection">测试连接</el-button>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      form: {
        dbType: '',
        host: '127.0.0.1',
        port: '3306',
        database: 'test',
        username: 'admin',
        password: '123456'
      }
    };
  },
  methods: {
    testConnection() {
      ElMessage.success("连接成功！")
    }
  }
};
</script>