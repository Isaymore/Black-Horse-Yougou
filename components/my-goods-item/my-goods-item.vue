<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <image class="goods-item-img" :src="item.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <text class="goods-item-title">{{item.goods_name}}</text>
      <!-- 商品价格 -->
      <text class="goods-item-price">￥{{item.goods_price | tofixed}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods-item",
    // 定义 props 属性，用来接收外界(父组件)传递到当前组件（子组件）的数据，父传子
    props: {
      // 商品的信息对象
      item: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      // 将数字处理为带两位小数点的数字
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 20rpx 10rpx;
    border-bottom: 2rpx solid #eee;

    .goods-item-left {

      .goods-item-img {
        width: 200rpx;
        height: 200rpx;
        object-fit: cover;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;

      .goods-item-title {
        font-size: 24rpx;
      }

      .goods-item-price {
        font-size: 32rpx;
        color: #c00127;
      }
    }
  }
</style>
