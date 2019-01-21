// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import store from './store/index.ts'
import ajax from './store/ajax.ts'

Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
