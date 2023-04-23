<template>
  <view class="cate-wrap">
    <!-- 左侧的滚动视图区域 -->
    <scroll-view class="cate-scroll-left" scroll-y="true">
      <view class="cate-scroll-left-item active">电脑</view>
      <view class="cate-scroll-left-item">电脑</view>
      <view class="cate-scroll-left-item">电脑</view>
      <view class="cate-scroll-left-item">电脑</view>
      <view class="cate-scroll-left-item">电脑</view>
    </scroll-view>
    <!-- 右侧的滚动视图区域 -->
    <scroll-view class="cate-scroll-right" scroll-y="true">
      <view class="cate-scroll-right-item">电脑</view>
      <view class="cate-scroll-right-item">电脑</view>
      <view class="cate-scroll-right-item">电脑</view>
      <view class="cate-scroll-right-item">电脑</view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 动态计算窗口的剩余高度
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        windowHeight: 0,
        active: 0
      }
    },
    onReady() {
      // 获取当前系统的信息
      const systemInfo = uni.getSystemInfoSync()
      console.log('星爷-onReady-systemInfo', systemInfo)
      // 给窗口可用高度赋值
      this.windowHeight = systemInfo.windowHeight
    },
    methods: {

    }
  }
</script>

<style lang="less">
  @import url('./style/cate.less');
</style>
