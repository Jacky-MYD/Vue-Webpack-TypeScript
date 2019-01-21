import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

// 全局变量设置
declare global {
  const $envType,
        $conf
}

// iview 全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any
  }
}

declare module 'qs' {
  const qs: any
  export default qs
}
