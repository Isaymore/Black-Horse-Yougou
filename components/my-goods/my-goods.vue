<template>
  <view class="goods-item-wrap">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio v-if="showRadio" color="#C00000" :checked="goods.goods_state" @click="onRadioClick" />
      <image class="goods-img" :src="goods.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <text class="goods-name">{{goods.goods_name}}</text>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <text class="goods-price">￥{{goods.goods_price}}</text>
        <!-- 商品数量 -->
        <uni-number-box v-if="showNumberBox" v-model="goods.goods_count" :min="1" @change="onchange"></uni-number-box>
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
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNumberBox: {
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
      },
      onchange(val) {
        console.log('星爷-onchange-val', val, typeof val)
        const regex=/\d/
        if(!regex.test(val)) return this.$showMsg('请输入正整数')
        this.$emit('num-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的数量
          goods_count: val
        })
      }
    }
  };
</script>

<style lang="scss">
  .goods-item-wrap {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    border-bottom: 2rpx solid #eee;

    .goods-item-left {
      display: flex;
      align-items: center;
      margin-right: 20rpx;

      .goods-img {
        width: 200rpx;
        height: 200rpx;
        object-fit: cover;
      }
    }

    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 26rpx;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          font-size: 32rpx;
          color: #c00000;
        }
      }
    }
  }
</style>
