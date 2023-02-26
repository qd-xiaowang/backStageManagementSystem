<!-- 登录页面 -->
<template>
	<div class="login-wrapped">
		<el-card>
			<div class="login-continer">
				<!-- 登录表单 -->
				<div class="login-rtbox">
					<div style='text-align: center;font-size: 20px;font-weight: 600;'>登录</div>
					<!-- <div class="infor" style='text-align: center;'>后台管理系统</div> -->
					<el-form class="login-form" :model="logininfo" :rules="loginrules" ref="loginRef">
						<el-form-item prop="username">
							账号
							<el-input v-model.trim="logininfo.username" placeholder="请输入账号" />
						</el-form-item>
						<el-form-item prop="password">
							登录密码
							<!-- show-password密码的显示和隐藏 -->
							<el-input show-password v-model.trim="logininfo.password" placeholder="请输入登录密码"> </el-input>
						</el-form-item>
						<div style="display: flex;">
						<el-button type="primary" @click="routeSummay">登录</el-button>
						<el-button type="primary" @click="goregis">注册</el-button>
						</div>
					</el-form>
<!-- 					<div style="display: flex;justify-content: center;background-color: #409eff;color: #fff;height: 32px;border-radius: 5px;">
					<router-link to="/reguser" class="registered">注册</router-link>
					</div> -->
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance
	} from 'vue'
	// 引入vue-router的useRouter，目的是为了下面的跳转路由
	import {
		useRouter
	} from 'vue-router'
	import {
		ElMessage
	} from 'element-plus'
	import axios from 'axios'
	import { bus } from "@/utils/mitt.js";
	const router = useRouter()
	// 账号密码
	const logininfo = reactive({
		username: '',
		password: '',
	})
	// 表单验证
	const loginrules = {
		username: [{
			required: true,
			message: '用户名不能为空',
			trigger: 'blur'
		}],
		password: [{
				required: true,
				message: '密码不能为空',
				trigger: 'blur'
			},
			{
				min: 6,
				max: 12,
				message: '密码书写不规范',
				trigger: 'blur'
			},
		],
	}
	const {
		proxy
	} = getCurrentInstance()

	const routeSummay = () => {
		proxy.$refs.loginRef.validate(async (valid) => {
			if (!valid) {
				return
			} else {
				const res = await axios.post('http://127.0.0.1:3007/api/login', logininfo)
				console.log(res.data[0].id)
				if (res.status !== 200)
					return ElMessage({
						message: '登录失败',
						type: 'error',
					})
				// 登录成功
				const date = new Date()
				// 埋点
				const res1 = await axios.post('http://127.0.0.1:3007/w/logindate', {username:logininfo.username,date:date})
				ElMessage.success('登录成功')
				router.push('/product')
			}
		})
	}
	const goregis = () =>{
		router.push('/reguser')
	}
</script>

<style lang="scss" scoped>
	a {
		color: #7396fd;
	}

	// 登录外壳
	.login-wrapped {
		background-color: #fafafa;
		height: 100%;

		// 登录内容
		.login-continer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.img-lfbox {
				display: flex;
				align-items: center;
			}

			.login-rtbox {
				width: 290px;
				height: 370px;
				padding-left: 20px;

				.infor {
					margin-top: 10px;
					color: #333;
					font-size: 16px;
				}

				.login-form {
					margin-top: 30px;
				}

				// 注册
				.registered {
					line-height: 32px;
					font-size: 12px;
					color: #fff;
				}
			}
		}
	}

	.el-card {
		width: 380px;
		height: 320px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.el-button {
		width: 100%;
		margin-bottom: 5px;
	}

	h3 {
		font-size: 24px;
		font-weight: normal;
		margin-bottom: 0;
		margin-top: 0;
	}

	p {
		font-size: 12px;
	}

	span {
		font-size: 12px;
	}
</style>
