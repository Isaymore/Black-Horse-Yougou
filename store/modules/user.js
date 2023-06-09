// 用户相关的 vuex 模块
import store from '@/store/store.js'
const getDefaultState = () => ({
	// 收货地址对象
	addressInfo: uni.getStorageSync('addressInfo') || {},
	// 登录成功之后的 token 字符串
	token: uni.getStorageSync('token') || '',
	// 用户信息对象
	userInfo: uni.getStorageSync('userInfo') || {},
	// 重定向的页面信息对象
	// 主要包含 { openType, fromPage } 两个属性，
	// 其中 openType 表示以哪种方式导航回之前的页面；
	// fromPage 表示之前页面的 url 地址
	redirectInfo: {}
})
// state数据
const state = getDefaultState()
// mutations方法，唯一修改state数据的方法
const mutations = {
	// 每个mutation只能接收2个参数，一个是state对象，一个是提交mutation传过来的数据
	// 更新地址信息对象
	updateAddressInfo: (state, addressInfo) => {
		state.addressInfo = addressInfo
		// 本地持久化存储
		// 通过 commit 方法，调用 user 小仓库下的 saveAddressToStorage 方法
		store.commit('user/saveAddressToStorage')
	},
	// 本地持久化存储收货地址
	saveAddressToStorage: state => {
		uni.setStorageSync('addressInfo', state.addressInfo)
	},
	// 更新用户信息对象
	updateUserInfo: (state, userInfo) => {
		state.userInfo = userInfo
		// 通过 commit 方法，调用 user 小仓库下的 saveUserInfoToStorage 方法
		store.commit('user/saveUserInfoToStorage')
	},
	// 本地持久化存储用户信息
	saveUserInfoToStorage: state => {
		uni.setStorageSync('userInfo', state.userInfo)
	},
	// 更新登录成功后的token
	updateToken: (state, token) => {
		state.token = token
		store.commit('user/saveTokenToStorage')
	},
	// 本地持久化存储登录token
	saveTokenToStorage: state => {
		uni.setStorageSync('token', state.token)
	},
	// 更新重定向的页面信息对象
	updateRedirectInfo: (state, redirectInfo) => {
		state.redirectInfo = redirectInfo
	}
}
// actions方法
const actions = {}
export default {
	// 开启命名空间
	namespaced: true,
	state,
	mutations,
	actions
}