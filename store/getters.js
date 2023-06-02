// getters是为了简化数据而生，vuex中的计算属性
const getters = {
  // state是大仓库store的全局state对象,cart是小仓库
  // 统计购物车中商品的总数量
  total: state => {
    let total = 0
    // 循环遍历统计商品的数量，累加到变量 total 中 
    state.cart.cartList.forEach(item => total += item.goods_count)
    return total
  },
  // 收货详细地址的计算属性
  addressDetail: state => {
    let addressDetail = ''
    if (state.user.addressInfo.provinceName) {
      addressDetail =
        `${state.user.addressInfo.provinceName}${state.user.addressInfo.cityName}${state.user.addressInfo.countyName}${state.user.addressInfo.detailInfo}`
    }
    return addressDetail
  }
}
export default getters
