// 引入mockjs模块
import Mock from 'mockjs'

// 模拟的模块文件
import banner from './banner'
import floor from './floor'

// mock数据：参数1：请求地址   参数2：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
