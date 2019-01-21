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

