import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import search from './modules/search'

// 安装插件
Vue.use(Vuex)

// 创建vuex
const store = new Vuex.Store({
  modules: {
    cart,
    search
  }
})

// 导出Vuex
export default store
