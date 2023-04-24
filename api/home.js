/**
 * 首页相关api
 */
// 引入http请求工具，或者说引入Request实例（该Request实例支持对象调用）
import {
	http
} from '@/api/service.js'

/**
 * 查询首页轮播图列表
 * 
 */
export const getSwiperList = () => {
	return http.get('/api/public/v1/home/swiperdata')
}

/**
 * 查询导航菜单列表
 */
export const getNavList = () => {
	return http.get('/api/public/v1/home/catitems')
}

/**
 * 查询楼层产品列表
 */
export const getFloorList = () =>{
  return http.get('/api/public/v1/home/floordata')
}