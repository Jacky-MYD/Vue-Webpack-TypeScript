# Vue-Webpack-TypeScript

> 这是一个Vue2.5+版本兼容TypeScript开发的脚手架，虽然Vue马上就要来了，但是我们还是可以用目前的版本练练手。目前这个是配好没多久的脚手架，也许会有一下问题，但是应该不影响使用，后期有时间将慢慢优化。

## Build Setup

``` bash
可以直接clone该脚手架，然后按照以下基本命令即可跑项目了
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 官方Vue-cli
```bash
终端输入vue init webpack projectName，直接就可以使用Vue + webpack的脚手架了
```
## 引入TypeScript
项目初始化后，我们需要安装一些插件来支持TypeScript
npm i vue-class-component vue-property-decorator --save
npm i ts-loader typescript tslint tslint-loader tslint-config-standard --save-dev
* vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
* vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
* ts-loader：TypeScript 为 Webpack 提供了 ts-loader，其实就是为了让webpack识别 .ts .tsx文件
* tslint-loader跟tslint：我想你也会在.ts .tsx文件 约束代码格式（作用等同于eslint）
* tslint-config-standard：tslint 配置 standard风格的约束
## 配置webpack
修改配置文件webpack.base.conf.js，将入口main.js改成main.ts，并且将main.js文件的类名也改成main.ts
```js
// main.js改成main.ts
entry: {
  app: './src/main.ts'
}
// 新增.ts
resolve: {
  extensions: ['.js', '.vue', '.json', '.ts'],
  alias: {
    '@': resolve('src')
  }
}
```
在module.rules 添加webpack对.ts的解析
```js
{
  test: /\.ts$/,
  exclude: /node_modules/,
  enforce: 'pre',
  loader: 'tslint-loader'
},
{
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    appendTsSuffixTo: [/\.vue$/],
  }
},
```
## 在根目录添加 tsconfig.json文件
[可参考官方推荐配置](https://cn.vuejs.org/v2/guide/typescript.html)
```js
参考项
{
  // 编译选项
  "compilerOptions": {
    // 输出目录
    "outDir": "./output",
    // 是否包含可以用于 debug 的 sourceMap
    "sourceMap": true,
    // 以严格模式解析
    "strict": true,
    // 采用的模块系统
    "module": "esnext",
    // 如何处理模块
    "moduleResolution": "node",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用设计类型元数据（用于反射）
    "emitDecoratorMetadata": true,
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": false,
    // 不是函数的所有返回路径都有返回值时报错。
    "noImplicitReturns": true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 移除注释
    "removeComments": true,
    "suppressImplicitAnyIndexErrors": true,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 指定特殊模块的路径
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  }
}
```
## 在根目录添加 tslint.json文件
```js
{
    "extends": "tslint-config-standard",
    "globals": {
      "require": true
    }
}
```
## 让ts识别vue 重中之重
由于 TypeScript 默认并不支持 *.vue 后缀的文件，所以在 vue 项目中引入的时候需要创建一个 vue-shim.d.ts 文件，放在项目项目对应使用目录下，例如 src/vue-shim.d.ts，意思是告诉 TypeScript *.vue 后缀的文件可以交给 vue 模块来处理。
```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

## vue文件用ts改造
之前我们有安装vue-class-component插件，那么我们就直接在vue页面中引入该插件，这里我就直接上代码了，ts语法可看官方文档或者w3c的教程等。但是记得将script标签中加lang="ts"，表示引入ts语法
```js
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { postDemo, getDemo } from '../store/modules/demo/dispatches.ts'
  import { State, Action, Getter, Mutation } from 'vuex-class'
  
  @Component
  export default class App extends Vue {
    // 初始化数据
    msg = 'Jacky' // 这里相当于在data中声明一个msg: 'Jacky'的变量
    @Getter author // 这里相当于 author: state => state.demo.author
    @Getter helloWord // 这里相当于 helloWord: state => state.demo.helloWord
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
      // get请求案例
      getDemo('test').then((res: any) => {
        console.log('这是get请求返回的数据', res)
      })
    }
    // 计算属性相当于以前的computed
    get computedMsg () {
      return 'Vue + TypeScript'
    }

    // 这里的方法相当于以前在methods里面的方法
    greet () {      
      console.log('author: ', this.author + '\n' + 'helloWord: ' + this.helloWord)
    }

    // 点击事件
    vuexDemo(val) {
      this.SET_HELLO_WORD(val) // 这里相当于修改vuex变量的值 this.$tore.commit('SET_HELLO_WORD', val)
      console.log(this.helloWord)
    }
  }
</script>
```
## 配置vuex
先安装依赖npm i vuex vuex-class --save，然后我们逐个文件的配置，需要注意的是我们项目中除了配置文件外，将原来所以js文件改成ts文件
### index.ts(modules)
```js
import actions from './actions.ts'
import { state, mutations } from './mutations.ts'
import getters from './getters.ts'
const store = {
  state,
  getters,
  actions,
  mutations
}
export default store
```
### action.ts
```js
import ajax from '../../ajax.ts'
import { Demo } from './type'
import Api from './api.ts'
import { Commit, Action, ActionTree } from 'vuex'

const stateVal: Action<Demo, any> = (context: { commit: Commit }, data: any) => {
  context.commit('SET_HELLO_WORD', data)
}
const actions: ActionTree<Demo, any> = {
  stateVal
}
export default actions
```
### getters.ts
```js
import { Demo } from './type'
import { GetterTree } from 'vuex'

const getters: GetterTree<Demo, any> = {
  helloWord: (state: Demo) => state.helloWord
}

export default getters
```
### mutations.ts
```js
import { Demo } from './type'
import { MutationTree } from 'vuex'

const state: Demo = {
  helloWord: 'helloWord'
}
const mutations: MutationTree<Demo> = {
  SET_HELLO_WORD (state: Demo, data: string) {
    state.helloWord = data
  }
}

export { state, mutations }
```
### type.ts
```js
export interface Demo {
    helloWord: string;
}
```
#### dispatches.ts
```js
import api from './api.ts'
import ajax from '../../ajax.ts'

export const postDemo = (params) => {
  return ajax.post(api.postDemo, params)
}
export const getDemo = (params) => {
  return ajax.get(api.getDemo + params)
}
```
### api.ts(接口名配置文件)
```
const api = {
  postDemo: 's?wd=demo',
  getDemo: 's?wd='
}
export default api
```





