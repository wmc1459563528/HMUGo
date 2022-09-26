<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="handleOneLogin">一键登录</button>

    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
export default {
  methods: {
    async handleOneLogin() {
      const [err, res] = await uni.getUserProfile({
        desc: '获取用户基本信息'
      })
      if (err) return this.$message('获取用户信息失败')
      const userInfo = res.userInfo
      //   console.log(userInfo)
      //将用户信息更新到vuex
      this.$store.commit('user/setUserInfo', userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 80rpx;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 200rpx;
    margin: 30rpx 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 24rpx;
    color: gray;
  }
}
</style>
