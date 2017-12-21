// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'iview/dist/styles/iview.css'
import 'tether/dist/css/tether.min.css'
import 'tether/dist/js/tether.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview'
import ElementUI from 'element-ui'

import VueResource from 'vue-resource'
// import 'element-ui/lib/theme-default/index.css'    // 默认主题
import '../static/css/theme-green/index.css'       // 浅绿色主题
import '../static/css/main.css'       // 浅绿色主题
import 'font-awesome/css/font-awesome.min.css'
import $ from 'jquery/dist/jquery.min.js'

// console.log($)
Vue.use(ElementUI)
Vue.use(iView)
// Don't forget to call this
Vue.use(VueResource)

// vuex start 
import Vuex from 'vuex'
Vue.use(Vuex)
let vuex_store = new Vuex.Store({
	state: {
		userstate:{
			username:'',
			token:''
		}
	},
	mutations: {
		updateUserState(state, userstate) {
			state.userstate = userstate
		}
	}
})
// vuex end
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// Vue-cli生成的工程文件的src/main.js
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
Vue.directive('highlight',function (el) {
	setTimeout(() => {
	  let blocks = el.querySelectorAll('pre code');
	  blocks.forEach((block)=>{
	    hljs.highlightBlock(block)
	  })
	}, 100)
})

import Cookies from './utils/Cookies.js'
Cookies.setUpCookies(Vue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#jabeta',
  store:vuex_store,
  router:router,
  template: '<App/>',
  components: { App }
})
