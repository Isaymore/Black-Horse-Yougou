<template>
  <view class="goods-detail-wrap">
    <!-- 轮播图区域 -->
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in goodsInfo.pics" :key="item.goods_id">
        <view class="swiper-item">
           <!-- 将当前点击的图片的索引，传递到 preview() 处理函数中 -->
          <image class="swiper-item-img" :src="item.pics_big_url" mode="widthFix" @click="previewImage(index)"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import {
    getGoodsDetail
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        goodsInfo: {}
      };
    },
    onLoad(option) {
      // console.log(option.goods_id)
      this.getGoodsDetail(option.goods_id)
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const res = await getGoodsDetail({
          goods_id
        })
        console.log("星爷-res", res)
        if (res.meta.status !== 200) return this.$showMsg(res.meta.msg)
        this.goodsInfo = res.message
      },
      // 实现轮播图的预览效果
      previewImage(index){
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示对应索引的图片
          current: index,
          urls:this.goodsInfo.pics.map(item=>item.pics_big_url),
          longPressActions:{
            itemList:['发送给朋友','保存图片','收藏'],
          }
        })
      }
    }
  }
</script>

<style lang="less">
@import url('./style/goods_detail.less');
</style>
