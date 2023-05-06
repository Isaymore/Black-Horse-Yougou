 import {
    mapGetters
  } from 'vuex'
// 导出一个混入对象
export const badgeMixin = {
  // 一个混入对象可以包含任意组件选项
  computed: {
    ...mapGetters(['total'])
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
