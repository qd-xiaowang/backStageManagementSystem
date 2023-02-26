<template>
	<div class="common-layout">
		<el-container>
			<el-menu default-active="1" class="el-menu-vertical-demo" router>
				<div class="title">后台管理系统</div>
				<el-menu-item index="detail">
					<span>数据详情</span>
				</el-menu-item>
				<el-menu-item index="product">

					<span>产品列表</span>
				</el-menu-item>
				<el-menu-item index="thelog">

					<span>登录日志</span>
				</el-menu-item>
				<el-menu-item index="login">

					<span>退出登录</span>
				</el-menu-item>
			</el-menu>
			<!-- 内容 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		Document,
		Menu as IconMenu,
		Location,
		Setting,
	} from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
	.common-layout {
		height: 100%;

		.el-container {
			height: 100%;

			// 菜单
			.el-menu {
				background: #545c64;
				width: 210px;

				// 标题
				.title {
					padding: 20px;
					display: flex;
					justify-content: center;
					color: #fff;
				}

				// 菜单选项
				.el-menu-item {
					color: #fff;
				}
			}

			// 主要内容
			.el-main {
				padding: 0;
				display: flex;
				flex-direction: column;
			}

		}
	}
</style>
