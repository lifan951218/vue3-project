<template>
	<div class="container">
		<div class="mgb20">
			<span class="label">角色：</span>
			<el-select v-model="role" @change="handleChange">
				<el-option label="超级管理员" value="admin"></el-option>
				<el-option label="普通用户" value="user"></el-option>
			</el-select>
		</div>
		<div class="mgb20 tree-wrapper">
			<el-tree
				ref="tree"
				:data="data"
				node-key="id"
				default-expand-all
				show-checkbox
				:default-checked-keys="checkedKeys"
			/>
		</div>
		<el-button type="primary" @click="onSubmit">保存权限</el-button>
	</div>
</template>

<script setup lang="ts" name="permission">
import { ref } from 'vue';
import { ElTree } from 'element-plus';
import { usePermissStore } from '../store/permiss';

const role = ref<string>('admin');

interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}

const data: Tree[] = [
	{
		id: '1',
		label: '管理首页'
	},
	{
		id: '2',
		label: '短信发送',
		children: [
			{
				id: '15',
				label: '快速发送'
			},
			{
				id: '16',
				label: '短信群发'
			}
		]
	},
	{
		id: '4',
		label: '联系人管理',
		children: [
			{
				id: '5',
				label: '联系人列表'
			},
			{
				id: '6',
				label: '导入Excel'
			},
			{
				id: '7',
				label: '导出Excel'
			}
		]
	},
	{
		id: '10',
		label: '回复管理'
	},
	{
		id: '11',
		label: '统计分析'
	},

	{
		id: '13',
		label: '权限管理'
	}
];

const permiss = usePermissStore();

// 获取当前权限
const checkedKeys = ref<string[]>([]);
const getPremission = () => {
	// 请求接口返回权限
	checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = () => {
	// 获取选中的权限
	console.log(tree.value!.getCheckedKeys(false));
};

const handleChange = (val: string[]) => {
	tree.value!.setCheckedKeys(permiss.defaultList[role.value]);
};
</script>

<style scoped>
.tree-wrapper {
	max-width: 500px;
}
.label {
	font-size: 14px;
}
</style>
