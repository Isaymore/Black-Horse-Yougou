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
		<my-goods></my-goods>
	</view>
</template>

<script>
import { badgeMixin } from '@/mixin/badge/index.js';
export default {
	// 将 badgeMixin 混入到当前的页面中进行使用
	mixins: [badgeMixin],
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less">
@import url('./style/cart.less');
</style>
