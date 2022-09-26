<template>
  <view>
    <view class="goods-list">
      <block v-for="(product, index) in productList" :key="index" >
        <view class="goods-item" @click="goToProductList(product)">
          
          <!-- 商品左侧图片区域 -->
          <view class="goods-item-left">
            <image
              :src="product.goods_small_logo || defaultImage"
              class="goods-pic"
            ></image>
          </view>
          
          <!-- 商品右侧信息区域 -->
          <view class="goods-item-right">
            <!-- 商品标题 -->
            <view class="goods-name">{{ product.goods_name }}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">{{ product.goods_price | formatPrice }}</view>
            </view>
          </view>
          
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
export default {
  data() {
    return {
      // 请求参数对象
      params: {
        // 1. 查询关键词
        query: '',
        // 2. 分类Id
        cid: '',
        // 3. 页码
        pagenum: 1,
        // 4. 每页条数
        pagesize: 20
      },
      // 商品数据
      productList: [],
      // 商品数据总条数，用来实现分页
      total: 0,
      // 商品的默认图片
      defaultImage: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      // 节流阀状态
      isLoading:false
    }
  },
 /*  filters: {
    formatPrice(value) {
      return '￥' + Number(value).toFixed(2);
    }
  }, */
  onLoad(options) {
   
    // 将页面参数转存到 this.params 对象中
    this.params.query = options.query || ''
    this.params.cid = options.cid || ''
  },
  created() {
   // 2. 发起网络请求
    this.getProductList()
  },
  // 页面触底时触发函数
  onReachBottom() {
    console.log(this.productList.length,this.total)
       // 判断是否还有数据?
  if (this.productList.length === this.total) {
    return this.$message("我是有底线的！所有商品数据已加载完毕！");
  }
     // 判断是否开启节流阀
    if (this.isLoading) {
      return
    }
    // 让页面自增
    this.params.pagenum++
    // 重新拉取数据
    this.getProductList()
  },
  // 下拉刷新
  async onPullDownRefresh() {
    // 1. 重置数据
    this.productList = []
    this.params.pagenum = 1

    // 2. 获取新数据
    await this.getProductList()

    // 3. 停止当前页面下拉刷新
    uni.stopPullDownRefresh()
  },
  methods: {
  // 1. 获取商品列表
    async getProductList() {
      // 开启节流阀
      this.isLoading = true
      const { meta, message } = await this.$http.get('/goods/search',this.params)
      if (meta.status !== 200) {
        return this.$message('获取商品列表失败~')
      }
      // 赋值
      // this.productList = message.goods
      // 有多页数据，需要累加在数组中
      // console.log(message.total)
       // 在原有数据的后面添加新获取到的数据
      this.productList = [...this.productList, ...message.goods];
      this.total = message.total;
      // 关闭节流阀
      this.isLoading = false
    },
    // 2.跳转到详情页
    goToProductList(product){
      // console.log(product)
      uni.navigateTo({
        url:`/pages_sub1/product-detail/product-detail?pid=${product.goods_id}`
      })
    } 
  }
}
</script>

<style scoped lang="scss">
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .goods-item-left {
    margin-right: 10rpx;

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
