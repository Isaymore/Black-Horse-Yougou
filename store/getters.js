// getters是为了简化数据而生
const getters = {
  // state是大仓库store的全局state对象,cart是小仓库
  // 统计购物车中商品的总数量
  total: state => {
    let total = 0
    // 循环遍历统计商品的数量，累加到变量 total 中 
    state.cart.cartList.forEach(item => total += item.goods_count)
    return total
  }
}
export default getters
