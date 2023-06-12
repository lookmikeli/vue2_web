# vue Project

## Vue CLi 文件夹梳理

node_modules 文件夹：项目依赖文件夹
public 文件夹：静态资源（图片）；注意：webpack 打包的时候，会原封不动打包到 dist 文件夹内

src 文件夹（程序员源代码文件夹）:

1. assets 文件夹：一般也是放置静态资源（放置多个组件共用的静态资源） 注意：assets 文件夹里面的静态资源，webpack 打包会把静态资源当做一个模块，打包到 JS 文件里面
2. components 文件夹：放置非路由组件（全局组件）
3. App.vue： 项目唯一的根组件
4. main.js：程序入口文件，也是整个程序当中最先执行的文件
5. utils 文件夹: 放常用的功能模块(正则|唯一 id 临时身份)

babel.config.js:配置文件（babel 相关；翻译高级 JS）

package.json: 包管理配置文件

package-lock.json：缓存包文件

README.md：项目说明文件

vue.config.js：

    ```js
    // 更改项目地址和开启自动打开页面
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 80
      },
      // 关闭eslint
      lintOnSave: false
    ```

## 路由

vue-router
前端路由：KV 键值对的对应关系
key: URL (地址栏中的 hash 地址)
value: 项目的路由组件

- components 文件夹：放置非路由组件（共用全局组件）
- pages | views 文件夹：`放置路由组件`

### 配置路由

项目配置的路由放置在 router 文件夹中

### 路由组件和非路由组件的区别

1. 路由组件一般放置在 pages | views 文件夹，非路由组件一般放置在 components 文件夹
2. 路由组件一般需要在 router 文件夹中进行注册
3. 注册完路由，路由组件和非路由组件身上都要 $route 和 $router

$route：一般获取路由信息【路径、query、params...】
$router：一般进行`编程式路由导航`跳转【push|replace】

### 路由跳转

1. 声明式导航： < router-link >
2. 编程式导航：push|replace

### $route

$route 获取当前路由的信息

1. 配置路由的时候，可以给路由添加元信息【meta 字段】
   ```js
   routes: [{ path: '/home', component: Home, meta: { show: true } }]
   ```
2. 组件使用 `this.$route.meta.xxx` 获取

### 路由的跳转

路由的跳转就两种形式：声明式导航（router-link：务必要有 to 属性）

                    编程式导航push||replace

编程式导航更好用：因为可以书写自己的业务逻辑

### 面试题

1. 面试题：v-show 与 v-if 区别?

v-show:通过样式 display 控制

v-if：通过元素上树与下树进行操作

2. 面试题:开发项目的时候，优化手段有哪些?

1:v-show|v-if

3. 按需加载

首页|搜索底部是有 Footer 组件，而登录注册是没有 Footer 组件

Footer 组件显示|隐藏，选择 v-show|v-if

路由元信息

params 参数：路由需要占位，程序就崩了，属于 URL 当中一部分
query 参数：路由不需要占位，写法类似于 ajax 当中 query 参数

4. 路由传递参数相关面试题

   1. 路由传递参数（对象写法）path 是否可以结合 params 参数一起使用?

   不可以：不能这样书写，程序会崩掉

   2. 如何指定 params 参数可传可不传?

   在配置路由的时候，在占位的后面加上一个问号【params 可以传递或不传递参数(类似正则的 `?` ,代表出现次数是 0 次，或者 1 次)】

   ```js
   { path: '/search/:keyword?', name: 'search', component: Search, meta: { show: true } }
   ```

   3. params 参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      使用 undefined 解决

   ```js
   this.$router.push({
     name: 'search',
     params: { keyword: '' || undefined },
     query: { k: this.keyword.toUpperCase() }
   })
   ```

   4. 路由组件能不能传递 props 数据?

      1. 布尔写法： 路由规则里面开启 props 传参： props: true
         > 注意：只能用于 params
      2. 对象写法： props:{a:1,b:2}
      3. 函数写法：

         ```js
         props: $route => ({ keyword: $route.params.keyword, k: $route.query.k })
         ```

