<template>
	<view class="my-login-wrap">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="60" color="#aeb0ac"></uni-icons>
		<!-- 登录按钮 -->
		<button v-if="canIUseGetUserProfile" type="warn" class="login-btn" @click="getUserProfile">一键登录</button>
		<button v-else type="warn" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<!-- 登录提示 -->
		<text class="login-tips">登录后尽享更多权益</text>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { getLoginToken } from '@/api/user.js';
export default {
	name: 'my-login',
	data() {
		return {
			canIUseGetUserProfile: false,
			token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o'
		};
	},
	computed: {
		...mapState('user', ['redirectInfo'])
	},
	created() {
		if (uni.getUserProfile) {
			this.canIUseGetUserProfile = true;
		}
	},
	methods: {
		// 调用 mapMutations 辅助函数，将 user 小仓库中的 updateUserInfo 映射到 当前组件中使用
		...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
		getUserProfile() {
			// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			uni.getUserProfile({
				desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (res) => {
					console.log('星爷-getUserProfile-res', res);
					// 将用户的基本信息存储到 vuex 中
					this.updateUserInfo(res.userInfo);
					// 获取登录成功后的 Token 字符串
					this.getToken(res);
				},
				fail: (res) => {
					return this.$showMsg('您取消了登录授权');
				}
			});
		},
		// 调用登录接口，获取登录成功后的 token
		async getToken(info) {
			// 调用微信登录接口
			const [err, res] = await uni.login().catch((err) => err);
			console.log('星爷-getToken-err', err, typeof err);
			console.log('星爷-getToken-res', res, typeof res);
			// 判断 uni.login() 是否调用失败
			if (err || res.errMsg !== 'login:ok') return this.$showMsg('uni.login 登录失败');
			const { encryptedData, iv, rawData, signature } = info;
			// 整理参数对象
			const data = {
				code: res.code, // 用户登录凭证
				encryptedData, // 包括敏感数据在内的完整用户信息的加密数据
				iv, // 加密算法的初始向量
				rawData, // 不包括敏感信息的原始数据字符串，用于计算签名
				signature // 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
			};
			console.log('星爷-getToken-data', data);
			// 这里不调用登录后端接口wxlogin来获取token，而是写死为一个假数据token=res.code。
			// 原因：未授权用户，不能使用登录和支付等特殊接口，需要黑马官方在微信小程序管理后台授权，将你的微信账号添加为小程序的开发者
			// this.getLoginToken(data);
			// 更新vuex中的token
			// this.updateToken(res.code);
			this.updateToken(this.token);
			this.navigateBack();
		},
		// 导航返回登录之前的页面
		navigateBack() {
			// 导航方式为 switchTab
			if (this.redirectInfo.openType === 'switchTab') {
				// 调用小程序提供的 uni.switchTab() API 进行页面的导航
				uni.switchTab({
					// 要导航到的页面地址
					url: this.redirectInfo.fromPage,
					// 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
					complete: () => {
						this.updateRedirectInfo({});
					}
				});
			}
		},
		// 登录获取token
		async getLoginToken(data) {
			console.log('星爷-getLoginToken-data', data);
			const res = await getLoginToken(data);
			console.log('星爷-getLoginToken-res', res);
			try {
				if (res.meta.status !== 200) return this.$showMsg('后端接口登录失败');
				// 更新vuex中的token
				this.updateToken(res.message.token);
				this.$showMsg('登录成功');
			} catch (e) {
				//TODO handle the exception
			}
		},
		// 登录后获取用户信息
		getUserInfo(e) {
			// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
			// 判断是否获取用户信息成功
			if (e.detail.errMsg === 'getUserInfofail auth deny') return this.$showMsg('您取消了登录授权~');
			// 获取用户信息成功， e.detail.userInfo 是用户的基本信息
			// 将用户的基本信息存储到 vuex 中
			this.updateUserInfo(e.detail.userInfo);
			// 获取登录成功后的 Token 字符串
			console.log('星爷-getUserInfo-e', e);
			this.getToken(e.detail);
		}
	}
};
</script>

<style lang="less" scoped>
.my-login-wrap {
	// position: relative;
	padding: 32rpx;
	text-align: center;

	// // 绘制登录盒子底部的半椭圆造型
	// &::after {
	// 	content: ' ';
	// 	display: block;
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: 40px;
	// 	background-color: skyblue;
	// 	border-radius: 100%;
	// 	transform: translateY(80%);
	// }

	// 登录按钮的样式
	.login-btn {
		margin: 16rpx 0;
		background-color: #c00000;
		border-radius: 40rpx;
	}

	// // 属性选择器，选择type=warn的button按钮
	// button[type='warn'] {
	// 	background-color: #c00000;
	// }
	// 按钮下方提示消息的样式
	.login-tips {
		color: gray;
		font-size: 24rpx;
	}
}
</style>
