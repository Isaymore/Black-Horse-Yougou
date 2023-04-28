/**
 * 商品相关api
 */
// 引入http请求工具，或者说引入Request实例（该Request实例支持对象调用）
import {
  http
} from '@/api/service.js'

/**
 * 商品搜索
 * @param {object} params - 查询参数
 */
export const getSearchList = (params) => {
  return http.get('/api/public/v1/goods/qsearch', {
    params
  })
}

/**
 * 商品列表搜索
 * @param {object} params - 查询参数
 */
export const getGoodsList = (params) => {
  return http.get('/api/public/v1/goods/search', {
    params
  })
}

/**
 * 获取商品详情
 * @param {object} params - 查询参数
 */
export const getGoodsDetail = (params) => {
  return http.get('/api/public/v1/goods/detail', {
    params
  })
}
