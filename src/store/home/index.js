import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
// home 模块的 store
const state = {
  // 服务器返回的数据要于state的初始值匹配【根据接口返回值初始化】
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor组件的数据
  floorList: []
}
const actions = {
  async categoryList({ commit }) {
    // 通过API接口函数调用，向服务器发请求，获取数据
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor数据
  async getFloorList({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
