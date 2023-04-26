// 本地持久化存储
export const setStorage = (key, data) => uni.setStorageSync(key, data)
export const getStorage = (key) => uni.getStorageSync(key)
export const removeStorage = (key) => uni.removeStorageSync(key)
