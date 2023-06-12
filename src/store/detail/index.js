// 商品详情store模块
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 游客临时身份模块,生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'

const state = {
  getGoodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const actions = {
  // 获取商品信息的actions
  async getGoodInfo({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 产品添加到购物车中
  async addOrUpdateShopCart(_, { skuId, skuNum }) {
    // 加入购物车返回的结果是 promise
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 没有返回数据 不需要存储 state
    // 加入成功
    if (result.code === 200) {
      return 'ok'
    } else {
      // 加入失败
      return Promise.reject(new Error('failed'))
    }
  }
}
const mutations = {
  GETGOODINFO(state, getGoodInfo) {
    state.getGoodInfo = getGoodInfo
  }
}
const getters = {
  // 路径导航简化
  categoryView(state) {
    return state.getGoodInfo.categoryView || {}
  },
  // 产品信息简化
  skuInfo(state) {
    return state.getGoodInfo.skuInfo || {}
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.getGoodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
