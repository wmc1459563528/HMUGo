<template>
  <view>
    <view class="search-box">
      <my-search bgColor="pink" title="搜你所想" icon="circle" @click="goToSearchPage" />
    </view>
    <swiper class="top-swiper" indicator-dots autoplay circular :interval="3000" :duration="1000">
      <!-- 轮播图中的每一项 -->
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-content" :url="`/pages_sub1/product-detail/product-detail?pid=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="handleNavList(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧 1 个大图 -->
          <view class="left-img-box">
            <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix" @click="handleGoToProductList(item.product_list[0])"></image>
          </view>

          <!-- 右侧 4 个小图 -->
          <view class="right-img-box">
            <block v-for="(product, idx) in item.product_list" :key="idx">
              <view class="right-img-item" v-if="idx > 0">
                <image :src="product.image_src" :style="{ width: product.image_width + 'rpx' }" mode="widthFix" @click="handleGoToProductList(product)"></image>
              </view>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mySearch from '../../components/my-search.vue'
import badge from '@/mixins/badge'
export default {
  components: { mySearch },
  mixins: [badge],
  data() {
    return {
      // 1. 轮播图数据列表
      swiperList: [],
      // 2. 分类导航的数据列表
      navList: [],
      // 3. 楼层数据列表
      floorList: []
    }
  },
  created() {
    // 调用轮播图函数
    this.getSwiperList(),
      // 调用分类导航函数
      this.getNavList(),
      // 调用楼层数据函数
      this.getFloorList()
  },
  methods: {
    // 获取轮播图数据
    async getSwiperList() {
      // 1.发送请求
      const { meta, message } = await this.$http.get('/home/swiperdata')
      // 2.判断是否成功获取数据
      if (meta.status !== 200) {
        /*   uni.showToast({
          title: '获取轮播图失败，请查看网络是否连接成功',
          icon: 'none'
        }) */
        return this.$message('获取轮播图失败，请查看网络是否连接成功')
      }
      // 3. 将数据赋值给列表
      this.swiperList = message
    },
    // 获取分类导航数据
    async getNavList() {
      const { meta, message } = await this.$http.get('/home/catitems')
      // console.log(res)
      if (meta.status !== 200) {
        return this.$message('获取分类列表失败，检查列表后重试')
      }
      this.navList = message
      // console.log(this.navList)
    },
    // 点击分类跳转
    handleNavList(nav) {
      // console.log(nav)
      if (nav.name === '分类') {
        uni.switchTab({ url: '/pages/category/category' })
      }
    },
    // 3. 获取楼层数据的方法
    async getFloorList() {
      const { meta, message } = await this.$http.get('/home/floordata')

      // 请求失败处理
      if (meta.status !== 200) {
        return this.$message('获取楼层列表失败，检查列表后重试')
      }

      this.floorList = message
    },
    // 点击商品跳转到详情页
    handleGoToProductList(product) {
      // console.log(product)
      // 截取下来product.navigator_url中问号后边的参数
      const query = product.navigator_url.split('?')[1]
      // console.log(query)
      uni.navigateTo({ url: `/pages_sub1/product-list/product-list?${query}` })
    },
    goToSearchPage() {
      uni.navigateTo({
        url: '/pages_sub1/search/search'
      })
    }
  }
}
</script>

<style lang="scss">
.top-swiper {
  height: 330rpx;
  .swiper-content,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  display: flex;
  width: 100%;
  height: 60rpx;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
.search-box {
  // 设置定位方式
  position: sticky;

  // 设置开始固定定位的条件
  top: 0;

  // 提高层级，防止被轮播图覆盖
  z-index: 999;
}
</style>
