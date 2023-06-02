<template>
  <view class="cart-wrap">
    <!-- 收货地址 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="20"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <!-- :right-options="item.options" -->
    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action ref="swipeAction">
      <block v-for="goods in cartList" :key="goods.goods_id">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler($event, goods)">
          <my-goods :goods="goods" :show-radio="true" :show-number-box="true" @radio-change="onRadioChange"
            @num-change="onNumChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    badgeMixin
  } from '@/mixin/badge/index.js';
  export default {
    // 将 badgeMixin 混入到当前的页面中进行使用
    mixins: [badgeMixin],
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本
          style: {
            backgroundColor: '#c00000' // 按钮的背景色
          }
        }]
      };
    },
    computed: {
      ...mapState('cart', ['cartList'])
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      // 商品的勾选状态发生了变化
      onRadioChange(e) {
        this.updateGoodsState(e)
      },
      // 商品的数量发生了变化
      onNumChange(e) {
        this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(e, goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  };
</script>

<style lang="less">
  @import url('./style/cart.less');
</style>