## 路由传参

```js
// 编程式路由导航
// 1.字符串形式
this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
// 2.模板字符串形式
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
// 3. 对象写法
this.$router.push({
  // 不能写path
  name: 'search',
  params: { keyword: this.keyword },
  query: { k: this.keyword.toUpperCase() }
})
```

# 项目中出现的问题

## 编程式导航 多次执行会抛出 NavigationDuplicated 警告错误

1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出 NavigationDuplicated 的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于 vue-router 最新版本 3.5.2，引入了 promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,

1. 第一种解决方案：是给 push 函数，传入相应的成功的回调与失败的回调

```js
this.$router.push(
  {
    name: 'search',
    params: { keyword: '' || undefined },
    query: { k: this.keyword.toUpperCase() }
  },
  () => {},
  () => {}
)
```

2. 第一种解决方案可以暂时解决当前问题，但是以后再用 push|replace 还是会出现类似现象，因此我们需要从‘根’治病；

- router/index.js

```js
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
```

## 请求拦截器和响应拦截器

1. 请求拦截器：可以在发请求之前处理一写业务；
2. 响应拦截器：当服务器数据返回以后，可以处理一些事情

### axios 二次封装 + 请求拦截器和响应拦截器

- 项目创建 api 文件夹【axios】

```js
// 对于axios进行二次封装
import axios from 'axios'

// 1.利用axios对象方法create，出创建一个axios实例
const requests = axios.create({
  // 配置对象
  baseURL: 'http://gmall-h5-api.atguigu.cn/api', // 基地址
  timeout: 5000 // 请求超时时间
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求之前做一些事情
requests.interceptors.request.use(config => {
  // config：配置对象，对象里面有一个 headers 请求头(重要)
  return config
})
// 响应拦截器
// 成功于失败的回调
requests.interceptors.response.use(
  res => {
    // 成功的回调的函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
  },
  error => {
    // 响应失败的回调函数
    return Promise.reject(error)
  }
)

export default requests
```

### nprogress 进度条插件

```js
// 引入进度条插件
// start: 进度条开始 done: 进度条结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
```

## vuex

### 组件间通信

1. props：用于父子组件通信
2. 自定义事件：$on 绑定自定义事件 $emit 触发自定义事件 子=> 父
3. 全局事件总线：$bus 全能
4. pubsub-js：消息发布与订阅 vue 不常用 全能
5. 插槽 默认插槽 具名插槽 作用域 props 插槽
6. vuex 全能

> 注意：存储数据不是持久化的

### getters 作用

1. 简化 store 数据 ；需要返回值

```js
// 类似计算属性，为了简化store数据
const getters = {
  // state：当前仓库的state；不是大仓库的state
  goodsList(state) {
    // 防止为空, undefined.goodsList 报错
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}
```

## 模块流程

1. 先静态页面 + 静态组件拆分
2. 发请求（API）
3. Vuex(三连环)
4. 组件获取 store 数据，动态展示数据

### 全局事件总线

1. main.js new Vue 里面 beforeCreate 添加 $bus 全局事件总线

   ```js
   // 全局事件总监线
   beforeCreate() {
    Vue.prototype.$bus = this
   }
   ```

2. 确定数据接收方
   ```js
   // 接收
   this.$bus.$on('事件', callback => callback)
   ```
3. 确定数据发送方
   ```js
   // 触发
   this.$bus.$emit('事件')
   ```

### 自定义事件 子 => 父

1. 发送方：this.$emit('事件') 触发自定义事件

   ```js
    methods: {
        // 品牌的处理函数
        trademarkHandler(trademark) {
          // 自定义事件
          this.$emit('trademarkInfo', trademark)
        }
      }
   ```

2. 接收方：自定义事件的处理函数

   ```js
   // 接收方自定义事件回调
    trademarkInfo(value) {
      console.log(value)
    }
   ```

## 数组去重

