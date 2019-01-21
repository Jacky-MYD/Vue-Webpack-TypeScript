<style lang="less" scope>
  @import '../assets/style/pages/HelloWorld.less';
</style>

<template>
  <div class="hello_world_page">
    <h1>Hellow {{ msg }}</h1>
    <h3>I am {{ computedMsg }}</h3>
    <button class="btn" @click="vuexDemo('漂亮')">点我</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { postDemo, getDemo } from '../store/modules/demo/dispatches.ts'
  import {
    State,
    Action,
    Getter,
    Mutation,
    namespace
  } from 'vuex-class'
  // const ModuleGetter = namespace('path/to/module', Getter)

  @Component
  export default class App extends Vue {
    // 初始化数据
    msg = 'Jacky'

    @Getter author // 作者
    @Getter helloWord
    @Mutation SET_AUTHOR // vuex总体设置的变量
    @Mutation SET_HELLO_WORD // 模块的vuex设置的变量
    // 声明周期钩子
    mounted () {
      this.greet()
    }

    created() {
      var curTime = new Date()
      var y = curTime.getFullYear()
      var m = (curTime.getMonth() + 1) > 9 ? (curTime.getMonth() + 1) : '0' + (curTime.getMonth() + 1)
      var d = curTime.getDate() > 9 ? curTime.getDate() : '0' + curTime.getDate()
      var hh = curTime.getHours() > 9 ? curTime.getHours() : '0' + curTime.getHours()
      var mm = curTime.getMinutes() > 9 ? curTime.getMinutes() : '0' + curTime.getMinutes()
      var ss = curTime.getSeconds() > 9 ? curTime.getSeconds() : '0' + curTime.getSeconds()
      var firstTime = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      // post请求案例
      postDemo({updateTime: firstTime}).then((res: any) => {
        console.log('这是post请求返回的数据', res)
      })
      getDemo('test').then((res: any) => {
        console.log('这是get请求返回的数据', res)
      })
    }
    // 计算属性
    get computedMsg () {
      return 'Vue + TypeScript'
    }

    // 方法
    greet () {      
      console.log('author: ', this.author + '\n' + 'helloWord: ' + this.helloWord)
    }

    // 点击事件
    vuexDemo(val) {
      this.SET_HELLO_WORD(val)
      console.log(this.helloWord)
    }
  }
</script>