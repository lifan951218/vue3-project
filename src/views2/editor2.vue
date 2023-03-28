<template>
	<div class="container">
		<div style="margin-bottom: 20px">
			请选择模板
			<el-select v-model="value" placeholder="请选择">
				<el-option
					v-for="item in items"
					:key="item.value"
          :label="item.label"
          :value="item.value">
				</el-option>
			</el-select>
		</div>
    <div style="margin-bottom: 20px">
      请选择群组
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
		<el-button type="primary" @click="syncHTML">开始群发</el-button>
	</div>
</template>

<script setup lang="ts" name="editor">
import WangEditor from 'wangeditor';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
const items = reactive([
	{
		value: 'html',
		label: '模板1'
	},
	{
		value: 'css',
		label: '模板2'
	},
	{
		value: 'js',
		label: '模板3'
	}
]);
const users = reactive([
	{
		value: 'admin',
		label: '联系人组1'
	},
	{
		value: 'user',
		label: '联系人组2'
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
