import Vue from 'vue'
// import router from './router'
import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: $conf.default.baseUrl, // baseUrl
  headers: { // 设置默认请求头
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {},
  params: {},
  timeout: 20000 // 请求超时的时间限制
})
// 开始设置请求 发起的拦截处理
instance.interceptors.request.use((config: any) => {
  return config
}, (error: any) => {
  return Promise.reject(error)
})
// instance.setDefault = function() {
    // let user = storage.get('baseInfo.user')
    // if(user) {
    //     this.defaults.data.token = user.uid
    //     this.defaults.data.employeeType = "10"
    //     this.defaults.params[$conf.tokenName] = user.ssoToken
    //     this.defaults.data.newVersion = 2
    // }
// }
// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params)).then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = (url: any, params: any) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params: params }).then((res: any) => {
      resolve(res) // 返回请求成功的数据 data
    }).catch((err: any) => {
      reject(err)
    })
  })
}
// 请求到结果的拦截处理
// axios.interceptors.response.use( (config: any) => {
//     // 返回请求正确的结果
//     if ((!is_log) && config.data.code === -1) {
//         router.push({path: '/login'})  // 进入登陆页面
//     }
//     if (config.data.code === -2) {
//         router.push({path: '/'}) // 进入实名认证
//     }
//     return config.data
// }, (error: any) => {
//     return Promise.reject(error)
//     // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
// })
export default instance
