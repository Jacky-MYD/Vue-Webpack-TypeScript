import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import actions from './actions.ts'
import mutations from './mutations.ts'
import state from './state.ts'
import getters from './getters.ts'
// modules
import demo from './modules/demo/index.ts'

Vue.use(Vuex)

const store: Store<any> = new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  modules: {
    // 添加自定义模块
    demo
  }
})

export default store
