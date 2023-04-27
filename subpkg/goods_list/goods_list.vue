<template>
  <view class="goods-list-wrap">
    <my-goods-item :item="item" v-for="item in goodsList" :key="item.goods_id"></my-goods-item>
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
          pagesize: 10
        },
        goodsList: [],
        // 总数量，用来实现分页查询
        total: 0
      }
    },
    onLoad(option) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const res = await getGoodsList(this.queryObj)
        if (res.meta.status !== 200) return this.$showMsg(res.meta.msg)
        this.goodsList = res.message.goods
        this.total = res.message.total
      }
    }
  }
</script>

<style lang="less">
  @import url('./style/goods_list.less');
</style>
