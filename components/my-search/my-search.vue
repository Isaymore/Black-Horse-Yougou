<template>
  <view class="my-search-wrap" :style="{backgroundColor: bgcolor}">
    <!-- 使用 view 组件模拟 input 输入框的样式，注意并不会在页面上渲染真正的 input 输入框 -->
    <view class="my-search-box" :style="{borderRadius: radius + 'px'}">
      <uni-icons type="search" size="16"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    // 为了增强组件的通用性，我们允许使用者自定义搜索组件的 背景颜色 和 圆角尺寸
    // 背景颜色
    props: {
      bgcolor: {
        type: String,
        default: '#c00000'
      },
      // 圆角边框
      radius: {
        type: Number,
        // 单位是px
        default: 20
      }
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .my-search-wrap {
    // background-color: #c00000;
    padding: 20rpx;
    box-sizing: border-box;

    .my-search-box {
      height: 60rpx;
      background-color: #fff;
      // border-radius: 40rpx;
      // 方法一：水平和垂直居中
      // text-align: center;
      // line-height: 60rpx;
      // 方法二：水平和垂直居中
      display: flex;
      justify-content: center;
      align-items: center;

      .placeholder {
        font-size: 30rpx;
        margin-left: 10rpx;
      }
    }
  }
</style>
