<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar cancelButton="none" :radius="100" @input="inputHandler" />
    </view>
   <!-- 搜索历史 -->
    <view class="history-box" v-if="sugguestions.length === 0">
      
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17"  @click="clearHistory"></uni-icons>
      </view>
      
      <!-- 历史列表 -->
      <view class="history-list">
        <uni-tag v-for="(item, index) in historyList" :key="index" :text="item" @click="goToProductList(item)"></uni-tag>
      </view>
      
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-else>
      <view class="sugg-item" v-for="(item, index) in sugguestions" :key="index" @click="gotoProductDetail(item)">
        <view class="goods-name" >{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="18"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 搜索关键字
      keyWords: '',
      // 延时器
      timer: null,
      // 搜索建议的数据数组
      sugguestions: [],
      // 搜索历史数据
      historyList:[]
    }
  },
  created () {
      // 1. 从本地存储读取搜索关键字历史JSON字符串
    const keywords = uni.getStorageSync('keywords')
    
    // 2. 用户第一次用, 可能没有存储过, 需要判断
    this.historyList = keywords ? JSON.parse(keywords) : []
  },
  methods: {
    inputHandler(e) {
      // 使用延时器前前先清空一下
      clearTimeout(this.timer)
      // 500毫秒后发送数据
      this.timer = setTimeout(() => {
        this.keyWords = e.value
        // console.log(this.keyWords)
        this.getSugguestionList()
      }, 500)
    },
    async getSugguestionList() {
      if (!this.keyWords) {
        this.sugguestions = []
        return
      }
      const { meta, message } = await this.$http.get('/goods/qsearch', {
        query: this.keyWords
      })
      // 请求失败处理
      if (meta.status !== 200) {
        return this.$message('获取数据失败，请检查您的网络')
      }
      this.sugguestions = message
      // 处理搜索历史
    this.updateSearchHistory();
    },
    gotoProductDetail(item) {
      // console.log(item)
      uni.navigateTo({ url: `/pages_sub1/product-detail/product-detail?pid=${item.goods_id}` })
    },
    // 更新历史记录
    updateSearchHistory(){
      // 将记录存到数组中
      this.historyList.unshift(this.keyWords)
      // 数组去重
      const newArr = [...new Set(this.historyList)]
      if (newArr.length > 10) {
        newArr.splice(10,1)
      }
      this.historyList = newArr
      // 以 JSON 字符串的形式保存到本地存储
      uni.setStorageSync("keywords", JSON.stringify(newArr));
    },
    // 清空历史列表
    clearHistory(){
      // 1. 清空 data 中的数据
      this.historyList = [];
  
      // 2. 清空 Storage 中的数据
      uni.removeStorageSync("keywords");
      this.$message('删除记录成功')
      console.log(111)
    },
    // 跳转到商品列表
    goToProductList(item){
      // console.log(item)
      uni.navigateTo({
        url:`/pages_sub1/product-list/product-list?query=${item}`

      })

    }
  }
}
</script>

<style scoped lang="scss">
// 使用样式穿透：覆盖 uni-search-bar 组件的 .uni-searchbar 背景色
::v-deep .uni-searchbar {
  background-color: #c00000 !important;
}

// 搜索框吸顶
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
// 搜索建议列表
.sugg-list {
  padding: 0 10rpx;

  .sugg-item {
    font-size: 24rpx;
    padding: 26rpx 0;
    border-bottom: 1rpx solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      margin-right: 6rpx;

      // 溢出部分隐藏
      overflow: hidden;

      // 文字不允许换行
      white-space: nowrap;

      // 文字溢出后使用省略号表示
      text-overflow: ellipsis;
    }
  }
}
// 搜索历史
.history-box {
  padding: 0 10rpx;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 26rpx;
    border-bottom: 2rpx solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    uni-tag {
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
