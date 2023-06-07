<template>
	<view class="my-user-info-wrap">
		<view class="top-box" :style="{ backgroundColor, height }">
			<image class="avatar" :src="userInfo.avatarUrl" mode="widthFix"></image>
			<text class="nickname">{{ userInfo.nickName }}</text>
		</view>
		<!-- 面板的列表区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="first-panel">
				<view class="first-panel-item" v-for="(item, index) in firstPannelList" :key="index">
					<text>{{ item.num }}</text>
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="my-order-panel">
				<view class="my-order-panel-title">我的订单</view>
				<view class="my-order-panel-body">
					<view class="my-order-panel-item" v-for="(item, index) in orderPanelList" :key="index">
						<image class="item-img" :src="item.imgUrl" mode="widthFix"></image>
						<text>{{ item.title }}</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="third-panel">
				<view class="third-panel-item" v-for="(item, index) in thirdPanelList" :key="index" @click="onClick(item)">
					<text>{{ item.title }}</text>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'my-user-info',
	props: {
		backgroundColor: {
			type: String,
			default: '#c00000'
		},
		height: {
			type: String,
			default: '200px'
		}
	},
	data() {
		return {
			// 第一个面板列表
			firstPannelList: [
				{
					num: 8,
					title: '收藏的店铺'
				},
				{
					num: 14,
					title: '收藏的商品'
				},
				{
					num: 18,
					title: '关注的商品'
				},
				{
					num: 84,
					title: '足迹'
				}
			],
			// 我的订单面板列表
			orderPanelList: [
				{
					imgUrl: require('@/static/my-icons/icon1.png'),
					title: '待付款'
				},
				{
					imgUrl: require('@/static/my-icons/icon2.png'),
					title: '待收货'
				},
				{
					imgUrl: require('@/static/my-icons/icon3.png'),
					title: '退款/退货'
				},
				{
					imgUrl: require('@/static/my-icons/icon4.png'),
					title: '全部订单'
				}
			],
			// 第三个面板列表
			thirdPanelList: [{ title: '收货地址' }, { title: '联系客服' }, { title: '退出登录', id: 'logout' }]
		};
	},
	computed: {
		// 调用 mapState 辅助函数，将 user 小仓库中的 userInfo 映射到 当前组件中使用
		...mapState('user', ['userInfo'])
	},
	methods: {
		// 调用 mapMutations 辅助函数，将 user 小仓库中的 updateAddressInfo、updateToken和updateUserInfo 映射到 当前组件中使用
		...mapMutations('user', ['updateAddressInfo', 'updateToken', 'updateUserInfo']),
		onClick(item) {
			if (item.id === 'logout') {
				this.logout()
			}
		},
		// 退出登录
		async logout() {
			// 询问用户是否退出登录
			const [err, succ] = await uni.showModal({
				title: '提示',
				content: '您确定退出登录吗？'
			});
			if (succ && succ.confirm) {
				// 用户确定退出登录，清空 vuex 中的 addressInfo、token和userInfo
				this.updateAddressInfo({})
				this.updateToken('');
				this.updateUserInfo({});
			}
		}
	}
};
</script>

<style lang="less" scoped>
.my-user-info-wrap {
	height: 100vh;
	// 为整个组件的结构添加浅灰色的背景
	background-color: #f4f4f4;

	.top-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.avatar {
			width: 120rpx;
			border-radius: 60rpx;
			border: 4rpx solid #fff;
			box-shadow: 0 1px 5px #000;
		}

		.nickname {
			margin-top: 20rpx;
			color: #fff;
			font-weight: 700;
			font-size: 32rpx;
		}
	}

	.panel-list {
		padding: 0 10px;

		.first-panel {
			display: flex;
			justify-content: space-around;
			height: 120rpx;
			background-color: #fff;
			margin-top: -20rpx;
			align-items: center;
			border-radius: 20rpx;

			&-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				color: #464544;
				font-size: 28rpx;
			}
		}

		.my-order-panel {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 260rpx;
			background-color: #fff;
			margin: 20rpx 0;
			border-radius: 20rpx;

			&-title {
				padding-left: 20rpx;
				font-size: 36rpx;
			}

			&-body {
				display: flex;
				justify-content: space-around;

				.my-order-panel-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: #464544;
					font-size: 28rpx;

					.item-img {
						width: 80rpx;
					}
				}
			}
		}

		.third-panel {
			background-color: #fff;
			padding: 0 20rpx;
			align-items: center;
			border-radius: 20rpx;

			&-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
			}
		}
	}
}
</style>
