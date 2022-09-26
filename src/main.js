import Vue from 'vue'
import App from './App'
// 导入 request.js 模块
import http from '@/utils/request'
// 导入message.js模块
import { showMessage } from "@/utils/message";
// 导入并使用搜索模块
import MySearch from "@/components/my-search.vue";
import store from "@/store";
Vue.use('MySearch',MySearch)
// 注册全局过滤器
Vue.filter('formatPrice',value=>{
  return '￥' + Number(value).toFixed(2);
})
Vue.config.productionTip = false

Vue.prototype.$http = http // 将http挂载到 Vue.prototype
Vue.prototype.$message = showMessage // 将showMessage挂载到 Vue.prototype
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
