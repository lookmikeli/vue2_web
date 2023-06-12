// 大 store
// vuex模块
import Vue from 'vue'
import Vuex from 'vuex'

// 引入小仓库 store
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 使用插件
Vue.use(Vuex)
// 注意：这里必须先use 后main.js挂载

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  // 实现Vuex仓库模块化开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
