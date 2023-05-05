<template>
  <view class="goods-nav-wrap">
    <view class="goods-nav-left">
      <view class="shop">
        <uni-icons type="shop" color="gray" size="22"></uni-icons>
        <text>店铺</text>
      </view>
      <slot name="cart"></slot>
    </view>
    <view class="goods-nav-right">
      <button type="warn" size="mini" class="cart-btn" :hover-class="hoverClass">加入购物车</button>
      <button size="mini" class="buy-btn" :hover-class="hoverClass">立即购买</button>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods-nav",
    props: {
      hoverClass: {
        type:String,
        default: 'button-hover'
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="less">
  .goods-nav-wrap {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20rpx;

    .goods-nav-left {
      display: flex;
      justify-content: space-between;
      color: #8a6b72;
      font-size: 24rpx;

      .shop {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20rpx;
      }
    }

    .goods-nav-right {
      display: flex;

      .cart-btn {
        width: 240rpx;
        border-radius: 80rpx 0 0 80rpx;
        line-height: 38.4px;
      }

      .buy-btn {
        width: 270rpx;
        background-color: #ffa200;
        border-radius: 0 80rpx 80rpx 0;
        line-height: 38.4px;
        color: #fff;
      }
    }
  }
</style>