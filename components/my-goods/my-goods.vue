<template>
  <view class="my-goods-wrap">
    <!-- 商品左侧图片区域 -->
    <view class="goods-left">
      <radio v-if="showRadio" color="#C00000" :checked="goods.goods_state" @click="onRadioClick" />
      <image class="goods-left-img" :src="goods.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-right">
      <!-- 商品标题 -->
      <text class="goods-right-title">{{goods.goods_name}}</text>
      <view class="goods-price-num">
        <!-- 商品价格 -->
        <text class="goods-price">￥{{goods.goods_price}}</text>
        <!-- 商品数量 -->
        <view class="goods-num-box">
          <button class="goods-num-minus" size="mini">-</button>
          <input class="goods-num-val" type="text" :value="goods.goods_count" />
          <button class="goods-num-plus" size="mini">+</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'my-goods',
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        default: () => {}
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      // radio 组件的点击事件处理函数
      onRadioClick() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      }
    }
  };
</script>

<style lang="scss">
  .my-goods-wrap {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 2rpx solid #eee;

    .goods-left {
      display: flex;
      align-items: center;
      margin-right: 20rpx;

      .goods-left-img {
        width: 200rpx;
        height: 200rpx;
        object-fit: cover;
      }
    }

    .goods-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;

      .goods-price-num {
        display: flex;
        justify-content: space-between;

        .goods-price {
          font-size: 32rpx;
          color: #894057;
          line-height: 80rpx;
        }

        .goods-num-box {
          display: flex;
          justify-content: space-between;
          align-goodss: center;
          width: 240rpx;
          height: 80rpx;
          text-align: center;
        }
      }
    }
  }
</style>
