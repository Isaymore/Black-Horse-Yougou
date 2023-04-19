import Request from '@/utils/luch-request/index.js'

const http = new Request()
http.setConfig(config => {
	// 设置全局配置
	config.baseURL = 'https://api-hmugo-web.itheima.net',
		config.header = {
			...config.header,
			a: 1,
			b: 2
		}
	return config
})

// 请求拦截器。可以使用async await 做异步操作
http.interceptors.request.use(config => {
	config.header = {
		...config.header
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