import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'

// 安装插件
Vue.use(Vuex)

// 创建vuex
const store = new Vuex.Store({
  modules: {
    cart
  }
})

// 导出Vuex
export default store
