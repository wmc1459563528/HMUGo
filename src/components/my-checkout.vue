<template>
  <!-- 最外层的容器 -->
  <view class="my-checkout-container">
    <!-- 全选区域 -->
    <label class="radio">
      <radio color="#C00000" :checked="isCheckedAll" @click="checkAllHandler(!isCheckedAll)" />
      <text>全选</text>
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedAmount }}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-checkout" @click="handleCheckout">结算({{ checkedTotal }})</view>
  </view>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      // 定时器状态
      timer: null,
      // 秒数
      second: 3
    }
  },
  computed: {
    ...mapGetters('cart', ['checkedTotal', 'total', 'checkedAmount']),
    ...mapState('user', ['address', 'token']),
    ...mapGetters('user', ['fullAddress']),
    // 是否全选
    isCheckedAll() {
      return this.checkedTotal > 0 && this.checkedTotal === this.total
    }
  },
  methods: {
    checkAllHandler(flag) {
      if (this.total === 0) {
        return
      }
      this.$store.commit('cart/updateAllState', flag)
    },
    // 2. 点击结算按钮
    handleCheckout() {
      if (this.checkedTotal === 0) return this.$message('请勾选要结算的商品')
      if (!this.fullAddress) return this.$message('请选择收货的地址')
      if (!this.token) {
        // 重置秒数
        this.second = 3
        // 重置定时器状态
        clearInterval(this.timer)
        this.$message(`结算前请先登录,${this.second}秒后为您跳转到登录页`)
        this.timer = setInterval(() => {
          if (this.second <= 0) {
            // 清空定时器
            clearInterval(this.timer)
            // 跳转到登录页
            uni.switchTab({ url: '/pages/my/my' })
          } else {
            this.second--
            this.$message(`结算前请先登录,${this.second}秒后为您跳转到登录页`)
          }
        }, 1000)
        return
      }
      console.log('我要去付款了...')
    }
  }
}
</script>

<style lang="scss">
.my-checkout-container {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10rpx;
  font-size: 28rpx;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-checkout {
    height: 100rpx;
    min-width: 200rpx;
    background-color: #c00000;
    color: white;
    line-height: 100rpx;
    text-align: center;
    padding: 0 20rpx;
  }
}
</style>
