<template>
	<view class="search-wrap">
		<view class="search-box">
			<view class="box">
				<uni-icons type="search" size="16"></uni-icons>
				<view class="input-box">
					<input :value="keyword" @input="inputFun" focus type="text" placeholder="请输入关键字搜索" />
				</view>
				<uni-icons type="close" size="16" @click="closeFun"></uni-icons>
			</view>
		</view>
		<!-- 搜索建议列表 -->
		<view class="suggest-list" v-if="suggestList.length">
			<view class="suggest-item" v-for="item in suggestList" :key="item.goods_id" @click="gotoDetail(item)">
				<text class="suggest-item-title">{{item.goods_name}}</text>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text class="title">搜索历史</text>
				<uni-icons type="trash" size="16" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 历史列表 -->
			<view class="history-list">
				<text class="history-item" v-for="(item, index) in historyList" :key="index"
					@click="gotoGoodsList(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSearchList
	} from '@/api/goods.js'
	import {
		setStorage,
		getStorage,
		removeStorage
	} from '@/utils/storage.js'
	export default {
		data() {
			return {
				keyword: '', // 搜索关键字
				timer: null, // 定时器的timerId
				suggestList: [], // 搜索建议列表
				// 搜索历史列表
				// 方法一：读取本地存储的搜索历史
				// 或者在onLoad()生命周期钩子函数，加载本地存储的搜索历史
				historyList: getStorage('historyList') || []
			};
		},
		onLoad() {
			// 方法二：加载本地存储的搜索历史
			this.historyList = getStorage('historyList') || []
		},
		methods: {
			inputFun(e) {
				// 判断timmer是否有值，如果有值，清除定时器
				if (this.timer) {
					clearTimeout(this.timer)
				}
				// 重新启动一个定时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					// 如果 1000 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					this.keyword = e.target.value
					// 根据关键词，查询搜索建议列表
					this.getSearchList()
				}, 1000)
			},
			async getSearchList() {
				// 判断搜索关键词是否为空白字符（空格、tab、不换行空格等）
				if (this.keyword.trim() === '') {
					this.suggestList = []
					return
				}
				// 发起请求，获取搜索建议列表
				const res = await getSearchList({
					query: this.keyword
				})
				if (res.meta.status !== 200) return this.$showMsg(res.meta.msg)
				this.suggestList = res.message
				// 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
				this.saveSearchHistory()
			},
			// 保存搜索关键词到搜索历史列表
			saveSearchHistory() {
				// 直接将搜索关键词 unshift 到 historyList 数组中
				// this.historyList.unshift(this.keyword)
				// 1. 将 Array 数组转化为 Set 对象
				const mySet = new Set(this.historyList)
				// 2. 调用 Set 对象的 delete 方法，删除对应的元素
				// 不用delete也行，因为Set对象中没有具有相同值的元素，add()方法才会添加到Set对象中
				// mySet.delete(this.keyword)
				// 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
				mySet.add(this.keyword)
				// 4. 将 Set 对象转化为 Array 数组
				// 方法一:ES5语法
				// this.historyList = Array.from(set)
				// 方法二:推荐ES6语法 - 拓展运算符
				this.historyList = [...mySet].reverse()
				// 本地持久化存储
				setStorage('historyList', this.historyList)
			},
			// 清空搜索历史记录
			cleanHistory() {
				// 清空 data 中保存的搜索历史
				this.historyList = []
				// 清空本地存储中记录的搜索历史
				removeStorage('historyList')
			},
			gotoDetail(item) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
			closeFun() {
				this.keyword = ''
				this.suggestList = []
			},
			// 点击跳转到商品列表页面
			gotoGoodsList(item) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${item}`
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('./style/search.less');
</style>