/**
 * 订单支付相关api
 */
// 引入http请求工具，或者说引入Request实例（该Request实例支持对象调用）
import {
	http
} from '@/api/service.js'
/**
 * 创建订单
 * @param {object} data - 参数
 */
export const createOrder = (data) => {
	return http.post('/api/public/v1/my/orders/create', {
		data
	})
}

/**
 * 订单预支付
 * @param {object} data - 参数
 */
export const prepayOrder = (data) => {
	return http.post('/api/public/v1/my/orders/req_unifiedorder', {
		data
	})
}

/**
 * 检查订单支付状态
 * @param {object} data - 参数
 */
export const chkOrder = (data) => {
	return http.post('/api/public/v1/my/orders/chkOrder', data)
}