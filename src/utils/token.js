// token 模块

// 对外暴露一个函数
// 存储 token 到本地
export const setToken = token => {
  localStorage.setItem('TOKEN', token)
}

// 获取本地 token
export const getToken = () => {
  return localStorage.getItem('TOKEN')
}
// 清除本地存储的token
export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}
