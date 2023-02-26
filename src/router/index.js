import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
const routes = [{
		path: '/',
		redirect: '/login' //路由重定向 默认跳转至login页面
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/Login/index.vue'),
	},
	{
    name: 'reguser',
		path: '/reguser',
		component: () => import('@/views/reguser/index.vue')
	},
	{
		// 首页
		name: 'product',
		path: '/product',
		redirect: '/product',
		component: () => import('@/views/Layout/index.vue'),
		children: [
			{
				// 概览
				name: 'detail',
				path: '/detail',
				component: () => import('@/views/Pages/detail.vue'),
			},
			{
				// 日志模块
				name: 'thelog',
				path: '/thelog',
				component: () => import('@/views//TheLog/Thelog.vue'),
			},
			{
				// 用户模块
				name: 'product',
				path: '/product',
				component: () => import('@/views/product/index.vue')
			}

		]
	},

]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
