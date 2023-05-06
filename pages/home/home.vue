<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <view class="home-wrap">
      <!-- 轮播图区域 -->
      <swiper class="top-banner" circular :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
        <!-- 循环渲染轮播图的 item 项 -->
        <swiper-item v-for="item in swiperList" :key="item.goods_id">
          <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`"
            :open-type="item.open_type" hover-class="none">
            <!-- 动态绑定图片的 src 属性 -->
            <image :src="item.image_src" mode="widthFix"></image>
          </navigator>
        </swiper-item>
      </swiper>
      <!-- 分类导航区域 -->
      <view class="nav-list">
        <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClick(item)">
          <image class="nav-img" :src="item.image_src" mode="widthFix"></image>
        </view>
      </view>
      <!-- 楼层区域 -->
      <view class="floor-list">
        <!-- 楼层 item 项 -->
        <view class="floor-item" v-for="(item, index) in floorList" :key="index">
          <!-- 楼层标题区域 -->
          <view class="floor-title">
            <image class="floor-title-img" :src="item.floor_title.image_src" mode="widthFix"></image>
          </view>
          <!-- 楼层图片区域 -->
          <view class="floor-content">
            <!-- 左侧大图片的盒子 -->
            <navigator class="product-left" :url="item.product_list[0].url">
              <!-- item.product_list && item.product_list[0] &&  -->
              <image class="product-img" :style="{width: item.product_list[0].image_width + 'rpx'}"
                :src="item.product_list[0].image_src" mode="widthFix"></image>
            </navigator>
            <!-- 右侧 4 个小图片的盒子 -->
            <view class="product-right">
              <navigator class="right-img-item" v-for="(obj, i) in item.product_list.slice(1)" :key="i" :url="obj.url">
                <image class="product-img" :style="{width: obj.image_width + 'rpx'}" :src="obj.image_src"
                  mode="widthFix"></image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    badgeMixin
  } from '@/mixin/badge/index.js'
  import {
    getSwiperList,
    getNavList,
    getFloorList
  } from '@/api/home.js'
  export default {
    mixins: [badgeMixin],
    data() {
      return {
        swiperList: [], // 1. 轮播图的数据列表，默认为空数组
        navList: [],
        floorList: [],
        productList: []
      };
    },
    onLoad() {
      this.getSwiperList() // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // getSwiperList() {
      // 	this.$http
      // 		.get('/api/public/v1/home/swiperdata')
      // 		.then(res => {
      // 			console.log(res)
      // 			this.swiperList = res.message
      // 		})
      // 		.catch(error => {
      // 			console.log(error)
      // 		})
      // },
      // 3. 获取轮播图数据的方法
      async getSwiperList() {
        try {
          // 3.1 发起请求
          const res = await getSwiperList()
          if (res.meta.status === 200) {
            // 3.2 请求成功，为 data 中的数据赋
            this.swiperList = res.message
          } else {
            // 3.3 请求失败
            uni.showToast({
              title: '获取轮播图失败',
              icon: 'error',
              duration: 2000
            })
          }
        } catch (e) {
          //TODO handle the exception
          console.log('星爷-e', e, typeof e)
        }

      },
      // async getNavList() {
      // 	try {
      // 		const res = await this.$http.get('/api/public/v1/home/catitems')
      // 		console.log('getNavList-res', res)
      // 		const {
      // 			message,
      // 			meta
      // 		} = res
      // 		if (meta.status === 200) {
      // 			this.navList = message
      // 		} else {

      // 		}

      // 	} catch (e) {
      // 		//TODO handle the exception
      // 		console.log('星爷-e', e, typeof e)
      // 	}
      // },
      getNavList() {
        try {
          getNavList().then((res) => {
            if (res.meta.status === 200) {
              this.navList = res.message
            } else {
              uni.showToast({
                title: '导航菜单失败',
                icon: 'error',
                duration: 2000
              })
            }
            // throw new Error('报错了~')
            // Promise.reject('抱歉，错误~')
          }).catch((error) => {
            console.log('星爷-error', error, typeof error)
          })
        } catch (e) {
          //TODO handle the exception
          console.log('星爷-e', e, typeof e)
        }
      },
      navClick(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const res = await getFloorList()
        if (res.meta.status !== 200) return uni.showToast({
          title: '数据请求失败',
          icon: 'error',
          duration: 2000
        })
        this.floorList = res.message
        // 通过双层 forEach 循环，处理 URL 地址
        this.floorList.forEach((item) => {
          item.product_list.forEach((obj) => {
            const query = obj.navigator_url.split('?')[1]
            obj.url = `/subpkg/goods_list/goods_list?${query}`
          })
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import url('./style/home.scss');
</style>
