/**
 * 防抖
 * @param {*} fn 传入的函数
 * @param {*} t 定时器的延迟事件，单位为ms
 * @return 返回一个回调函数：每次用户实际调用的回调函数
 */

export const debounce = (fn, t) => {
	const delay = t || 500
	let timer = null
	return function(...args) {
		// 判断timmer是否有值，如果有值，清除定时器
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			fn.apply(args)
		}, delay)
	}
}