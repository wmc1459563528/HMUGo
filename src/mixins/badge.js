/*
  Vue2中的mixins(混入), 可以往任何的.vue文件中混入内容
  - 混入data/props选项中定义的属性以及methods选项中的函数
    - 如果.vue文件中的这些选项中没有, 则直接叠加
    - 如果.vue文件中的这些选项中有, 则以.vue文件中的为主
  - 混入生命周期函数
    - 先执行mixins中的生命周期函数
    - 再执行.vue文件中的生命周期函数
*/
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('cart', ['total']),
    },
    watch: {
        total: {
            immediate: true,
            handler(newVal) {
                if (newVal > 0) {
                    // 设置tabBar上购物车的角标
                    uni.setTabBarBadge({
                        index: 2,
                        text: '' + newVal, // 注意: 此处的数据类型得是string
                    })
                } else {
                    // 移除tabBar上购物车的角标
                    uni.removeTabBarBadge({
                        index: 2,
                    })
                }
            },
        },
    },
    // 只要进入页面就会执行一次
    onShow() {
        // console.log(this.total)
        if (this.total > 0) {
            // 重新再设置一次角标
            uni.setTabBarBadge({
                index: 2,
                text: '' + this.total, // 注意: 此处的数据类型得是string
            })
        }
    },

}