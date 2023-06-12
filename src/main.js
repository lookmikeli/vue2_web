import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 引入MockServer模块 虚拟数据
import '@/mock/mockServer'

// 引入swiper样式
import 'swiper/swiper-bundle.css'

// 轮播图组件
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'

// 统一接口api 文件夹里面全部请求函数
// 统一引入所有接口
import * as API from '@/api'

// 引入element-ui
import { Button, MessageBox } from 'element-ui'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 图片懒加载的默认图片
import atm from '@/assets/images/0.gif'
/* // 引入自定义插件
import myPlugins from './plugins/myPlugins' */
// 引入表单验证插件
import '@/plugins/validate'

// 注册轮播图组件
Vue.component(Carousel.name, Carousel)
// 注册分页器组件
Vue.component(Pagination.name, Pagination)
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 参数1：全局组件的名字
// 参数2：那个组件
Vue.component(TypeNav.name, TypeNav)
// 全局注册 element-ui
Vue.component(Button.name, Button)

/* // 使用指定插件
Vue.use(myPlugins, {
  name: 'jian'
}) */

// 使用图片懒加载插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm
})

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

new Vue({
  render: h => h(App),
  // 注册路由：组件身上都会挂载$route和$router属性
  router,
  // 注册仓库：组件身上就会多一个$store属性
  store,
  // 全局事件总监线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
