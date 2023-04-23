<template>
  <view class="cate-wrap">
    <!-- 左侧的滚动视图区域 -->
    <scroll-view class="cate-left" scroll-y="true">
      <view class="cate-left-item active">电脑</view>
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
    </scroll-view>
    <!-- 右侧的滚动视图区域 -->
    <scroll-view class="cate-right" scroll-y="true">
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
      <view class="cate-left-item">电脑</view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
@import url('./style/cart.scss');
</style>
