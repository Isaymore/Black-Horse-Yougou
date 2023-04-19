<template>
	<view class="home-wrap">
		<swiper class="top-banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<view class="swiper-item">
					<image :src="item.image_src" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClick(item)">
				<image class="nav-img" :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
		},
		methods: {
			getSwiperList() {
				this.$http
					.get('/api/public/v1/home/swiperdata')
					.then(res => {
						console.log(res)
						this.swiperList = res.message
					})
					.catch(error => {
						console.log(error)
					})
			},
			async getNavList() {
				try {
					const res = await this.$http.get('/api/public/v1/home/catitems')
					console.log('getNavList-res', res)
					const {message, meta} = res
					if(meta.status === 200){
						this.navList = message
					}else {
						
					}
					
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				}

			},
			navClick(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import url('./style/home.scss');
</style>