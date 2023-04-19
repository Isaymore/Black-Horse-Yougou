import App from './App'
// 全局引入，配置相关在该service.js文件里修改
import {
	http
} from '@/api/service.js'
// 挂载在Vue的原型对象上
Vue.prototype.$http = http
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif