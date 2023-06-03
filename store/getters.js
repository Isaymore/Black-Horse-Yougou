// getters是为了简化数据而生，vuex中的计算属性
const getters = {
	// state是大仓库store的全局state对象,cart是小仓库
	// 循环遍历，过滤商品已勾选的商品列表
	selectedCartList: state => {
		return state.cart.cartList.filter(item => item.goods_state)
	},
	// 统计购物车中商品的总数量
	total: (state, getters) => {
		let total = 0
		// 循环遍历统计已勾选商品的数量，累加到变量 total 中
		// getters.selectedCartList.forEach(item => total += item.goods_count)
		total = getters.selectedCartList.reduce((total, item) => total += item.goods_count, 0)
		return total
	},
	// 收货详细地址的计算属性
	addressDetail: state => {
		let addressDetail = ''
		if (state.user.addressInfo.provinceName) {
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			addressDetail =
				`${state.user.addressInfo.provinceName}${state.user.addressInfo.cityName}${state.user.addressInfo.countyName}${state.user.addressInfo.detailInfo}`
		}
		return addressDetail
	},
	// 已勾选商品的购物车总额
	totalAmount: (state, getters) => {
		let totalAmount = 0
		// getters.selectedCartList.forEach(item => totalAmount += item.goods_price * item.goods_count)
		totalAmount = getters.selectedCartList.reduce((totalAmount, item) => totalAmount += item.goods_price *
			item.goods_count, 0)
		return totalAmount.toFixed(2)
	}
}
export default getters