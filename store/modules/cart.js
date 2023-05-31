import store from '@/store/store.js'
const getDefaultState = () => ({
  // 购物车的商品列表，用来存储购物车中每个商品的信息对象
  // 读取本地存储的购物车的商品列表，对 cartList 数组进行初始化
  cartList: uni.getStorageSync('cartList') || []
})
// state数据
const state = getDefaultState()
// mutations方法，唯一修改state数据的方法
const mutations = {
  // 每个mutation只能接收2个参数，一个是state对象，一个是提交mutation传过来的数据
  addToCart: (state, goods) => {
    // 根据提交的商品Id，查询购物车中是否存在这件商品
    // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
    const findResult = state.cartList.find(item => item.goods_id === goods.goods_id)
    if (!findResult) {
      // 如果购物车中没有这件商品，则直接 push
      state.cartList.push(goods)
    } else {
      // 如果购物车中有这件商品，则只更新数量即可
      findResult.goods_count++
    }
    // 持久化存储到本地
    // 通过 commit 方法，调用 cart 小仓库下的 saveToStorage 方法
    store.commit('cart/saveToStorage')
  },
  // 本地持久化存储购物车的商品列表
  saveToStorage: state => {
    uni.setStorageSync('cartList', state.cartList)
  },
  // 更新购物车中商品的勾选状态
  updateGoodsState: (state, goods) => {
    // 根据 goods_id 查询购物车中对应商品的信息对象
    const findResult = state.cartList.find(item => item.goods_id === goods.goods_id)
    // 有对应的商品信息对象
    if (findResult) {
      // 更新对应商品的勾选状态
      findResult.goods_state = goods.goods_state
      // 持久化存储到本地
      // 通过 commit 方法，调用 cart 小仓库下的 saveToStorage 方法
      store.commit('cart/saveToStorage')
    }
  },
  // 更新购物车中商品的数量
  updateGoodsCount: (state, goods) => {
    // 根据 goods_id 查询购物车中对应商品的信息对象
    const findResult = state.cartList.find(item => item.goods_id === goods.goods_id)
    // 有对应的商品信息对象
    if (findResult) {
      // 更新对应商品的数量
      findResult.goods_count = goods.goods_count
      // 持久化存储到本地
      // 通过 commit 方法，调用 cart 小仓库下的 saveToStorage 方法
      store.commit('cart/saveToStorage')
    }
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
