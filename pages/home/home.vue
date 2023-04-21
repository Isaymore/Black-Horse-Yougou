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
    <view class="floor-wrap" v-for="(item, index) in floorList" :key="index">
      <view class="product-left">
        <image class="product-img" :src="item.product_list[0].image_src" mode="widthFix"></image>
      </view>
      <view class="product-right">
        <image v-for="(obj, i) in item.product_list.slice(1)" :key="i" class="product-img" :src="obj.image_src" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getSwiperList,
    getNavList,
    getFloorList
  } from '@/api/home.js'
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: [],
        productList: []
      };
    },
    onLoad() {
      this.getSwiperList()
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
      async getSwiperList() {
        try {
          const res = await getSwiperList()
          console.log('getSwiperList-res', res)
          if (res.meta.status === 200) {
            this.swiperList = res.message
          } else {
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
            console.log('getNavList-res', res);
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
        console.log('getFloorList', res)
        if (res.meta.status !== 200) return uni.showToast({
          title: res.message,
          icon: 'error',
          duration: 2000
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
  @import url('./style/home.scss');
</style>
