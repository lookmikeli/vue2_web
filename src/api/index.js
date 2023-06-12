// 所有的API接口统一管理
import request from './request'
// mock接口
import mockRequest from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList GET 无参数
export const reqCategoryList = () =>
  // 发送请求
  request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })

// 获取假数据 banner(首页轮播图接口)
export const reqGetBannerList = () =>
  mockRequest({
    method: 'GET',
    url: '/banner'
  })

// 获取floor数据
export function reqFloorList() {
  // 需要返回   返回值Promise
  return mockRequest.get('/floor')
}

// 获取搜索模块数据   接口 /api/list post
export const reqGetSearchInfo = params => {
  return request({
    url: '/list',
    method: 'POST',
    data: params
  })
}

// 获取产品详情信息的接口
// /api/item/{ skuId } GET
export const reqGoodsInfo = skuId => {
  return request({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}

// 将产品添加到购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}

// 获取购物车列表接口
// /api/cart/cartList  GET
export const reqCartList = () => {
  return request({
    url: '/cart/cartList',
    method: 'GET'
  })
}

// 删除购物车商品接口
// /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = skuId => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}
// 切换某个商品的选中状态
// /api/cart/checkCart/{skuId}/{isChecked}  GET
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
}

// 获取验证码
// /api/user/passport/sendCode/{phone} GET
export const reqGetCode = phone => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
}

// 用户注册接口
// /api/user/passport/register  POST  phone password code
export const reqUserRegister = data => {
  return request({
    url: 'user/passport/register',
    // k v 一致省略 v
    data,
    method: 'POST'
  })
}

// 登录接口
// /api/user/passport/login  POST
export const reqUserLogin = data => {
  return request({
    url: '/user/passport/login',
    data,
    method: 'POST'
  })
}
// 获取用户信息 【需要带着用户的token向服务器要用户信息】
// /api/user/passport/auth/getUserInfo GET
export const reqUserInfo = () => {
  return request({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
}

// 用户退出登录
// /api/user/passport/logout  GET
export const reqLogout = () => {
  return request({
    url: '/user/passport/logout',
    method: 'GET'
  })
}

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => {
  return request({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })
}

// 获取商品清单信息
// /api/order/auth/trade  GET
export const reqOrderInfo = () => {
  return request({
    url: '/order/auth/trade',
    method: 'GET'
  })
}

// 提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder = (tradeNo, data) => {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST'
  })
}

// 获取支付信息
// /api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = orderId => {
  return request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
  })
}

// 获取订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqPayStatus = orderId => {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
  })
}

// 获取个人中心的数据
// /api/order/auth/{page}/{limit}  GET
export const reqMyOrderList = (page, limit) => {
  return request({
    url: `/order/auth/${page}/${limit}`,
    method: 'GET'
  })
}
