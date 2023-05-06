<template>
  <view class="cart-wrap">

  </view>
</template>

<script>
  import {
    badgeMixin
  } from '@/mixin/badge/index.js'
  export default {
    // 将 badgeMixin 混入到当前的页面中进行使用
    mixins: [badgeMixin],
    data() {
      return {

      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import url('./style/cart.scss');
</style>
