<template>
  <!-- 新建项目 -->
  <el-dialog
    v-model="state.FormVisible"
    title="新增物料"
    width="600px"
    align-center
    append-to-body
  >
    <div class="dialog-content">
      <div class="dialog-content-right">
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
      </div>
    </div>
    <template #footer>
      <div class="add">
        <el-button type="primary" @click="addmaterial"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
// import { materiala } from "@/api/index.js";
import axios from 'axios'
const labelPosition = ref("right");

const formLabelAlign = reactive(
{
  title: "",
  category: "",
  transport: "",
  type:'',
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
const emit = defineEmits(["success"]);

const addmaterial = async () => {
  if (formLabelAlign.title) {
	const res = await axios.post('http://127.0.0.1:3007/w/warehouse', formLabelAlign)
    ElMessage({
      message: "新建产品信息成功",
      type: "success",
    });
    state.FormVisible = false;
    emit("success");
  } else {
    ElMessage.error("新建产品失败");
    state.FormVisible = false;
  }
};

const state = reactive({
  FormVisible: false, // 弹窗
});

const open = () => {
  state.FormVisible = true;
};
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.dialog-content {
  display: flex;

  .dialog-content-left {
    flex: 1;
    border-right: 1px solid #eee;
    padding: 20px 30px;

    .template-img {
      margin-bottom: 20px;
      padding: 20px;
      text-align: center;
      background: #fafafa;

      img {
        margin: 0 auto;
      }
    }

    .template-content {
      .template-name {
        line-height: 22px;
        margin-bottom: 5px;
        color: #333;
      }

      .template-desc {
        line-height: 22px;
        margin-bottom: 15px;
        color: #888;
      }

      .template-tips {
        color: #888;

        div {
          margin-bottom: 12px;
        }
      }
    }
  }

  .dialog-content-right {
    padding: 20px 30px;
    flex: 1;
    max-height: 800px;
    overflow: auto;

    .level {
      :deep(.el-input__inner) {
        visibility: hidden;
      }
    }
  }
}

.priority_item {
  border-width: 0;
}

.add {
  display: flex;
  justify-content: flex-end;
}

.el-form-item {
  margin: 30px;
}
</style>
