const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false, // 取消打包map文件
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 80
    // 配置代理服务器,仅开发使用
    /*  proxy: {
      '/api': {
        // 目标服务器
        target: 'http://gmall-h5-api.atguigu.cn'
        // 重写
        // pathRewrite: { '^/api': '' }
      }
    } */
  },
  // 关闭eslint
  lintOnSave: false
})
