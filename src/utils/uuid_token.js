// 临时用户身份
import { v4 as uuidv4 } from 'uuid'

// 生成一个随机字符串, 且每次执行不能发生改变; 持久存储
export function getUUID() {
  // 先获取本地存储是否有 uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if (!uuid_token) {
    // 没有就生成
    // 单例  uuidv4 的实例只有一个
    uuid_token = uuidv4()
    // 存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  // 返回
  return uuid_token
}
