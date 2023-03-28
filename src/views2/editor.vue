<template>
	<div class="container">
    <div style="margin-bottom: 20px">
      请选择联系人
      <el-select v-model="value2" placeholder="请选择">
        <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </div>
		<div class="mgb20" ref="editor"></div>
		<el-button type="primary" @click="syncHTML">发送</el-button>
	</div>
</template>

<script setup lang="ts" name="editor">
import WangEditor from 'wangeditor';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';


const users = reactive([
  {
    value: 'admin',
    label: '联系人1'
  },
  {
    value: 'user',
    label: '联系人2'
  }
]);
const editor = ref(null);
const content = reactive({
	html: '',
	text: ''
});
let instance: any;
onMounted(() => {
	instance = new WangEditor(editor.value);
	instance.config.zIndex = 1;
	instance.create();
});
onBeforeUnmount(() => {
	instance.destroy();
	instance = null;
});
const syncHTML = () => {
	content.html = instance.txt.html();
	console.log(content.html);
};
</script>

<style></style>
