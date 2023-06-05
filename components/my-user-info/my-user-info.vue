<template>
	<view class="my-user-info-wrap" :style="{ backgroundColor, height }">
		<view class="avatar">
			<image class="avatar-img" src="../../static/app.png" mode="widthFix"></image>
		</view>
		<text class="username">星爷</text>
	</view>
</template>

<script>
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
		return {};
	}
};
</script>

<style lang="less" scoped>
.my-user-info-wrap {
	// text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.avatar {
		width: 120rpx;
		// margin: 0 auto;

		&-img {
			width: 100%;
			// vertical-align: middle;
		}
	}
	
	.username {
		color: #fff;
	}
}
</style>
