import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//css样式重置
import 'normalize.css/normalize.css'
//引入全局scss样式
import '@/styles/index.scss'
//引入svg
import SvgPlugin from '@/components/SvgIcon'
//引入代码高亮
import HightLightjsPlugin from '@/components/HightLightjs'

//引入momentjs
import moment from 'moment'

const app = createApp(App)

//引入momentjs
app.config.globalProperties.$moment = moment

//使用状态
app.use(store)
//使用路由
app.use(router)
//使用element plus
app.use(ElementPlus)
//使用svg
app.use(SvgPlugin, {
  imports: []
})
//使用代码高亮
app.use(HightLightjsPlugin)

app.mount('#app')
