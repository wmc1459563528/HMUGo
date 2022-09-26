<template>
  <view v-if="info.goods_id">
    <swiper
      indicator-dots 
      autoplay 
      circular 
    >
      <swiper-item v-for="(item, index) in info.pics" :key="index">
        <image :src="item.pics_big" @click="handlePreviewClick(index)" />
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">{{ info.goods_price | formatPrice }}</view>

      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{ info.goods_name }}</view>

        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>

      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 3. 商品详情 -->
    <rich-text :nodes="info.goods_introduce"></rich-text>
    <!-- 商品导航工具栏组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav 
        :fill="true" 
        :options="leftOptions" 
        :buttonGroup="rightOptions" 
        @click="leftButtonClick" 
        @buttonClick="rightButtonClick" 
      />
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      pid: '',
      info: {},
            // 左侧按钮组的配置对象
      leftOptions: [
        {
          icon: "shop",
          text: "店铺",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0,
        },
      ],

      // 右侧按钮组的配置对象
      rightOptions: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
          color: "#fff",
        },
      ]
    }
  },
  computed: {
    ...mapGetters('cart',['total'])
  },
  watch: {
    total:{
      immediate:true, // 只要内部变化就更新数据
      handler(val){
        this.leftOptions[1].info = val
      }
    }
  },
  onLoad(options) {
    this.pid = options.pid || ''
    this.getProductDetail()
  },
  methods: {
    // 获取数据
    async getProductDetail() {
      const { meta, message } = await this.$http.get('/goods/detail', {
        goods_id: this.pid
      })

      if (meta.status !== 200) return this.$msg()

      // console.log(message)
      /* 
      处理图片间隙问题 使用replace替换样式为display:block，或者设置vertical-aligin
      <img => <img style="display:block"
      */
      message.goods_introduce = message.goods_introduce.replace(/<img /gi, '<img style="display:block"')
      this.info = message
    },
    handlePreviewClick(index) {
      uni.previewImage({
        // 默认显示图片的索引
        current: index,
        // 图片地址
        urls: this.info.pics.map(pic => pic.pics_big)
      })
    },
    // 商品导航-左侧
    leftButtonClick({index,content}){
      if (index === 0) {
        uni.switchTab({ url: '/pages/home/home' })
      }
      if (index === 1) {
        uni.switchTab({ url: '/pages/card/card' })
      }
    },
     // 商品导航-右侧
    rightButtonClick({index,content}){
       if (index === 0) {
        // 组织一个商品信息对象
        const item = {
          goods_id: this.info.goods_id, // 商品的Id
          goods_name: this.info.goods_name, // 商品的名称
          goods_price: this.info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.info.goods_small_logo, // 商品的图片
          goods_state: false, // 商品的勾选状态
        };
        this.$store.commit('cart/addToCart',item)
        // console.log(this.$store.state.cart.cartItems)
      }
      if (index === 1) {
      
      }
    }
  }
}
</script>

<style lang="scss" scoped>
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 20rpx;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 36rpx;
    margin: 20rpx 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 26rpx;
      padding-right: 20rpx;
    }
    // 收藏区域
    .favi {
      width: 240rpx;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1rpx solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 20rpx 0;
    font-size: 24rpx;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器底部添加 100rpx 的 padding
  // 防止页面内容被底部商品导航组件遮盖
  padding-bottom: 100rpx;
}

.goods_nav {
  // 将工具栏固定在页面底部
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
