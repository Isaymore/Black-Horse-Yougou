<template>
  <view class="cart-wrap">
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
      <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过options 属性来指定操作按钮的配置信息 -->
      <uni-swipe-action-item v-for="(goods, index) in cartList" :key="goods.id" :right-options="options"
        @click="swipeActionClickHandler(goods)">
        <my-goods :goods="goods" :show-radio="true"
          :show-number-box="true" @radio-change="onRadioChange" @num-change="onNumChange"></my-goods>
      </uni-swipe-action-item>
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
    onLoad() {
      console.log('星爷-cartList', this.cartList)
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      // 商品的勾选状态发生了变化
      onRadioChange(e) {
        // console.log('星爷-onRadioChange-e', e)
        this.updateGoodsState(e)
      },
      // 商品的数量发生了变化
      onNumChange(e) {
        console.log('星爷-onNumChange-e', e)
        this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        console.log('星爷-swipeActionClickHandler-cartList', this.cartList)
        console.log('星爷-swipeActionClickHandler-goods', goods)
        // this.removeGoodsById(goods.goods_id)
      }
    }
  };
</script>

<style lang="less">
  @import url('./style/cart.less');
</style>