```js
let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
// 判断 数组去重 indexOf
if (this.searchParams.props.indexOf(props) !== -1) return
this.searchParams.props.push(props)
```

## 轮播图 Carousel

## 分页器 Pagination

1. 当前是第几页: `PageNo` 当前页数
2. 每一页需要展示多少条数据：`PageSize`
3. 总共多少条数据：`total`
4. 连续的页码数：`continues` => 5 | 7 【奇数(对称)】

**重点**：计算连续页码起始数字和结束数字

### 分页器会出现的三个不正常状态

1. 总的页码数 < 连续的页码数
2. 当 `总的页码数` > `连续的页码数` ==> 开始页码 状态【0|负数】
3. 当 `总的页码数` > `连续的页码数` ==> 结束页码 > 总的页码数

```js
// 计算连续页码起始数字和结束数字
    startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this
      // 起始变量 结束变量
      let start = 0,
        end = 0
      // 连续的页码数5 保证至少 5 页数据
      // 不正常现象
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象：连续的页码数大于总页码数
        start = pageNo - Math.floor(continues / 2) // 开始页码
        end = pageNo + Math.floor(continues / 2) // 结束页码
        // start 出现不正常状态【0|负数】
        if (start < 1) {
          start = 1
          end = continues
        }
        // end 结束页码不正常现象
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
```

### 分页器布局

1. 上 => 中 => 下
2. 模板结构

```vue
<template>
  <div class="pagination">
    <!-- 上 -->
    <button>上一页</button>
    <button v-if="startNumAndEndNum.start > 1">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <!-- 总页数 -->
    <button v-if="startNumAndEndNum.end < totalPage">{{ totalPage }}</button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
```

## 路由 滚动行为

```js
export default new VueRouter({
  // 路由规则模块
  routes,
  // 路由跳转滚动行为
  // 参数：to, from, savedPosition
  scrollBehavior() {
    // y = 0 代表滚动条在最上方
    return { y: 0 }
  }
})
```

## 随机生成唯一 ID

1. uuid
2. nanoid

### 单例模式 uuid 生成

- utils/uuid_token.js

```js
// 临时用户身份
import { v4 as uuidv4 } from 'uuid'

// 生成一个随机字符串, 且每次执行不能发生改变; 持久存储
export function getUUID() {
  // 先获取本地存储是否有 uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    // 没有就生成
    // 单例  uuidv4 的实例只有一个
    uuid_token = uuidv4()
    // 存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // 返回
  return uuid_token
}
```

## token

浏览器(注册提交用户信息) => 服务器(服务器响应浏览器注册成功)
浏览器(登录提交用户信息) => 服务器(用户验证通过 返回 token)
将来再次发送请求(带上 token) => 服务器验证通过下发数据

## 登陆业务

1. 当用户注册完成，用户登录【用户名+密码】向服务器发请求（组件派发 action）
   登录成功获取 token,存储到 store 中（非持久化的），路由跳转到首页
2. 因此在首页的 mounted 派发 action 获取用户信息，动态 header 组件动态展示
3. 首页再次刷新，获取不到用户信息（token：vuex 是`非持久化的`）

   3.1 持久化存储 （localStorage.setItem）

4. 问题 1： 组件之间都需要共享用户信息， 需要多组件都派发 action
   问题 2： 用户已经登录还能跳转到登录页面

5. 退出登录 发请求告知服务器退出登录 清除 token

## 导航守卫

1. 导航：“导航”表示路由正在发生改变。
2. 守卫：保安
3. 三种：(1)全局前置守卫 (2)路由独享的守卫 (3)组件内的守卫

### 全局导航守卫

1. 只要项目路由发生改变就能检测到

- 登录全局前置导航守卫

```js
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
    next()
  }
})
```

## 全局统一挂载 API

- main.js

```js
// 统一引入所有接口函数
import \* as API from '@/api'

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 全局挂载
    Vue.prototype.$API = API
  }
}).$mount('#app')
```

