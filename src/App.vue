<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 页底组件 -->
    <!-- 在Home、Search显示，登录、注册隐藏 -->
    <Footer v-show="showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  data() {
    return {
      msg: 'hello'
    }
  },
  computed: {
    showFooter() {
      return this.$route.meta.show
    }
  },
  // 优化数据性能，app组件结构只挂载一次
  // 组件挂载完毕：可以向服务器发请求
  mounted() {
    // 通过Vuex发请求，获取数据，存储于仓库 store
    this.$store.dispatch('categoryList')
  },
  components: {
    Header,
    Footer
  }
}
</script>
