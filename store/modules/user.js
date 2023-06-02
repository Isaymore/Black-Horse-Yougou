// 用户相关的 vuex 模块
const getDefaultState = () => ({
  // 收货地址对象
  addressInfo: {}
})
// state数据
const state = getDefaultState()
// mutations方法，唯一修改state数据的方法
const mutations = {
  // 每个mutation只能接收2个参数，一个是state对象，一个是提交mutation传过来的数据
  updateAddressInfo: (state, addressInfo) => {
    state.addressInfo = addressInfo
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
