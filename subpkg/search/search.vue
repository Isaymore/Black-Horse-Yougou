<template>
  <view class="search-wrap">
    <view class="search-box">
      <view class="box">
        <uni-icons type="search" size="16"></uni-icons>
        <view class="input-box">
          <input v-model="keyword" confirm-type="search" @confirm="searchFun" type="text" placeholder="请输入关键字搜索" />
        </view>
        <uni-icons type="close" size="16" @click="closeFun"></uni-icons>
      </view>
    </view>
    <!-- 搜索建议列表 -->
    <view class="suggest-list" v-if="suggestList.length">
      <view class="suggest-item" v-for="item in suggestList" :key="item.goods_id">
        <text class="suggest-item-title">{{item.goods_name}}</text>
        <uni-icons type="right"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history" v-else>
      <!-- 标题 -->
      <view class="history-title">
        <text class="title">搜索历史</text>
        <uni-icons type="fire" size="16"></uni-icons>
      </view>
      <!-- 历史列表 -->
      <view class="history-list">
        <text class="history-item" v-for="(str,index) in historyList" :key="index" @click="gotoGoodsList">{{str}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    searchGoodsList
  } from '@/api/goods.js'
  import {
    setStorage,
    getStorage
  } from '@/utils/storage.js'
  export default {
    data() {
      return {
        keyword: '', // 搜索关键字
        suggestList: [], // 搜索建议列表
        historyList: getStorage('historyList') || [] // 搜索历史列表
      };
    },
    watch: {
      keyword(newVal) {
        if(!newVal) this.suggestList = []
        this.searchGoodsList({
          newVal,
          pagenum: 1,
          pagesize: 20
        })
      },
      historyList(newList) {
        // const mySet = new Set(this.historyList)
        setStorage('historyList', newList)
      }
    },
    methods: {
      async searchGoodsList(keyword) {
        const res = await searchGoodsList(keyword)
        if (res.meta.status !== 200) return this.$showMsg()
        this.suggestList = res.message.goods
      },
      searchFun() {
        if (!this.keyword.length) return
        this.historyList.unshift(this.keyword)
        this.historyList = [...new Set(this.historyList)]
      },
      closeFun() {
        console.log(666)
        this.keyword = ''
      },
      gotoGoodsList() {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list'
        })
      }
    }
  }
</script>

<style lang="less">
  @import url('./style/search.less');
</style>
