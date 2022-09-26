<template>
  <view class="my-container">
    <!-- 没有 token 显示登录 -->
    <my-login v-if="!token"></my-login>

    <!-- 有 token 显示用户信息 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import badge from '@/mixins/badge'
import MyLogin from '@/components/my-login.vue'
import MyUserinfo from '@/components/my-userinfo.vue'
export default {
  mixins: [badge],
  data() {
    return {}
  },
  components: {
    MyLogin,
    MyUserinfo
  }
}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
