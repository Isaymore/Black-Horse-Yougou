<template>
	<view class="my-goods-wrap">
		<!-- 商品左侧图片区域 -->
		<view class="goods-left">
			<image class="goods-left-img" src="../../static/logo.png" mode=""></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-right">
			<!-- 商品标题 -->
			<text class="goods-right-title">就看见开发京东客服几点看法</text>
			<view class="goods-price-num">
				<!-- 商品价格 -->
				<text class="goods-price">￥128.00</text>
				<!-- 商品数量 -->
				<view class="goods-num-box">
					<button class="goods-num-minus" size="mini">-</button>
					<input class="goods-num-val" type="text" value="2" />
					<button class="goods-num-plus" size="mini">+</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	data() {
		return {};
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
		justify-content: space-between;
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
				align-items: center;
				width: 240rpx;
				height: 80rpx;
				text-align: center;
			}
		}
	}
}
</style>
