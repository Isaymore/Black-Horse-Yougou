<template>
	<view class="search-wrap">
		<view class="search-box">
			<view class="box">
				<uni-icons type="search" size="16"></uni-icons>
				<view class="input-box">
					<input type="text" value="" placeholder="请输入搜索内容" />
				</view>
			</view>
		</view>
		<view class="search-history">
			<view class="search-history-top">
				<text class="title">搜索历史</text>
				<uni-icons type="fire" size="16"></uni-icons>
			</view>
			<view class="search-history-bottom">
				<text class="search-history-item">apple</text>
				<text class="search-history-item">apple</text>
				<text class="search-history-item">apple</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	@import url('./style/search.less');
</style>