<!-- 登录页面 -->
<template>
	<div class="login-wrapped">
		<el-card>
			<div class="login-continer">
				<!-- 登录表单 -->
				<div class="login-rtbox">
					<div style='text-align: center;font-size: 20px;font-weight: 600;'>注册</div>
					<el-form class="login-form" :model="reguserinfo" ref="reguserRef" :rules="reguserrules"  :label-position="labelPosition">
						<el-form-item prop="username" label="账号">
							<el-input v-model.trim="reguserinfo.username" placeholder="请输入账号" />
						</el-form-item>
						<el-form-item prop="password" label="密码">
							<!-- show-password密码的显示和隐藏 -->
							<el-input show-password v-model.trim="reguserinfo.password" placeholder="请输入登录密码">
							</el-input>
						</el-form-item>
						<div style="display: flex;">
						<el-button type="primary" @click="routeSummay">点击注册</el-button>
						<el-button type="primary" @click="gologin">返回登录</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import {
		ref,
		reactive,
		getCurrentInstance
	} from 'vue'
	import {
		ElMessage
	} from 'element-plus'
	import {
		useRouter
	} from 'vue-router'
	const router = useRouter()
const labelPosition = ref('top')
	const reguserinfo = reactive({
		username: '',
		password: '',
	})
	// 表单验证
	const reguserrules = {
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
		proxy.$refs.reguserRef.validate(async (valid) => {
			if (!valid) {
				return
			} else {
				const res = await axios.post('http://127.0.0.1:3007/api/reguser', reguserinfo)
				console.log(res)
				if (res.status !== 200) return ElMessage.error('注册失败')
				if (res.data.status !== 1) {
					ElMessage.success(res.data.message)
				} else {
					ElMessage.error(res.data.message)
				}
				// 重置表单
				proxy.$refs.reguserRef.resetFields()
			}
		})
	}
	const gologin = () =>{
		router.push('/login')
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

				.pic {
					width: 300px;
					height: 270px;
				}
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
