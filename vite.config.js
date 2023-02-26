import {
	defineConfig
} from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
// vue2这里是vue.config.js
export default defineConfig({
	plugins: [vue()],
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	base: './',
	server: {
		port: 8080, // 设置服务启动端口号
		open: true, // 设置服务启动时是否自动打开浏览器
		cors: true, // 允许跨域
	},
	resolve: {
		alias: {
			'@': pathResolve('./src') // 设置 `@` 指向 `src` 目录
		}
	}
})
