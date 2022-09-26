<template>
  <view class="cart-container" v-if="cartItems.length > 0">
    <my-address />
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>

      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="product in cartItems" :key="product.goods_id">
      <uni-swipe-action>
        <uni-swipe-action-item :right-options="swipeOptions" @click="handleSwipeOptions(product)">
          <view class="goods-item">
            <!-- 商品左侧图片区域 -->
            <view class="goods-item-left">
              <radio :checked="product.goods_state" color="#C00000" @click="handleProduct(product)"></radio>
              <image :src="product.goods_small_logo || defaultImage" class="goods-pic"></image>
            </view>

            <!-- 商品右侧信息区域 -->
            <view class="goods-item-right">
              <!-- 商品标题 -->
              <view class="goods-name">{{ product.goods_name }}</view>
              <view class="goods-info-box">
                <!-- 商品价格 -->
                <view class="goods-price">{{ product.goods_price | formatPrice }}</view>
                <!-- 商品数量 -->
                <uni-number-box :min="1" :value="product.goods_count" @change="handleChange(product, $event)"></uni-number-box>
              </view>
            </view>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </block>
    <my-checkout />
  </view>
  <!-- 购物车无商品时 -->
  <view class="empty-cart" v-else>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import badge from '@/mixins/badge'
import MyAddress from '@/components/my-address.vue'
import MyCheckout from '@/components/my-checkout.vue'
export default {
  data() {
    return {
      defaultImage: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      swipeOptions: [
        {
          text: '删除', // 显示的按钮文本
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }
      ]
    }
  },
  mixins: [badge],
  computed: {
    ...mapState('cart', ['cartItems'])
  },
  components: {
    MyAddress,
    MyCheckout
  },
  methods: {
    // 处理选中状态
    handleProduct(item) {
      // console.log(item)
      // 更新store中的数据
      this.$store.commit('cart/updateState', item)
    },
    // 处理数量
    handleChange(product, num) {
      // console.log(item,+num)
      // 更新数量
      this.$store.commit('cart/updateCount', {
        product,
        // 因为传过来得是字符串，需要转为number类型
        num: +num
      })
    },
    // 右划删除
    handleSwipeOptions(product) {
      // console.log(product)
      // 更新store中的数据
      this.$store.commit('cart/removeItem', product)
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  padding-bottom: 100rpx;

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
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 26rpx;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .goods-price {
        font-size: 32rpx;
        color: #c00000;
      }
    }
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 300rpx;

  .tip-text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}
</style>
