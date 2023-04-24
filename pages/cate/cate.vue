<template>
  <view class="cate-wrap">
    <!-- 左侧的滚动视图区域 -->
    <scroll-view class="cate-scroll-left" scroll-y="true" :style="{height: windowHeight + 'px'}"
      :scroll-top="scrollTop">
      <!-- 动态渲染一级分类的列表数据 -->
      <block v-for="(item, index) in cateList" :key="item.cat_id">
        <view class="cate-scroll-left-item" :class="{active: index === active}" @click="changeActive(index)">
          {{item.cat_name}}
        </view>
      </block>
    </scroll-view>
    <!-- 右侧的滚动视图区域 -->
    <scroll-view class="cate-scroll-right" scroll-y="true" :style="{height: `${windowHeight}px`}">
      <!-- 动态渲染二级分类的列表数据 -->
      <view class="cate-level-2" v-for="item in cateLevel2List" :key="item.cat_id">
        <!-- 二级分类标题 -->
        <view class="cate-level-2-title">
          / {{item.cat_name}} /
        </view>
        <!-- 动态渲染三级分类的列表数据 -->
        <view class="cate-level-3">
          <!-- 三级分类 Item 项 -->
          <view class="cate-level-3-item" v-for="obj in item.children" :key="ojb.cat_id" @click="gotoGoodSList(item)">
            <!-- 图片 -->
            <image class="cate-level-3-img" :src="obj.cat_icon" mode="widthFix"></image>
            <!-- 文本 -->
            <text class="cate-level-3-txt">{{obj.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import {
    getCateList
  } from '@/api/cate.js'
  export default {
    data() {
      return {
        // 动态计算窗口的剩余高度
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        windowHeight: 0,
        cateList: [], // 分类数据列表
        active: 0,
        cateLevel2List: [], // 二级分类列表
        scrollTop: 0 // 滚动条距离顶部的距离
      }
    },
    onReady() {
      // 获取当前系统的信息
      const systemInfo = uni.getSystemInfoSync()
      console.log('星爷-onReady-systemInfo', systemInfo)
      // 给窗口可用高度赋值
      this.windowHeight = systemInfo.windowHeight
    },
    onLoad() {
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const res = await getCateList()
        console.log('星爷-getCateList-res', res)
        if (res.meta.status !== 200) return this.$showMsg()
        this.cateList = res.message
        // 为二级分类初始化赋值
        this.cateLevel2List = res.message[this.active].children
      },
      changeActive(index) {
        this.active = index;
        this.cateLevel2List = this.cateList[index].children
        // 让 scrollTop 的值在 0 与 1 之间切换
        console.log('星爷-thisscrollTop-前', this.scrollTop)
        // this.scrollTop = this.scrollTop ? 0 : 1
        console.log('星爷-thisscrollTop-后', this.scrollTop)
      },
      gotoGoodSList(item) {
        console.log('星爷-gotoGoodSList-item', item)
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?cat_id=${item.cat_id}`
        })
      }
    }
  }
</script>

<style lang="less">
  @import url('./style/cate.less');
</style>
