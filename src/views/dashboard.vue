<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 302px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						上次登录时间：
						<span>2022-10-01</span>
					</div>
					<div class="user-info-list">
						上次登录地点：
						<span>上海</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="mgb20">
					<el-col :span="12">
            <div class="schart-box">
              <!--			<div class="content-title">饼状图</div>-->
              <schart class="schart" canvasId="pie" :options="options3"></schart>
            </div>
          </el-col>
          <el-col  :span="12">
            <div class="schart-box">
              <!--			<div class="content-title">环形图</div>-->
              <schart class="schart" canvasId="ring" :options="options4"></schart>
            </div>
          </el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>

		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { reactive } from 'vue';
import imgurl from '../assets/img/admin.jpg';

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';

const options = {
	type: 'bar',
	title: {
		text: '最近一周短信回复情况'
	},
	xRorate: 25,
	labels: ['周一', '周二', '周三', '周四', '周五'],
	datasets: [
		{
			label: '已回复',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: '已读未回复',
			data: [164, 178, 190, 135, 160]
		},
		{
			label: '未读',
			data: [144, 198, 150, 235, 120]
		}
	]
};
const options2 = {
	type: 'line',
	title: {
		text: '过去7天产品检测合格率趋势'
	},
	labels: [
      '10-24',
      '10-25',
      '10-26',
      '10-27',
      '10-28',
      '10-29',
      '10-30'
  ],
	datasets: [
		{
			label: '自有产品',
			data: [
          85.2,
        85.3,
        89.5,
        95.6,
        95.7,
        95.8,
        95.9
      ]
		},
		{
			label: '外部产品',
			data: [72.4,  72.5, 78.6, 82.7, 82.8, 82.9, 83.2]
		}
	]
};
const todoList = reactive([
	{
		title: '今天要修复100个bug',
		status: false
	},
	{
		title: '今天要修复100个bug',
		status: false
	},
	{
		title: '今天要写100行代码加几个bug吧',
		status: false
	},
	{
		title: '今天要修复100个bug',
		status: false
	},
	{
		title: '今天要修复100个bug',
		status: true
	},
	{
		title: '今天要写100行代码加几个bug吧',
		status: true
	}
]);

const options3 = {
  type: 'pie',
  title: {
    text: '已完成检测产品质量饼状图'
  },
  legend: {
    position: 'left'
  },
  bgColor: '#fbfbfb',
  labels: ['合格', '待定', '不合格'],
  datasets: [
    {
      data: [364, 58, 12]
    }
  ]
};
const options4 = {
  type: 'ring',
  title: {
    text: '质量检测进度'
  },
  showValue: false,
  legend: {
    position: 'bottom',
    bottom: 40
  },
  bgColor: '#fbfbfb',
  labels: ['未完成', '已完成'],
  datasets: [
    {
      data: [500, 1546]
    }
  ]
};
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
