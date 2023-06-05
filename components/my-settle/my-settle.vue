<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-wrap">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isAllChecked" />
			<text>全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-wrap">
			<text>合计:</text>
			<text class="amount">￥{{ totalAmount }}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="settle-btn" @click="settle">结算({{ total }})</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: 'my-settle',
	props: {
		// 是否全选
		isAllChecked: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			
		};
	},
	computed: {
		...mapState('user', ['token']),
		...mapGetters(['total','totalAmount','addressDetail'])
	},
	methods: {
		changeAllState() {
			this.$emit('all-checked-ev',!this.isAllChecked)
		},
		// 点击了结算按钮
		settle(){
			// 1. 先判断是否勾选了要结算的商品
			if(!this.total) return this.$showMsg('请选择要结算的商品~')
			// 2. 再判断用户是否选择了收货地址
			if(!this.addressDetail) return this.$showMsg('请选择收货地址~')
			// 3. 最后判断用户是否登录了
			if(!this.token) return this.$showMsg('请先登录~')
		}
	}
};
</script>

<style lang="less">
.my-settle-wrap {
	// 底部固定定位
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// 脱离文档流的元素不设置宽度时，元素宽度由内容撑开，不会继承父元素宽度，所以要给宽度
	width: 100%;
	height: 100rpx;
	padding-left: 40rpx;
	font-size: 30rpx;

	.radio {
		display: flex;
		align-items: center;
	}

	.amount-wrap {
		.amount {
			color: #c00000;
		}
	}

	.settle-btn {
		min-width: 200rpx;
		height: 100rpx;
		background-color: #c00000;
		color: #fff;
		text-align: center;
		line-height: 100rpx;
	}
}
</style>
