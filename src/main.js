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


function getBrowserInterfaceSize() {
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
        //在标准模式下面
        if (document.compatMode == "CSS1Compat" ) {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = window.body.clientHeight;
        }
    }

    return {
        pageWidth: pageWidth,
        pageHeight: pageHeight
    }
}

document.querySelector('body').style.height = getBrowserInterfaceSize().pageHeight + 'px';
