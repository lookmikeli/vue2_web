// 配置路由的模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由规则模块
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 先把VueRoter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 参数1：告诉原来push方法，往哪里跳（传什么参数）
// 参数2：成功的回调
// 参数3：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 配置路由
const router = new VueRouter({
  // 路由规则模块
  routes,
  // 路由跳转滚动行为
  // 参数：to, from, savedPosition
  scrollBehavior() {
    // y = 0 代表滚动条在最上方
    return { y: 0 }
  }
})

// 全局守卫：前置守卫 （路由跳转之前）
router.beforeEach(async (to, from, next) => {
  // to 去哪 from 来至于哪 next 放行
  // next()
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name

  if (token) {
    // 登录不能再访问login
    if (to.path === '/login') {
      next('/hone')
    } else {
      // 如果判断 userInfo 返回的是空对象 永远是 true
      if (name) {
        next()
      } else {
        // 没有用户信息，派发 action
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (err) {
          // token 过期 清除原因的token 跳转到登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (
      toPath.indexOf('/trade') !== -1 ||
      toPath.indexOf('/pay') !== -1 ||
      toPath.indexOf('/paysuccess') !== -1 ||
      toPath.indexOf('/center') !== -1
    ) {
      // 跳转到login 携带query参数，留给想要去但去不了的路由（登录跳转）
      next(`/login?redirect=${toPath}`)
    } else {
      next()
    }
  }
})

export default router
