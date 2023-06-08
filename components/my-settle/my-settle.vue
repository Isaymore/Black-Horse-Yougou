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
import { createOrder, prepayOrder, chkOrder } from '@/api/pay.js';
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
			// 倒计时的秒数
			seconds: 3,
			// 定时器的 Id
			timer: null,
			orderInfo: '', // 订单的信息对象
			orderNum: '', // 订单编号
			payInfo: {} // 订单支付对象
		};
	},
	computed: {
		...mapState('user', ['token']),
		...mapGetters(['total', 'totalAmount', 'addressDetail', 'selectedCartList'])
	},
	beforeDestroy() {
		// 组件销毁前清除定时器
		clearTimeout(this.timer);
	},
	methods: {
		...mapMutations('user', ['updateRedirectInfo']),
		changeAllState() {
			this.$emit('all-checked-ev', !this.isAllChecked);
		},
		// 点击了结算按钮
		settle() {
			// 1. 先判断是否勾选了要结算的商品
			if (!this.total) return this.$showMsg('请选择要结算的商品~');

			// 2. 再判断用户是否选择了收货地址
			if (!this.addressDetail) return this.$showMsg('请选择收货地址~');

			// 3. 最后判断用户是否登录了，如果没有登录，则调用 delayNavigate方法 进行倒计时的导航跳转
			if (!this.token) return this.delayNavigate();
			// 4. 实现微信支付功能
			this.payOrder();
		},
		// 微信支付
		payOrder() {
			// 1. 创建订单
			this.createOrder();
		},
		// 1. 创建订单
		async createOrder() {
			// 1.1 整理订单的信息对象
			this.orderInfo = {
				// 开发期间，注释掉真实的订单价格
				// order_price:this.totalAmount
				// 写死订单金额为 1 分钱
				order_price: 0.01, // 订单金额
				consignee_addr: this.addressDetail, // 收货地址
				// 订单中包含的商品信息
				goods: this.selectedCartList.map((item) => ({ goods_id: item.goods_id, goods_price: item.goods_price, goods_number: item.goods_count }))
			};
			// 1.2 发起请求创建订单
			const res = await createOrder();
			console.log('星爷-createOrder-res', res, typeof res);
			try {
				// if (res.meta.status !== 200) throw '创建订单失败';
				// if (res.meta.status !== 200) throw res;
				if (res.meta.status !== 200) return this.$showMsg('创建订单失败');
				// 1.3 得到服务器响应的“订单编号”
				this.orderNum = res.message.order_number;
				// 2.订单预支付
				this.prepayOrder();
			} catch (e) {
				//TODO handle the exception
				console.log('星爷-e', e, typeof e);
			}
		},
		// 2. 订单预支付
		// 2.1 发起请求获取订单的支付信息
		async prepayOrder() {
			const res = await prepayOrder({
				order_number: this.orderNum
			});
			console.log('星爷-prepayOrder-res', res, typeof res);
			try {
				if (res.meta.status !== 200) return this.$showMsg('订单预支付失败');
				// 2.2 得到订单支付相关的必要参数
				this.payInfo = res.message.pay;
				// 3. 发起微信支付
				// 3.1 调用 uni.requestPayment() 发起微信支付
				const [err, succ] = await uni.requestPayment(this.payInfo);
				// 3.2 未完成支付
				if (err) return uni.$showMsg('uni.requestPayment失败，订单未支付');
				// 3.3 完成支付，进一步查询支付的结果
				this.chkOrder();
			} catch (e) {
				//TODO handle the exception
			}
		},
		async chkOrder() {
			const res = await chkOrder({
				order_number: this.orderNum
			});
			console.log('星爷-chkOrder-res', res, typeof res);
			// 3.4 检测到订单未支付
			if (res.meta.status !== 200) return this.$showMsg('chkOrder后端接口失败，订单未支付');
			// 3.5 检测到订单支付成功
			uni.showToast({
				title: '支付成功'
			});
		},
		// 展示倒计时的提示消息
		showTips(n) {
			// 调用 uni.showToast() 方法，展示提示消息
			uni.showToast({
				title: `请登录后再结算！${n}s后自动跳转到登录页`, // 提示的内容
				icon: 'none', // 不显示图标
				mask: true, // 显示透明蒙层，防止触摸穿透
				duration: 1500 // 提示的延迟时间：1500ms
			});
		},
		// 延迟导航到 my 页面
		delayNavigate() {
			// 将 data 中的秒数重置成 3 秒
			// 原因：从其他页面切回到购物车页面，my-settle组件不会重新创建，created钩子函数不会执行
			// 所以，seconds 秒数不会被重置，导致第 2 次，3 次，n 次 的没有倒计时跳转
			this.seconds = 3;
			this.showTips(this.seconds);
			// // 方法一：创建定时器setTimeout，3s后执行，toast静态显示1次
			// // 将定时器的 Id 存储到 timer 中
			// this.timer = setTimeout(() => {
			// 跳转到 my 页面
			// 	uni.switchTab({
			// 		url: '/pages/my/my'
			// 	});
			// }, this.seconds * 1000);
			// 方法二：创建定时器setInterval,每1s执行一次，toast动态显示
			// 1.将定时器的 Id 存储到 timer 中
			this.timer = setInterval(() => {
				this.seconds--;
				// 2. 判断秒数是否 <= 0
				if (this.seconds <= 0) {
					// 2.1 清除定时器
					clearInterval(this.timer);
					// 2.2 跳转到 my 页面
					uni.switchTab({
						url: '/pages/my/my',
						success: () => {
							// 调用 user小仓库 的 updateRedirectInfo 方法，将跳转信息存储到 user小仓库 中
							this.updateRedirectInfo({
								// 跳转的方式
								openType: 'switchTab',
								// 从哪个页面跳转过去的
								fromPage: '/pages/cart/cart'
							});
						}
					});
					// 2.3 终止后面代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
					return;
				}
				this.showTips(this.seconds);
			}, 1000);
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
