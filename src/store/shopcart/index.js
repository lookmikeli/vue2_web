// 购物车store
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
  cartList: []
}
const actions = {
  // 获取购物车列表数据  不带参
  async getCartList({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某个商品
  async deleteCartListBySkuId(_, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 修改商品的勾选状态
  // 没有返回数据 _ 占位
  async updateCheckedById(_, { skuId, isChecked }) {
    const result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车全部的商品  再次派发
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 返回 promise 对象
      const promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(promise)
    })
    // 如果都成功 返回成功   一个失败 则都失败
    return Promise.all(PromiseAll)
  },
  // 修改全部产品的状态
  async updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach(async item => {
      const promise = await dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    // 返回最终的状态
    return Promise.all(PromiseAll)
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  // 简化state数据
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
