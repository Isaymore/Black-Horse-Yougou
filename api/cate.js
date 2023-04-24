/**
 * 分类相关api
 */
// 引入http请求工具，或者说引入Request实例（该Request实例支持对象调用）
import {
  http
} from '@/api/service.js'

/**
 * 查询分类列表
 */
export const getCateList = ()=>{
  return http.get('/api/public/v1/categories')
}