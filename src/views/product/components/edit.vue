<!-- 编辑物料 -->
<template>
	<el-dialog v-model="dialogVisible" title="编辑物料" align-center width="600px" append-to-body destroy-on-close>
		<el-main>
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
          :rules="rules"
        >
          <el-form-item label="产品标题" prop="title">
            <el-input v-model="formLabelAlign.title" />
          </el-form-item>
		      <el-form-item label="产品类别" prop="category">
		        <el-select v-model="formLabelAlign.category" placeholder="产品类别">
		          <el-option label="家用" value="家用" />
		          <el-option label="工厂" value="工厂" />
				  <el-option label="企业" value="企业" />
				  <el-option label="环保" value="环保" />
		        </el-select>
		      </el-form-item>
          <el-form-item label="产品途径" prop="transport">
			  <el-select v-model="formLabelAlign.transport" placeholder="产品途径">
			    <el-option label="国产" value="国产" />
			    <el-option label="外企" value="外企" />
			  </el-select>
          </el-form-item>
          <el-form-item label="产品类型" prop="type">
			  <el-select v-model="formLabelAlign.type" placeholder="产品类型">
			    <el-option label="食品饮料" value="食品饮料" />
			    <el-option label="服装纺织" value="服装纺织" />
			    <el-option label="木材加工" value="木材加工" />
				<el-option label="烟草" value="烟草" />
				<el-option label="其他" value="其他" />
			  </el-select>
          </el-form-item>

        </el-form>
			<div class="add">
				<el-button type="primary" @click="sureEdit">确定</el-button>
			</div>
		</el-main>
	</el-dialog>
</template>

<script setup>
	import axios from "axios";
	import {
		reactive,
		ref,
		onMounted
	} from "vue-demi";
	import {
		ElMessage
	} from "element-plus";
	import {
		bus
	} from "@/utils/mitt.js";
	const dialogVisible = ref(false);
	const labelPosition = ref("right");

	const formLabelAlign = reactive({
		title: "",
		category: "",
		type: '',
		transport: "",
	});
const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入产品标题",
      trigger: "change",
    },
  ],
  category: [
    {
      required: true,
      message: "请输入产品类别",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "请输入产品类型",
      trigger: "change",
    },
  ],
  transport: [
    {
      required: true,
      message: "请输入产品途径",
      trigger: "change",
    },
  ],
});

	const editid = ref();
	// 从页面传过来的id
	bus.on("editid", (id) => {
		editid.value = id;

	});
	const emit = defineEmits(["success"]);
	// 执行编辑操作
	const sureEdit = async () => {
		if (
			formLabelAlign
		) {
			const res = await axios.post('http://127.0.0.1:3007/w/editwarehouse', {content:formLabelAlign,id:editid.value})
			dialogVisible.value = false;
			ElMessage({
				message: "修改成功",
				type: "success",
			});
			emit("success");
		} else {
			ElMessage.error("修改失败");
		}
	};

	const open = () => {
		dialogVisible.value = true;
	};

	defineExpose({
		open,
	});
</script>

<style lang="scss" scoped>
	:deep(.el-checkbox__label) {
		color: #888;
	}

	.el-main {
		max-height: 750px;
	}

	.tou {
		border-radius: 100%;

		.title {
			transform: scale(0.8);
			color: #fff;
		}
	}

	:deep(.el-input.is-disabled .el-input__wrapper) {
		background-color: transparent;
		box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
	}

	:deep(.el-input.is-disabled .el-input__inner) {
		color: #333;
		-webkit-text-fill-color: #333;
		text-overflow: ellipsis;
	}

	:deep(.el-input) {
		--el-input-text-color: #333;
	}

	.tiem {
		--el-component-size: 40px;

		:deep(.el-date-editor) {
			width: 100%;
		}
	}

	// 边框hover变蓝
	.el-input {
		--el-input-hover-border-color: #409eff !important;
	}

	.el-select {
		--el-select-border-color-hover: #409eff;
	}

	:deep(.el-input) {
		--el-input-hover-border: #409eff;
	}

	:deep(.el-input__wrapper:hover) {
		box-shadow: 0 0 0 1px #409eff inset;
	}

	:deep(.el-textarea__inner:hover) {
		box-shadow: 0 0 0 1px #409eff inset;
	}

	// 模糊搜索输入框
	:deep(.el-input__wrapper) {
		width: 368px !important;
		height: 40px !important;
	}

	.add {
		display: flex;
		justify-content: flex-end;
	}
</style>
