import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../mock/testmock"

Vue.config.productionTip = false

Vue.use(router)
Vue.use(ElementUI);
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  render: h => h(App),
  router,
}).$mount('#app')
