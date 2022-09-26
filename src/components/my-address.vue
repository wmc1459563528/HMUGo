<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="handleChooseAddress">请选择收货地址</button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="handleChooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">
            收货人：<text>{{ address.userName }}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：<text>{{ address.telNumber }}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>

      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ fullAddress }} </view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <view class="address-border"></view>
  </view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    // 从仓库中取到地址
    ...mapState('user', ['address']),
    ...mapGetters('user', ['fullAddress'])
  },
  methods: {
    // 添加收获人信息
    async handleChooseAddress() {
      //    返回值是一个数组：
      //        - 第 1 项为错误对象
      //        - 第 2 项为成功之后的收货地址对象
      const [err, res] = await uni.chooseAddress()
      if (err) return this.$message('选择收货地址失败')
      this.$store.commit('user/setAddress', res)
    }
  }
}
</script>

<style scoped lang="scss">
// 底部边框线的样式
.address-border {
  display: block;
  width: 100%;
  height: 10rpx;
  border-bottom: 1rpx solid #efefef;
}

// 选择收货地址的盒子
.address-choose-box {
  height: 180rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
  font-size: 24rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rpx;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 10rpx;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 20rpx;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
