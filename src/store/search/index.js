// search 模块的 store
import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {}
}
const actions = {
  // 获取search 模块的数据
  // 第二个参数是：dispatch传递的第二个参数，且必须是一个空对象
  async getSearchList({ commit }, params = {}) {
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
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

export default {
  state,
  actions,
  mutations,
  getters
}
