 import {
 	mapGetters
 } from 'vuex'
 // 导出一个混入对象
 export const badgeMixin = {
 	// 一个混入对象可以包含任意组件选项
 	computed: {
 		...mapGetters(['total'])
 	},
 	watch: {
 		// 侦听购物车中商品的总数量
 		total() {
 			// 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽标赋值
 			this.setBadge()
 		}
 	},
 	onShow() {
 		// 在页面刚展示时，设置数字徽标
 		this.setBadge()
 	},
 	methods: {
 		// 给 tabBar 设置数字徽标
 		setBadge() {
 			uni.setTabBarBadge({
 				index: 2,
 				text: this.total.toString() // 注意：text 的值必须是字符串，不能是数字
 			})
 		}
 	}
 }