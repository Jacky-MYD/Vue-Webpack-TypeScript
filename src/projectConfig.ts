'use strict'
const exports = {
  // base url
  get baseUrl () {
    let test = 'https://www.baidu.com'
    let prod = 'https://www.baidu.com'
    return this.isTest ? test : prod
  },
  // 是否是测试环境
  get isTest () {
    return $envType.type === 0 || $envType.type === 1
  },
  // 是否是pc环境
  get isPcTest () {
    return $envType.type === 0
  },
  // 用于pc环境调试的用户数据
  get fakeUser () {
    return {
      user: {
        uid: 'BX15116255215' // 冰箱
      }
    }
  }
}

export default exports
