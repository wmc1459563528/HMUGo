export default {
  namespaced: true,

  state() {
    const addressStr = uni.getStorageSync('address')
    const userInfoStr = uni.getStorageSync('userInfo')
    return {
      token: '',
      address: addressStr ? JSON.parse(addressStr) : {},
      userInfo: userInfoStr ? JSON.parse(userInfoStr) : {}
    }
  },

  getters: {
    // 收货详细地址的计算属性
    fullAddress(state) {
      const { provinceName, cityName, countyName, detailInfo } = state.address
      if (!provinceName) return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return provinceName + cityName + countyName + detailInfo
    }
  },

  mutations: {
    setAddress(state, newAddress) {
      // 将地址存放到仓库
      state.address = newAddress
      // 存储到本地
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    setUserInfo(state, userInfo) {
      // 将用户信息存放到仓库
      state.userInfo = userInfo
      // 存储到本地
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    }
  },

  actions: {},
}