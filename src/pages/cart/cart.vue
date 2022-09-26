<template>
  <view>
    <!-- 地址信息 -->
    <my-address></my-address>

    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>

      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="product in cartItems" :key="product.goods_id">
      <view class="goods-item">
        <!-- 商品左侧图片区域 -->
        <view class="goods-item-left">
          <radio :checked="product.goods_state" color="#C00000" @click="radioChangeHandler(product)"></radio>
          <image :src="product.goods_small_logo || defaultImage" class="goods-pic"></image>
        </view>

        <!-- 商品右侧信息区域 -->
        <view class="goods-item-right">
          <!-- 商品标题 -->
          <view class="goods-name">{{ product.goods_name }}</view>
          <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="goods-price">￥{{ product.goods_price | formatPrice }}</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import MyAddress from '@/components/my-address.vue'
export default {
  components: {
    MyAddress
  },
  data() {
    return {
      defaultImage: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },

  computed: {
    ...mapState('cart', ['cartItems'])
  },
  methods: {
    radioChangeHandler(item) {
      // 更新store中的数据
      this.$store.commit('cart/updateState', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-title {
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 1rpx solid #efefef;
  .cart-title-text {
    margin-left: 20rpx;
  }
}
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;
  width: 750rpx;
  box-sizing: border-box;

  .goods-item-left {
    margin-right: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
    }

    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
}
</style>
