import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import toast from 'components/common/toast'
import fastclick from 'fastclick'


Vue.config.productionTip = false

Vue.prototype.$buds = new Vue();
Vue.use(toast);

fastclick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
