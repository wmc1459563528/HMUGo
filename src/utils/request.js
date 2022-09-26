import FlyIO from 'flyio/dist/npm/wx'

// 创建新的 FlyIO 实例
const http = new FlyIO()

// 设置超时(服务器性能偏差)
http.config.timeout = 30000;

// 设置请求基地址
http.config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截器
http.interceptors.request.use((request) => {
    uni.showLoading({
        title: "加载中...",
        mask: false
    })
    return request
})

// 响应拦截器
http.interceptors.response.use((response) => {
    // 显示加载框
    uni.hideLoading()
  
    // 只取返回的数据字段
    return response.data
}, (err) => {
    uni.hideLoading()
    return Promise.reject(err)
})

// 导出
export default http