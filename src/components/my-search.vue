<template>
  <view 
  class="my-search-container"
  :style="{ backgroundColor: bgColor }"
  >
    
    <!-- 这是一个没有输入功能的假输入框，点击后直接跳转到单独的搜索页面-->
    <view 
    class="my-search-box"
    :style="{ borderRadius: radius }"
    @click="handleClick"
    >
      <uni-icons :type="icon" size="17"></uni-icons>
      <text class="placeholder">{{ title }}</text>
    </view>
    
  </view>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#c00000'
    },
    radius:{
      type:String,
      default:'30rpx'
    },
    title:{
      type:String,
      default:'搜索'
    },
    icon:{
      type:String,
      default:'search'
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
}
</script>


<style scoped lang="scss">
.my-search-container {
  // background-color: #c00000;
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}

.my-search-box {
  height: 72rpx;
  background-color: #ffffff;
  // border-radius: 30rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 30rpx;
    margin-left: 10rpx;
  }
}
</style>