<template>
  <view class="goods-list-wrap" v-if="isShow">
    <template v-if="goodsList.length">
      <view v-for="item in goodsList" :key="item.goods_id" @click="gotoDetail(item)">
        <my-goods-item :item="item">
        </my-goods-item>
      </view>
    </template>
    <view class="no-data" v-else>
      暂无商品，快去购买~
    </view>
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码
          pagenum: 1,
          // 每页显示条数
          pagesize: 5
        },
        goodsList: [],
        // 总数量，用来实现分页查询，查询是否暂无更多数据
        total: 0,
        // 节流阀，是否正在请求数据
        isLoading: false,
        isShow: false
      }
    },
    onLoad(option) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // 重置列表为第一页 
      this.queryObj.pagenum = 1
      // 手动置空列表
      this.goodsList = []
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    onReachBottom() {
      /**
       * 方法一：判断数据是否加载完毕，判断是否还有下一页数据
       * 当前的页码 * 每页显示条数 >= 总条数
       * pagenum * pagesize >= total
       */
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return this.$showMsg('-- 我是有底线的 --')
      }
      // 方法二：判断数据是否加载完毕，判断是否还有下一页数据
      // if (this.goodsList.length === this.total) {
      //   return this.$showMsg('-- 我是有底线的 --')
      // }
      // 判断是否正在请求数据，如果是，则不发起额外的请求
      if (this.isLoading) return
      // 页码+1
      this.queryObj.pagenum++
      // 重新获取列表数据
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(callback) {
        // 打开节流阀
        this.isLoading = true
        // 发起请求
        const res = await getGoodsList(this.queryObj)
        // 关闭节流阀
        this.isLoading = false
        this.isShow = true
        // 只要数据请求完毕，就立即按需调用 callback 回调函数
        callback && callback()
        if (res.meta.status !== 200) return this.$showMsg(res.meta.msg)
        // 使用扩展运算符，拼接新旧数组
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 点击跳转到商品详情页面
      gotoDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?goods_id${item.goods_id}`
        })
      }
    }
  }
</script>

<style lang="less">
  @import url('./style/goods_list.less');
</style>
