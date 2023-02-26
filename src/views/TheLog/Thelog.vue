<template>
	<div class="table-box">
		<div class="thelog-top">
			<div class="left">
				<el-button type="primary" @click='deletelist()'>清空日志面板</el-button>
			</div>
			<div class="right">
				<el-tag class="mx-1" size="large">面板运行日志</el-tag>
			</div>
		</div>

		<!-- 表格外壳 -->
		<div class="table-wrapped">
			<el-table :data="tableData" style="width: 100%" border>
				<el-table-column type="index" width="50" />
				<!-- <el-table-column label="系统注册编号" prop="id"  /> -->
				<el-table-column label="用户" prop="username"  />
				<el-table-column label="登录时间" prop="date" />
			</el-table>
		</div>
	</div>
</template>

<script setup>
	import {
		provide,
		reactive,
		ref,
		onMounted
	} from 'vue'
	import axios from 'axios'
	import { ElMessage } from "element-plus";

	// 表格数据
	const tableData = ref([])
	
	const getusers = async () =>{
		const res = await axios.post('http://127.0.0.1:3007/w/getadmin')
		tableData.value = res.data
	}
	getusers()
	
	const deletelist = async () =>{
		const res = await axios.post('http://127.0.0.1:3007/w/deleteadmin')
		console.log(res)
		ElMessage({
		  message: "清空日志成功",
		  type: "success",
		});
	}
</script>

<style lang="scss" scoped>
	.table-box {
		// 高度百分百
		height: calc(100% - 16px);
		display: flex;
		flex-direction: column;
		background: #eee;
		padding: 8px;

		// 顶部按钮
		.thelog-top {
			padding: 10px 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			margin-bottom: 8px;
			background: white;
		}

		// 表格外壳
		.table-wrapped {
			min-height: 10px;
			padding: 20px 20px 20px 20px;
			background: white;
			margin-bottom: 8px;

			// 表格
			.el-table {
				height: 100%;
			}
		}

		// 分页
		.pagination {
			display: flex;
			justify-content: space-between;
			height: 70px;
			background: white;

			.el-pagination {
				margin-right: 20px;
			}
		}
	}
</style>
