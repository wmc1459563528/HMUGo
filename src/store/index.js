import Vue from "vue";
import Vuex from "vuex";
// 导入cart子模块
import cart from './modules/cart'

// 导入user子模块
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        cart,
        user
    }
})

export default store