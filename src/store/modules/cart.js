
export default {
    namespaced: true,

    // state:  {
    //     cartItems: [],
    // },
    state: () => {
        const res = uni.getStorageSync('cart')
        //    利用三元判断是否有值，如果有则取值，没有则取空数组
        return {
            cartItems: res ? JSON.parse(res) : []
        }
    },
    getters: {
        // 计算购物车中的商品数量
        total: state => state.cartItems.reduce((sum, item) => sum += item.goods_count, 0),
        // 购物车中选中商品的总数量
        checkedTotal: state => state.cartItems.reduce((sum, item) => {
            if (item.goods_state) {
                return sum += item.goods_count
            } else {
                return sum
            }
        }, 0),
        // 3. 计算已经勾选商品的总价
        checkedAmount(state) {
            const amountTotal = state.cartItems.reduce((sum, item, index) => {
                if (item.goods_state) {
                    return (sum += item.goods_count * item.goods_price)
                } else {
                    return sum
                }
            }, 0)
            return Number(amountTotal).toFixed(2)
        },
    },

    mutations: {
        addToCart(state, detail) {
            // 根据 商品id 查询购物车中是否存在这件商品
            const res = state.cartItems.find(item => item.goods_id === detail.goods_id)

            // 如果购物车中已经有这件商品，则更新数量
            // console.log(res)
            if (res) {
                res.goods_count++
            } else {
                // 如果购物车中没有这件商品，则添加进去
                state.cartItems.push(detail)
            }
            // 将数组内的值存放到本地
            uni.setStorageSync('cart', JSON.stringify(state.cartItems))
        },
        // 更改购物车得选中状态
        updateState(state, product) {
            const oldProduct = state.cartItems.find(item => item.goods_id === product.goods_id)
            if (oldProduct) {
                // 如果存在，则将状态进行取反
                oldProduct.goods_state = !oldProduct.goods_state
                // 将数组内的值存放到本地
                uni.setStorageSync('cart', JSON.stringify(state.cartItems))
            }
        },
        // 更新当前数量
        updateCount(state, { product, num }) {
            const oldProduct = state.cartItems.find(item => item.goods_id === product.goods_id)
            if (oldProduct) {
                oldProduct.goods_count = num
                // 将数组内的值存放到本地
                uni.setStorageSync('cart', JSON.stringify(state.cartItems))
            }
        },
        // 删除当前项
        removeItem(state, product) {
            state.cartItems = state.cartItems.filter(item => item.goods_id !== product.goods_id)
            uni.setStorageSync('cart', JSON.stringify(state.cartItems))
            // 如果清空则提示用户已经清空购物车
            if (state.cartItems.length === 0) {
                uni.showToast({
                    title: '购物车已经清空了',
                    icon: 'none',
                    mask: true
                })
            }
        },
        // 是否全选
        updateAllState(state, flag) {
            // 遍历商品，更新所有的 goods_state
            state.cartItems.forEach(item => {
                item.goods_state = flag
                console.log(item.goods_state, flag)
            })

            // 持久化到本地存储
            uni.setStorageSync('cart', JSON.stringify(state.cartItems))
        }
    },

    actions: {},
}