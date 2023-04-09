<template>
    <el-config-provider :locale="zhCn" namespace="el">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { onMounted } from 'vue'

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#a66e19');
  document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
  document.body.style.setProperty('--el-color-primary-light-3', '#af6e24');
})

</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
