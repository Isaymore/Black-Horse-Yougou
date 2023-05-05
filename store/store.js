// 1.引入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入购物车的 Vuex 模块
import cart from './cart.js'
// 2.安装使用Vuex插件
Vue.use(Vuex)
// 3.创建Store实例
const store = new Strore({
  // 注册不同子模块（小仓库）
  module:{
    cart
  }
})
// 4.导出Store实例
export default store