> 注意： 不要在生命周期函数上加 async

## 路由独享守卫

- 路由规则里面写守卫

```js
{
    path: '/trade',
    name: 'trade',
    component: Trade,
    meta: { show: true }, // 显示 floor
    // 路由独享守卫(只负责单个路由)
    beforeEnter: (to, from, next) => {
      // ...
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false) // 留在当前路由 不能跳转 从哪来回哪去
      }
    }
  },
```

## 组件内守卫

```js
 beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (from.path === '/pay') {
      next()
    } else {
      next(false)
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该 "组件被复用时" 调用
    // 举例来说，对于一个带有动态参数的路径 "/foo/:id"，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航 "离开该组件" 的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  }
```

## 项目使用的插件

1. nprogress 进度条
2. (1)uuid (2)nanoid 用户唯一表示符
3. qrcode 生成二维码
4. mockjs 模拟数据
5. vue-lazyload@1.3.3 图片懒加载
6. vee-validate@2 表单验证

## 图片懒加载

1. 图片懒加载：在图片没有加载完成之前，默认显示一张同样的图片
2. 插件：vue-lazyload

## 表单验证 vee-validate@2 插件

```js
// vee-validate 表单验证插件
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文的提示信息 message
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 使用插件
Vue.use(VeeValidate)

// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: field => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})

// 自定义校验规则
// agree 自定义校验规则名字
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})
```

## 路由懒加载

1. 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
   如果我们能把不同路由对应的组件分割成不同的代码块，然后当 "`路由被访问`" 的时候`才加载对应组件`，这样就更加高效了。

   ```js
   // component: () => import('@/pages/Home') 路由懒加载
   { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
   ```

2. 结合 Vue 的`异步组件` (opens new window)和 Webpack 的`代码分割`功能 (opens new window)，轻松实现路由组件的懒加载。

   首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

## 打包构建 npm run build

1.  productionSourceMap: false, // 取消打包 map 文件

## nginx 反向代理

1. Nginx (engine x) 是一个高性能的 HTTP 和反向代理 web 服务器

3. 帮购买的服务器做事情，找其他服务器要数据

## v-model 实现组件通信

1. v-model 实现原理：value 和 input 事件实现的，而且还需要注意可以通过 v-model 实现子父组件数据同步

- 子组件

```vue
<template>
  <div>
    <h2>input包装组件</h2>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CustomInput',
  props:['value']
}
</script>
```

- 父组件

```vue
<template>
  <div>
    <h2>父组件{{ msg }}</h2>
    <!-- 方式一 -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <!-- 方式二 -->
    <CustomInput v-model="msg" />
  </div>
</template>
```

## $attrs 和 $listeners

1. $attrs：组件实例的属性，可以获取到父亲传递的 props 数据（前提子组件没有通过 props 接受）
2. $listeners：组件实例的属性，可以获取到父亲传递自定义事件（对象形式呈现）

```vue
<!-- 子组件 -->
<template>
  <div>
    <!-- 不能简写 @ 和 ： -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    <!-- 用户使用我们封装的组件，传递相应的参数 -->
  </div>
</template>

<!-- 父组件 -->
<template>
  <div>
    <h1>Element插件:提供的全局组件</h1>
    <HintButton
      type="success"
      icon="el-icon-delete"
      size="mini"
      title="提示按钮"
      @click="handler"
    ></HintButton>
  </div>
</template>
```

## $refs 和 $children

1. $refs:可以在父组件内部获取子组件 ---实现父子通信
2. $children:可以在父组件内部获取全部的子组件【返回数组】
3. $parent:可以在子组件内部获取唯一的父组件,可以操作父组件的数据和方法【返回组件实例】

## 插槽 父子组件通信

1. 子组件数据来源于父组件,子组件是决定不了自身结构与外观
2. 作用域插槽： 在 slot 标签里面给使用插槽的使用组件，用类似 props 的参数形式，传递数据
3. 作用域插槽： 使用者在插槽组件内使用 template 标签，书写结构

