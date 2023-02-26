<template>
	<div class="user-Container">
		<div class="user-top">
			<el-button type="primary"  @click="addMaterial" > 点击添加产品 </el-button>
			<div>产品一览表</div>
		</div>
		<div class="user-mian">
			<el-table stripe :data="tableData" width="100%">
				<el-table-column type="index" width="50" />
				<el-table-column label="产品编号" prop="id" />
				<el-table-column label="产品标题" prop="title" />
				<el-table-column label="产品类别" prop="category" />
				<el-table-column label="产品途径" prop="transport" />
				<el-table-column label="产品类型" prop="type" />
				<el-table-column label="操作" width="200">
					<template #default="{ row }">
						<div v-if='row.category'>
							<el-button type="success"  @click="openEdit(row.id)" >编辑</el-button>
							<el-button type="danger"  @click="moveMat(row.id)" >删除</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
	<create ref="createMaterial" @success="getMList"></create>
	<edit ref="editMaterial" @success="getMList"></edit>
	<move ref="moveMaterial"  @success="getMList"></move>
</template>

<script setup>
	import {
		reactive,ref
	} from '@vue/reactivity'
	import {  onMounted } from 'vue'
	// 新建
	import create from "./components/create.vue";
	// 编辑
	import edit from "./components/edit.vue";
	// 删除
	import move from "./components/move.vue";
	import axios from 'axios'
	import { bus } from "@/utils/mitt.js";
	onMounted(()=>{
		getMList()
	})

	
	// 新建
	const createMaterial = ref();
	// 编辑
	const editMaterial = ref();
	// 删除
	const moveMaterial = ref();
	// 表格数据
	let tableData = ref([])
	
	const getMList = async () => {
		const res = await axios.post('http://127.0.0.1:3007/w/getwarehouse')
		tableData.value = res.data
	};

	
	const addMaterial = () => {
	  createMaterial.value.open();
	};
	
	const openEdit = (id) => {
	  bus.emit("editid", id);
	  editMaterial.value.open();
	};
	const moveMat = (id) => {
	  bus.emit("moveid", id);
	  moveMaterial.value.open();
	};
</script>

<style lang="scss" scoped>
	.user-Container {
		height: calc(100% - 16px);
		display: flex;
		flex-direction: column;
		background: #eee;
		padding: 8px;

		// 顶部
		.user-top {
			padding: 10px 20px;
			display: flex;
			align-items: center;
			height: 50px;
			justify-content: space-between;
			background: white;

			div {
				display: flex;
				justify-content: space-between;

				.el-button {
					margin-left: 5px;
				}
			}
		}

		// 外壳
		.user-mian {
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
		.user-footer {
			// margin: 5px 20px 20px 20px;
			// padding-top: 15px;
			display: flex;
			justify-content: space-between;
			height: 70px;
			background: white;
		}
	}
</style>
