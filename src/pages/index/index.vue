<template>
  <view class="box1">
    <view class="box2"></view>
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
    <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.box1 {
  width: 400rpx;
  height: 400rpx;
  background-color: red;
  .box2 {
    width: 200rpx;
    height: 200rpx;
    background-color: pink;
  }
}
</style>
