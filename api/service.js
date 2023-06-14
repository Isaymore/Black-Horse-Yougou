import Request from '@/utils/luch-request/index.js'
import store from '@/store/store.js'
const http = new Request()
http.setConfig(config => {
	// 设置全局配置
	config.baseURL = 'https://api-hmugo-web.itheima.net', // 接口基础路径，或者叫请求域名
		config.header = {
			...config.header,
			a: 1,
			b: 2
		}
	// console.log('星爷-setConfig-config', config, typeof config)
	return config
})

// 请求拦截器。可以使用async await 做异步操作
http.interceptors.request.use(config => {
	config.header = {
		...config.header
	}
	// 判断请求接口是否为需要权限的 API 接口
	// console.log('星爷-请求拦截器-config', config, typeof config)
	if (config.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		// 方法一：枚举写法
		// config.header['Authorization'] = store.state.user.token
		// 方法二：obj.key直接添加挂载新属性
		// config.header.Authorization = store.state.user.token
		// 方法三：先用展开运算符解构，再添加新属性
		config.header = {
			...config.header,
			Authorization: store.state.user.token
		}
	}
	return config
}, error => {
	return Promise.reject(error)
})

// 响应拦截器。可以使用async await 做异步操作
http.interceptors.response.use(async response => {
	// 请求默认给response加一层data包裹，reponse.data可以直接拿到后台返回的数据
	return response.data
}, error => {
	return Promise.reject(error)
})

export {
	http
}