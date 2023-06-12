// 引入需要的组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// 路由规则配置信息模块
export default [
  // 路由懒加载，当路由被访问的时候执行 () => import('@/pages/Home')
  { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
  // params参数需要占位
  {
    // 个人中心
    path: '/center',
    name: 'center',
    component: Center,
    redirect: '/center/myorder',
    meta: { show: true }, // 显示 floor
    children: [
      {
        // 二级路由不带斜杠 /
        path: 'myorder',
        name: 'myorder',
        component: MyOrder
      },
      {
        // 二级路由不带斜杠 /
        path: 'grouporder',
        name: 'grouporder',
        component: GroupOrder
      }
    ]
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true } // 显示 floor
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: PaySuccess,
    meta: { show: true } // 显示 floor
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: { show: true }, // 显示 floor
    // 路由独享守卫(只负责单个路由)
    beforeEnter: (to, from, next) => {
      // ...
      if (from.path === '/trade') {
        next()
      } else {
        next(false) // 留在当前路由 不能跳转 从哪来回哪去
      }
    }
  },
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
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
    meta: { show: true } // 显示 floor
  },
  { path: '/detail/:skuid', name: 'detail', component: Detail, meta: { show: true } },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: { show: true },
    props: true
  },
  { path: '/login', component: () => import('@/pages/Login'), meta: { show: false } },
  { path: '/register', component: Register, meta: { show: false } },
  // 重定向
  { path: '*', redirect: '/home' }
]
