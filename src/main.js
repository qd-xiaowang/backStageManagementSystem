import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// 全局引入elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// elementPlus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 导入全局样式
import './assets/global.css'

// pinia
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建实例
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册组件
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(ElementPlus)
// 链式注册组件
app.use(store).use(router).mount('#app')
