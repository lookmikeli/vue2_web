// 自定义插件

// Vue插件一定暴露一个对象
const myPlugins = {}
myPlugins.install = function (Vue, options) {
  // el 元素
  // params 参数对象
  Vue.directive(options.name, (el, params) => {
    el.innerHTML = params.value.toUpperCase()
    console.log(el)
    console.log(params)
  })
}

export default myPlugins
