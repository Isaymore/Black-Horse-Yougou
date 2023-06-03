<template>
  <view class="my-address-wrap">
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(addressInfo) === '{}'">
      <button class="address-choose-btn" type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="top">
        <view class="receiver">
          收货人：{{addressInfo.userName}}
        </view>
        <view class="phone">
          电话：{{addressInfo.telNumber}}
        </view>
      </view>
      <view class="address">
        收货地址：{{addressDetail}}
      </view>
    </view>
    <!-- 底部的边框线 -->
    <view class="address-bottom">
      <image class="address-bottom-img" src="../../static/cart_border@2x.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex';
  export default {
    name: "my-address",
    data() {
      return {
        // addressInfo: {} // 收货地址信息
      };
    },
    computed: {
      // 把 user 模块中的 addressInfo 对象映射到当前组件中使用，代替 data 中addressInfo 对象
      ...mapState('user', ['addressInfo']),
	  // 提高代码的复用性，将收货详细地址抽离为getters，方便在多个页面和组件之间实现复用
	  // 通过辅助函数mapGetters，将 user 模块中的 addressDetail 映射到当前组件中使用
      ...mapGetters(['addressDetail'])
      // // 收货详细地址的计算属性
      // addressDetail() {
      //   let addressDetail = ''
      //   if (this.addressInfo.provinceName) {
      //     addressDetail =
      //       `${this.addressInfo.provinceName}${this.addressInfo.cityName}${this.addressInfo.countyName}${this.addressInfo.detailInfo}`
      //   }
      //   return addressDetail
      // }
    },
    methods: {
		// 把 user 模块中的 updateAddressInfo 方法映射到当前组件中使用
      ...mapMutations('user', ['updateAddressInfo']),
      // 选择收货地址
      async chooseAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        // 返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [error, success] = await uni.chooseAddress().catch(error => error)
        // 2. 用户成功的选择了收货地址
        if (error === null && success.errMsg === 'chooseAddress:ok') {
          // // 为 data 里面的收货地址对象赋值
          // this.addressInfo = success
		  // 调用user 模块中的 updateAddressInfo 方法，将addressInfo更新保存到user 模块中
          this.updateAddressInfo(success)
        }
      }
    },
  }
</script>

<style lang="less">
  .my-address-wrap {
    .address-choose-box {
      // 方法一：水平垂直居中
      // display: flex;
      // justify-content: center;
      // align-items: center;
      height: 180rpx;
      // 方法二：水平垂直居中
      text-align: center;
      line-height: 180rpx;
    }

    .address-info-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24rpx;

      .top {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0;
      }
    }

    .address {
      padding-bottom: 20rpx;
    }

    .address-bottom {
      width: 100%;

      &-img {
        width: 100%;
      }
    }
  }
</style>
