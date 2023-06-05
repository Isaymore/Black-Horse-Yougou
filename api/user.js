/**
 * 用户相关api
 */
// 引入http请求工具，或者说引入Request实例（该Request实例支持对象调用）
import {
	http
} from '@/api/service.js'

/**
 * 登录获取token
 */
export const getLoginToken = data => {
	return http.post('/api/public/v1/users/wxlogin', data)
}