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
		label: '首页'
	},
	{
		id: '2',
		label: '产品质量检测',
		children: [
			{
				id: '15',
				label: '实时检测'
			},
			{
				id: '16',
				label: '分类查询'
			}
		]
	},
	{
		id: '4',
		label: '数据分析工具',
		children: [
			{
				id: '5',
				label: '报告生成器'
			},
			{
				id: '6',
				label: '可视化工具'
			}
		]
	},
	{
		id: '10',
		label: '通知与提醒',
    children: [
      {
        id: '5',
        label: '异常检测通知'
      },
      {
        id: '6',
        label: '重要信息'
      }
    ]
	},
	{
		id: '11',
		label: '设置与账户管理',
    children: [
      {
        id: '5',
        label: '用户账户'
      },
      {
        id: '6',
        label: '数据备份'
      }
    ]
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
