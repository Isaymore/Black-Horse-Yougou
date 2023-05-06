<template>
  <!-- 解决商品价格和商品名称闪烁的问题 -->
  <!-- 导致问题的原因：在商品详情数据请求回来之前，data 中 goodsInfo 的值为 {}，因此初次渲染页面时，会导致 商品价格、商品名称 等闪烁的问题 -->
  <view class="goods-detail-wrap" v-if="goodsInfo.goods_name">
    <!-- 轮播图区域 -->
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in goodsInfo.pics" :key="item.goods_id">
        <view class="swiper-item">
          <!-- 将当前点击的图片的索引，传递到 preview() 处理函数中 -->
          <image class="swiper-item-img" :src="item.pics_big_url" mode="widthFix" @click="previewImage(index)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="goods-price">
        ￥{{goodsInfo.goods_price}}
      </view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">
          {{goodsInfo.goods_name}}
        </view>
        <!-- 收藏 -->
        <view class="goods-collect">
          <uni-icons type="star" color="gray" size="18"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="goods-carriage">
        快递：免运费
      </view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <view class="goods-nav">
      <!-- 方法一：自行手写 -->
      <my-goods-<!-- nav hoverClass="none">
        <template #cart>
          <view class="cart">
            <uni-icons type="cart" color="gray" size="22"></uni-icons>
            <text>购物车</text>
          </view>
        </template>
        </my-goods-nav> -->
        <!-- 方法二：使用DCloud官方组件：uni-goods-nav 商品导航 -->
        <!-- fill 右侧按钮是否平铺 -->
        <!-- options 左侧的配置项 -->
        <!-- buttonGroup 右侧按钮组的配置项 -->
        <!-- @click 左侧的点击事件 -->
        <!-- @buttonClick 右侧按钮组的点击事件 -->
        <uni-goods-nav fill :options="options" :buttonGroup="buttonGroup" @click="leftClick" @buttonClick="rightClick">
        </uni-goods-nav>
    </view>
  </view>
</template>

<script>
  // 按需引入 mapMutations 辅助函数
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getGoodsDetail
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        // 商品详情对象
        goodsInfo: {},
        // 左侧配置对象
        options: [{
            icon: 'shop',
            text: '店铺'
          }, {
            icon: 'headphones',
            text: '客服'
          },
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        // 右侧按钮组的配置对象
        buttonGroup: [{
          text: '加入购物车',
          backgroundColor: '#ff0000',
          color: '#fff'
        }, {
          text: '立即购买',
          backgroundColor: '#ffa200',
          color: '#fff'
        }]
      };
    },
    computed: {
      ...mapGetters(['total'])
    },
    watch: {
      // 1. 监听 total 值的变化
      total: {
        // 页面初次加载完毕后，立即调用侦听器
        immediate: true,
        handler(newVal) {
          // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
          const findResult = this.options.find(item => item.icon === 'cart')
          // 3. 动态为购物车按钮的 info 属性赋值
          if (findResult) {
            findResult.info = newVal
          }
        }
      }
    },
    onLoad(option) {
      this.getGoodsDetail(option.goods_id)
    },
    methods: {
      // 借助mapMutations生成与mutations对话的方法
      // 将购物车模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('cart', ['addToCart']),
      leftClick({
        index,
        content
      }) {
        if (content.icon === 'cart') {
          // 切换到购物车页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      rightClick({
        index,
        content
      }) {
        // 1. 判断是否点击了 加入购物车 按钮
        if (index === 0) {
          // 2. 整理一个商品的信息对象
          const {
            goods_id,
            goods_name,
            goods_price,
            goods_small_logo
          } = this.goodsInfo
          const goods = {
            goods_id,
            goods_name,
            goods_price,
            goods_small_logo,
            goods_count: 1,
            goods_state: true // 商品的勾选状态
          }
          // 3. 通过 this 调用映射过来的 addToCart 方法，将商品信息对象存储到购物车小仓库中
          this.addToCart(goods)
        }
      },
      async getGoodsDetail(goods_id) {
        const res = await getGoodsDetail({
          goods_id
        })
        if (res.meta.status !== 200) return this.$showMsg(res.meta.msg)
        this.goodsInfo = res.message
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        // 解决 .webp 格式图片在 ios 设备上无法正常显示的问题
        // 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
        this.goodsInfo.goods_introduce.replace(/<img/g, '<img style="display: block;"').replace(/webp/g, 'jpg')
      },
      // 实现轮播图的预览效果
      previewImage(index) {
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示对应索引的图片
          current: index,
          urls: this.goodsInfo.pics.map(item => item.pics_big_url),
          longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import url('./style/goods_detail.less');
</style>
