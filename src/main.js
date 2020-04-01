import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'


// 全局样式
import './assets/index.css'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'https://autumnfish.cn'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
