<template>
  <el-dialog v-model="centerDialogVisible" title="删除操作" width="30%" center>
    <span> 这将会删除此条仓库信息，请慎重考虑！ </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="moveMaterial2()">取消</el-button>
        <el-button type="primary" @click="moveMaterial1()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { bus } from "@/utils/mitt.js";
import { ElMessage } from "element-plus";
	import axios from "axios";

const moveid = ref();
bus.on("moveid", (id) => {
  moveid.value = id;
});
const emit = defineEmits(["success"]);
// 确认删除
const moveMaterial1 = async () => {
  const res = await axios.post('http://127.0.0.1:3007/w/movewarehouse', {id:moveid.value})
  centerDialogVisible.value = false;
  ElMessage({
    message: "删除成功！",
    type: "success",
  });
  emit("success");
  console.log(res);
};
// 取消删除
const moveMaterial2 = () => {
  ElMessage.error("删除失败！");
  centerDialogVisible.value = false;
};
// 对话框
const centerDialogVisible = ref(false);

const open = () => {
  centerDialogVisible.value = true;
};
// 对话框向外暴露
defineExpose({
  open,
});
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
