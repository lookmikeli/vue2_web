// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条插件
import nprogress from 'nprogress'
// start: 进度条开始 done: 进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象方法create，出创建一个axios实例
const requests = axios.create({
  // 配置对象
  baseURL: '/mock', // 基地址
  timeout: 5000 // 请求超时时间
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求之前做一些事情
requests.interceptors.request.use(config => {
  // config：配置对象，对象里面有一个 headers 请求头(重要)
  // 进度条开始
  nprogress.start()
  return config
})
// 响应拦截器
// 成功于失败的回调
requests.interceptors.response.use(
  res => {
    // 成功的回调的函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done()
    return res.data
  },
  err => {
    // 响应失败的回调函数
    err.message
    return Promise.reject(err)
  }
)

export default requests
