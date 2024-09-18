import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

import router from './router/index'
import axios from 'axios'
import BASEURL from './utils/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../mock/testmock"

axios.defaults.baseURL = 'http://172.19.206.68:5000'
Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.$BASEURL = BASEURL

new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
