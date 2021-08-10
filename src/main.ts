import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element plus
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
//css样式重置
import 'normalize.css/normalize.css'
//引入全局scss样式
import '@/styles/index.scss'
//引入svg
import SvgPlugin from '@/components/SvgIcon'
//引入nedb数据库
import Db from '@/db/index'
//引入momentjs
import moment from 'moment'
//引入path和remote
import path from 'path'
const remote = require('@electron/remote')

const app = createApp(App)

//配置全局属性
//引入db
// const database = [
//   {
//     table_name: 'template',
//     filename: path.join(remote.app.getPath('userData'), './template.db')
//   },
//   {
//     table_name: 'control',
//     filename: path.join(remote.app.getPath('userData'), './control.db')
//   }
//   // { table_name: 'template', filename: './src/db/template.db' }, //表名, 表数据库文件路径  //生成环境用绝对路径E:/codetool/code-auto-tool/template.db
//   // { table_name: 'control', filename: './src/db/control.db' } //表名, 表数据库文件路径
// ]
app.config.globalProperties.$db = []
// database.forEach((table: any) => {
//   app.config.globalProperties.$db[table.table_name] = new Db(table.filename)
// })
//引入momentjs
app.config.globalProperties.$moment = moment

//使用状态
app.use(store)
//使用路由
app.use(router)
//使用element plus
app.use(ElementPlus, { locale })
//使用svg
app.use(SvgPlugin, {
  imports: []
})

app.mount('#app')
