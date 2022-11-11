import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 引入uview组件库
import uView from "uview-ui"
Vue.use(uView)

// 挂载全局组件
import components from 'components/index.js'
Vue.use(components)

// 挂载全局异步请求方法
// 第一中方式
// import {$http,$get,$post} from './utils/request.js'
// Vue.prototype.$http = $http
// Vue.prototype.$get = $get
// Vue.prototype.$post = $post
// 第二种方式
import * as request from './utils/request.js'
for(let key in request){
	Vue.prototype[key] = request[key]
}

import store from 'store/index.js'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif