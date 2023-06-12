// 登录与注册 store
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  // 起始 token 为 null
  token: getToken(),
  userInfo: {}
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 返回的是验证码；正常情况下应该是发到客户手机
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 用户注册
  async userRegister(_, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 用户登录 【token】
  async reqUserLogin({ commit }, data) {
    const result = await reqUserLogin(data)
    // 服务器下发的token,用户唯一标识符
    // 将来经常通过带token找服务器要用户信息进行展示
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 本地持久化存储 token
      setToken(result.data.token)
      // 返回成功或者失败
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      // 获取成功用户数据存储到 store
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 用户退出登录
  async userLogout({ commit }) {
    const result = await reqLogout()
    // 注意：action 里面不能操作 state，需要提交到mutation
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  // 用户信息
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除用户信息
  CLEAR(state) {
    state.token = ''
    state.userInfo = ''
    removeToken()
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
